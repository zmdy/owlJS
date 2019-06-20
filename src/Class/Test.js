/*
* owlJS
* http://github.com/zmdy/owlJS
* MIT Licensed
*
* Copyright (C) 2019 Hudson Uriel Ferreira, http://gihub.com/zmdy
*/

/*
* Class Test
* Defines a Test object
*/
function Test(obj){
    // Strict mode
    'use strict';
    
    // Local variables
    var
        name,
        subject,
        value,
        instructions,
        type,
        questions = [],

        testTypes = ['diagnostic', 'formative', 'summative']
    
    ;

    // Starts obj
    obj = obj != null ? obj : {};
    
    /*
    * Test Constructor
    * @param {object} obj JSON object
    * @returns {Test} test Return the current Test object
    */

    this.name = obj['testName'] || null;
    this.subject = obj['testSubject'] || null;
    this.value = obj['testValue'] || 0;
    this.instructions = obj['testInstructions'] || null;

    this.type = testTypes.includes(obj['testType']) ? obj['testType'] : testTypes[0];
    
    this.questions = questions;
    
    /*
    * Submit array of questions
    * @param {[Question]} question Array of questions to be added in the Test
    * @returns {Test} Return the current Test object
    */
    this.submitQuestions = function(questions){
        for(let q in questions){
            var _q = new Question();
            questions[q] = _q.Question(questions[q]);
        }

        this.questions = questions;

        return this;
    };
    
    /*
    * Submit individual questions
    * @param {Question} question Individual question to be added in the Test
    * @returns {Test} Return the current Test object
    */
    this.submitQuestion = function(question){
        var _q = new Question();
        this.questions.push(_q);

        return this;
    }
    
    /*
    * Set array of questions
    * @param {[Question]} question Array of questions to be added in the Test
    * @returns {Test} Return the current Test object
    */
    this.setQuestions = function(questions){
        for(let q in questions)
            this.questions.push(questions[q]);

        return this;
    };
    
    /*
    * Set individual questions
    * @param {Question} question Individual question to be added in the Test
    * @returns {Test} Return the current Test object
    */
    this.setQuestion = function(question){
        this.questions.push(question);

        return this;
    }
    
    /*
    * Remove Question
    * @param {int} index Element index to be removed
    */
    this.removeQuestions = function(index){
        var rtrQ = [];
        
        index = (typeof index == 'object' || typeof index == 'array') ? index : [index];
        
        for(let qst in this.questions)
            
            if(!index.includes(parseInt(qst)))
                rtrQ.push(this.questions[qst]);
        
        this.questions = rtrQ;
    }
    
    /*
    * Shuffle the array of questions using Fisher-Yattes algorithm
    * @returns {array} arr Return the shuffled array of questions
    */
    this.shuffle = function(){
        var
            arr = this.questions;

        for(let i = arr.length - 1; i > 0; i--){
            var
                r = parseInt(Math.random()*i),
                tmp = arr[i];

            arr[i] = arr[r];
            arr[r] = tmp;

        }

        return arr;
    };
    
    /*
    * Raffle a givving number of random questions
    * @param {integer} option Select the amount of questions returned
    * @returns {array} arr_rtr Return the selected questions
    */
    this.raffle = function(option){
        if(option == null){
            return this.questions;
        } else{
            var
                arr = this.shuffle(),
                arr_rtr = [];

            option = option > arr.length ? arr.length : option;
            option = option <= 0 ? arr.length : option;

            for(let i=0; i<option; i++){
                arr_rtr[i] = arr[i];
            }

            return arr_rtr;
        }
    }

    return this;
};