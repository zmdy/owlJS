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
        questionComments
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

    
    // 1st. step --> split questionText and questionAnswers
    this.setQuestionFields(question);
    
    // Nth. step --> returns the current object
    return this;
    
};