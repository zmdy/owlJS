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
        questionText = '',
        questionAnswers = [],
        questionKeys = [],
        questionValue,
        questionComment
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
            questionAreas = this.questionAreas.split('\n'),
            regex = {
                comment: [/^-\u005BC:\s\S/, /(-\u005BC:\s|\u005D)/g],
                value: [/^-\u005B\d{1,}\u005D$/, /(-\u005B|\u005D)/g],
                
                single: [/^(-|--) /, /^(-|--)\s/],
                multiple: [/^-\u005B\d{1,}\u005D\s\S/]
            }
        ;
        
        for(let area in questionAreas){
            for(let reg in regex){
                if(regex[reg][0].test(questionAreas[area])){
                    var _value = questionAreas[area].replace(regex[reg][1],'');
                    
                    if(reg!='comment' & reg!='value')
                        questionKeys.push(this.setQuestionKey(questionAreas[area], reg));
                    
                    questionAreas[area] = [];
                    questionAreas[area][0] = _value;
                    questionAreas[area][1] = reg;
                    continue;
                }
            }
        }
        
        this.questionAreas = questionAreas;
        this.questionKeys = questionKeys;
    }
    
    this.setQuestionKey = function(question, type){
        var
            regex = {
                single: [/^--/, /^-/],
                multiple: [/^-\u005B/, /\u005D\s/]
            
            },
            
            key;
        
        if(type == 'single'){
            key = regex[type][0].test(question) ? 1 : 0;
        }else if(type=='multiple'){
            key = question.split(regex[type][1])[0].replace(regex[type][0], '');
        }
        
        console.log('Q: %s\nK: ', question, key);
        
        return key;
    }
    
    // 1st. step --> split questionText and questionAnswers
    this.setQuestionFields(question);
    
    // 2nd. step --> process questionAreas
    // 3rd. step --> process questionKeys
    this.processQuestionAreas();
    
    // Nth. step --> returns the current object
    return this;
    
};