/*
* owlJS
* http://github.com/zmdy/owlJS
* MIT Licensed
*
* Copyright (C) 2019 Hudson Uriel Ferreira, http://gihub.com/zmdy
*/

/*
* Class Question
* Defines a Question object
*/
function Question(obj){
    // Strict mode
    'use strict';
    
    // Local variables
    var
        text,
        value,
        comment,
        type,
        answers = [],
        keys = [],

        questionTypes = ['single', 'multiple', 'choice', 'complete', 'completeKey', 'fill', 'long', 'short']
    ;

    // Starts obj
    obj = obj != null ? obj : {};

    /*
    * Question Constructor
    * @param {object} obj JSON object
    * @returns {Question} test Return the current Question object
    */
    
    this.text = obj['questionText'] || null;
    this.value = obj['questionValue'] || 0;
    this.comment = obj['questionComment'] || null;
    
    this.type = questionTypes.includes(obj['questionType']) ? obj['questionType'] : questionTypes[0];
    
    this.answers = obj['questionAnswers'] || answers;
    this.keys = obj['questionKeys'] || keys;
    
    /*
    * Set Unique Answer
    * @param {string} answer Answer text
    * @param {string} key Answer key
    */
    this.setAnswer = function(answer, key){
        this.answers.push(answer);
        this.keys.push(key);
    }
    
    /*
    * Set Array of Answers
    * @param {array} answers Answer texts
    * @param {array} keys Answer keys
    */
    this.setAnswers = function(answers, keys){
        for(let ans in answers){
            this.answers.push(answers[ans]);
            this.keys.push(keys[ans]);
        }
    }
    
    /*
    * Remove Answer
    * @param {int} index Elements indexes to be removed
    */
    this.removeAnswers = function(index){
        var rtrA = [], rtrK = [];
        
        index = (typeof index == 'object' || typeof index == 'array') ? index : [index];
        
        for(let ans in this.answers){
            if(!index.includes(parseInt(ans))){
                rtrA.push(this.answers[ans]);
                rtrK.push(this.keys[ans])
            }
        }
        
        this.answers = rtrA;
        this.keys = rtrK;
    }
    
    /*
    * Shuffle the array of answers using Fisher-Yattes algorithm
    * @returns {array} arr Return the shuffled array of answers
    */
    this.shuffle = function(){
        var
            arr = this.answers;

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
    * Raffle a givving number of random answers
    * @param {integer} option Select the amount of answers returned
    * @returns {array} arr_rtr Return the selected answers
    */
    this.raffle = function(option){
        if(option == null){
            return this.answers;
        } else{
            var
                arr = this.shuffle(),
                arr_rtr = [];

            option = option > arr.length ? arr.length : option;

            for(let i=0; i<option; i++){
                arr_rtr[i] = arr[i];
            }

            return arr_rtr;
        }
    }

    return this;
}