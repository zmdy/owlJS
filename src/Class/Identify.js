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
                multiple: [/^-\u005B\d{1,}\u005D\s\S/, /-\u005B\d{1,}\u005D\s/],
                choice: [/^-\u005B(T|F)\u005D\s\S/, /-\u005B(T|F)\u005D\s/]
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
                        continue;
                    } else if(reg=='comment'){
                        var _comment = _value;
                        continue;
                    }
                    else{
                        var _testV = _value;
                        continue;
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
    
    this.setQuestionKey = function(question, type){
        var
            regex = {
                single: [/^--/, /^-/],
                multiple: [/^-\u005B/, /\u005D\s/],
                choice: [/^-\u005B/, /\u005D\s/]
            
            },
            
            key;
        
        if(type == 'single'){
            key = regex[type][0].test(question) ? 1 : 0;
        }else if(type=='multiple' || type=='choice'){
            key = question.split(regex[type][1])[0].replace(regex[type][0], '');
            key = key.replace('T', 1).replace('F', 0);
        }
        
        //console.log('Q: %s\nK: ', question, key);
        
        return key;
    }
    
    // 1st. step --> split questionText and questionAnswers
    this.setQuestionFields(question);
    
    // 2nd. step --> process questionAreas (answers, comments, type and value)
    // 3rd. step --> process questionKeys
    this.processQuestionAreas();

    // 4th. step --> process questionValue
    
    // Nth. step --> returns the current object
    return this;
    
};