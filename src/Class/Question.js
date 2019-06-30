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
        answerd = false,
        answeredKey = null,
        points = 0,

        questionTypes = ['single', 'multiple', 'choice', 'complete', 'completeKey', 'completeWord', 'fill', 'long', 'short']
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
    
    this.points = points;
    this.answerd = false;
    
    /*
    * Answers the question
    * @param {string} answerKey Answer key text
    */
    this.answer = function(answeredKey){
        this.answered = true;
        this.answeredKey = answeredKey;
        
        this.processAnswered();
    }
    
    /*
    * Process the answeredQuestion with the answerKeys
    * @param {string} answerKey Answer key text
    */
    this.processAnswered = function(){
        switch(this.type){
            case 'single':
            case 'multiple':
                // Search the answeredKey in the keyValues
                this.points = this.keys[this.answers.indexOf(this.answeredKey)] || this.value;
                break;
                
            
            case 'choice':
            case 'completeKey':
            case 'completeWord':
            case 'fill':
                var
                    ansKey =  Array.isArray(this.answeredKey) ? this.answeredKey : [this.answeredKey],
                    sum = 0;
                
                // Turn this.points in to array
                this.points = [];
                
                // In each question key
                for(let key in this.keys){
                    if(this.type == 'choice'){
                        this.points.push(ansKey[key].replace(/T/g, 1).replace(/F/g, 0));
                        sum += this.keys[key] == ansKey[key].replace(/T/g, 1).replace(/F/g, 0) ? 1 : 0;    
                    }else if(this.type=='completeKey'){
                        this.points.push(this.keys[key] == ansKey[key] ? 1 : 0);
                        sum += this.keys[key] == ansKey[key] ? 1 : 0;
                    } else if(this.type == 'completeWord' || this.type=='fill'){
                        var big = null, count;
                        if(this.type == 'completeWord'){
                            for(let keyR in this.keys[key])
                                    big = compareStrings(ansKey[key], this.keys[key][keyR]) > big ? compareStrings(ansKey[key], this.keys[key][keyR])  : big;
                            this.points.push(big);
                            sum += big;
                        } else{
                            for(let keyR in this.keys[key]){
                                big = compareStrings(this.keys[key][keyR], ansKey[key][keyR]);
                                this.points.push(big);
                                sum += big;
                                count++;
                            }
                        }
                    }
                    if(this.type == 'completeWord'){this.points.unshift(sum / this.keys.length);}
                }
                this.points.unshift(sum / this.keys.length);
                
                break;
                
            case  'complete':
                 var
                    ansKey =  Array.isArray(this.answeredKey) ? this.answeredKey : [this.answeredKey],
                     sum = 0;
                
                // Array
                this.points = [];
                
                // Make it so!
                for(let key in ansKey){
                    var aux = this.answers.indexOf(ansKey[key]) != -1 ? 1 : 0;
                    this.points.push(aux);
                    sum += aux;
                }
                
                this.points.unshift(sum / ansKey.length);
                break;
                
            default:
                this.points = this.answeredKey != null ? 1 : 0;
                break;
        }
    }
    
    /*
    * Sorensen-Dice Coefficient Algorithm --> check the similarity of two strings
    * @param {string} str1 First String
    * @param {string} str2 Second String
    */
    function compareStrings(str1, str2) {
        // Normalizes
        str1 = str1.replace(/\s+/g, '').toLowerCase();;
        str2 = str2.replace(/\s+/g, '').toLowerCase();
        
        // Testing
        if (!str1.length && !str2.length) return 1;
        if (!str1.length || !str2.length) return 0;
        if (str1 === str2) return 1;
        if (str1.length === 1 && str2.length === 1) return 0;
        if (str1.length < 2 || str2.length < 2) return 0;

        let
            firstBigrams = new Map(),
            intersectionSize = 0;
        for (let i = 0; i < str1.length - 1; i++) {
            const
                bigram = str1.substring(i, i + 2),
                count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;

            firstBigrams.set(bigram, count);
        };

        for (let i = 0; i < str2.length - 1; i++) {
            const 
                bigram = str2.substring(i, i + 2),
                count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;

            if (count > 0) {
                firstBigrams.set(bigram, count - 1);
                intersectionSize++;
            }
        }

        return (2.0 * intersectionSize) / (str1.length + str2.length - 2);
    }

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