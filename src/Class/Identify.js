/*
* owlJS
* http://github.com/zmdy/owlJS
* MIT Licensed
*
* Copyright (C) 2019 Hudson Uriel Ferreira, http://gihub.com/zmdy
*/

/*
* Question Identifier
* @param {object} question JSON object
* @returns {Identify} test Return the current Identify object
*/ 
function Identify(question){
    // Use strict mode
    'use strict';

    // Local variables
    var 
        questionAnswers = [],
        questionComment,
        questionKeys = [],
        questionText = '',
        questionType,
        questionValue

    ;
    
    /*
    * Identify the question text
    * @param {object} question JSON object
    */
    this.setQuestionFields = function(question){
        var 
            // Text starts with '-', '--' or '-['
            regexp = /^(- |-- |-\u005B)/,
            question = question.split('\n');
        
        // Get the question
        for(let qst in question)    
            // Test regexp
            if(!regexp.test(question[qst])) questionText += question[qst] + "\n";
        
        // Updates
        this.questionText = questionText;
        this.questionAreas = question.join('\n').replace(questionText, '');
        
        return this;
    }
    
    /*
    * Identify the question areas (comment, value, key, types)
    * @return {object} rtr Current processed questionAreas
    */
    this.processQuestionAreas = function(){
        var
            // Local change
            questionAreas = this.questionAreas.split('\n'), 
            // Rules to find and delete text flags
            regex = {
                comment: [/^-\u005BC:\s\S/, /(-\u005BC:\s|\u005D)/g],
                value: [/^-\u005B\d{1,}\u005D$/, /(-\u005B|\u005D)/g],
                
                single: [/^(-|--) /, /^(-|--)\s/],
                multiple: [/^-\u005B\d{1,}\u005D\s\S/, /^-\u005B\d{1,}\u005D\s/],
                choice: [/^-\u005B(T|F)\u005D\s\S/, /^-\u005B(T|F)\u005D\s/],
                complete: [/^-\u005BC\u005D\s\S/, /^-\u005BC\u005D\s/],
                completeKey: [/^-\u005BC\s\d{1,}\u005D\s\S/, /^-\u005BC\s\d{1,}\u005D\s/],
                completeWord: [/^-\u005BC\s(\S|\s){1,}\u005D\s\S/, /^-\u005BC\s(\S|\s){1,}\u005D\s/],
                fill: [/^-\u005BF\s(\S|\s){1,}\u005D\s\S/, /^-\u005BF\s(\S|\s){1,}\u005D\s/],
                short: [/^-\u005BS\s(\S|\s|\d){1,}\u005D/, /^-\u005BS\s(\S|\s|\d){1,}\u005D/],
                long: [/^-\u005BL\s(\S|\s|\d){1,}\u005D/, /^-\u005BL\s(\S|\s|\d){1,}\u005D/]
                
            },
            // Return Answers
            rtrQ = []
        ;
        
        // In each field
        for(let area in questionAreas){
            // Test each regex
            for(let reg in regex){
                // If regex test is true
                if(regex[reg][0].test(questionAreas[area])){
                    // Get just the text value
                    var _value = questionAreas[area].replace(regex[reg][1],'');
                    
                    // When find answers (not value or comment)
                    if(reg!='comment' & reg!='value'){
                        // Get the type of the question
                        var _type = reg;
                        // Pushes the answer text
                        rtrQ.push(_value);
                        // Get the value and pushes it
                        questionKeys.push(this.setQuestionKey(questionAreas[area], reg));
                        break;
                    } else if(reg=='comment'){
                        var _comment = _value;
                        break;
                    }
                    else{
                        var _testV = _value;
                        break;
                    }
                }
            }
        }
        
        // Updates this
        this.questionAnswers = rtrQ;
        this.questionComment = _comment || null;
        this.questionKeys = questionKeys;
        this.questionType = _type;
        this.questionValue = _testV || null;
        
        delete this.questionAreas;

        return this;
    }
    
    /*
    * Identify the question keys based on original text
    * @return {object} key Processed key
    */
    this.setQuestionKey = function(question, type){
        var
            regex = {
                single: [/^--/, /^-/],
                multiple: [/^-\u005B/, /\u005D\s/],
                choice: [/^-\u005B/, /\u005D\s/],
                complete: [/^-\u005BC\u005D\s/],
                completeKey: [/^-\u005BC\s/, /\u005D/],
                completeWord: [/^-\u005BC\s/, /\u005D/, /\s\u007C\s/],
                fill: [/^-\u005BF\s/, /\u005D/, /\s\u002D\s/],
                short: [/^-\u005BS\s/, /\u005D/],
                long: [/^-\u005BL\s/, /\u005D/]
            },
            
            key = null,
            _type = type;
        
        switch(type){
            case 'single':
                key = regex[type][0].test(question) ? 1 : 0;  
                break;
                
            case 'multiple':
            case 'choice':
            case 'completeKey':
                key = question.split(regex[type][1])[0].replace(regex[type][0], '');
                if(type=='choice') key = key.replace('T', 1).replace('F', 0);
                break;
                
            case 'completeWord':
            case 'fill':
                key = question.split(regex[_type][1])[0].replace(regex[_type][0], '').split(regex[_type][2]);
                break;
                
            case 'complete':
                key = question.replace(regex[type][0], '');
                break
                
            default:
                key = question.replace(regex[type][0], '').replace(regex[type][1], '').split(' ');
                break;
        }
        
        return key;
    }
    
    /*
    * Process the questionValue based on questionKeys
    * @param {object} question JSON object
    */
    this.processQuestionValue = function(){
        var
            val = this.questionValue,
            keys = this.questionKeys,
            maxV = keys[0];
        
        // Find the biggest
        for(let q in keys){
            if(parseFloat(keys[q])){
                maxV = maxV > parseFloat(keys[q]) ? maxV : parseFloat(keys[q]);
            }
        }
        
        // Process questionValue
        if(val == null || val == 0) val = parseFloat(val) > parseFloat(maxV) ? val : maxV;
        val = val == null ? 1 : val;
        
        // Process Question Keys
        for(let q in keys)
            if(parseFloat(keys[q]) && this.questionType!='completeKey')
                keys[q] = keys[q] * (val / maxV);
        
        // Updates
        this.questionValue = val;
        this.questionKeys = keys;
        
        // Returns
        return this;
    }
    
    // 1st. step --> split questionText and questionAnswers
    this.setQuestionFields(question);
    
    // 2nd. step --> process questionAreas (answers, comments, type and value)
    // 3rd. step --> process questionKeys
    this.processQuestionAreas();

    // 4th. step --> process questionValue
    this.processQuestionValue();
    
    // Nth. step --> returns the current object
    return this;
    
};