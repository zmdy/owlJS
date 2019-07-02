/*
* owlJS
* http://github.com/zmdy/owlJS
* MIT Licensed
*
* Copyright (C) 2019 Hudson Uriel Ferreira, http://gihub.com/zmdy
*/

/*
* Creates form to build test
*/ 
function createTest(){
    'use strict';
    
    var
        _parent,
        _test;
    
    // Creates parent node
    _parent = document.createElement('main');
    _parent.className = 'owl';
    
    document.body.appendChild(_parent);
    
    // Creates test
    _test = createField('section', 'test', 'test', _parent);
    addComponent(_test);
    addControl(_test,'Question', createQuestion, deleteQuestion);
}

/*
* Function to generate dynamic questions
*/ 
function createQuestion(){
    var
        parent = document.querySelector('#test'),
        ctd = document.querySelectorAll("#test > .question").length || 0,
        q;
    
    q = createField('section', 'question'+(ctd+1), 'question', parent);
    addComponent(q);
    addControl(q, 'Answer', createAnswer, deleteAnswer);
}

/*
* Deletes the last question
*/ 
function deleteQuestion(){
    var 
        query = '#question';
    
    query = query + document.querySelectorAll("#test > .question").length;
    
    query = document.querySelector(query);
    query.parentNode.removeChild(query);
}

/*
* Function to generate new question answers
*/ 
function createAnswer(){
    var
        parent = this.parentNode.parentNode,
        ctd = document.querySelectorAll('#' + parent.id + " > .answer").length || 0,
        a;
    
    a = createField('div', parent.id + 'Answer' + (ctd+1), 'answer', parent);
    addComponent(a);
}

/*
* Deletes last question answer
*/ 
function deleteAnswer(){
    var
        parent = this.parentNode.parentNode,
        ctd = parent.querySelectorAll('.answer').length || 0;
        
    parent.removeChild(parent.querySelectorAll('.answer')[ctd - 1]);
}

/*
* Creates and returns a HTML object
* @param {string} field HTML tag type
* @param {string} id HTML element ID
* @param {string} parent Current element parent node
* @returns {object} field Returns the created field
*/ 
function createField(field, id, className, parent){
    var txt;

    field = document.createElement(field);
    field.id = id;
    field.className = className;

    txt = document.createElement("h2");
    txt.innerHTML = id.charAt(0).toUpperCase() + id.slice(1);

    field.appendChild(txt);
    parent.appendChild(field);

    return field;
}

/*
* Add the components based on the type of the class (Test or Question)
* @param {string} field HTML element
* @param {string} id HTML element ID
* @param {string} parent Current element parent node
* @returns {object} field Returns the created field
*/ 
function addComponent(field){    
    var
        fields = {
            test: ['Name', 'Subject', 'Value', 'Instructions', 'Type'],
            question: ['Text', 'Value', 'Comment', 'Type', 'Answered', 'Points'],
            answer: ['Answer', 'Key']
        },
        
        testTypes = [ 'diagnostic', 'formative', 'summative'],
        
        questionTypes = [
            'single', 'multiple', 'choice', 'complete',
            'completeKey', 'completeWord',
            'fill', 'long', 'short'
        ],

        auxName = field.className.replace(/\d/, "");
    ;

    for (let x in fields[auxName]){
        var
            label, input;

            label = document.createElement("label");
            label.innerHTML = fields[auxName][x];
            label.for = field.id+ fields[auxName][x];
        
            if(fields[auxName][x] != 'Type'){
                input = document.createElement("input");
                input.type = 'text';
            }else{
                input = document.createElement("select");
                input.name = "testTypes";
                
                var objTypes = null;
                
                objTypes = auxName == 'test' ? testTypes : questionTypes;
                
                for(let type in objTypes){
                    var opt = document.createElement('option');
                    opt.value = objTypes[type];
                    opt.id = '_' + objTypes[type];
                    opt.innerHTML = objTypes[type];
                    
                    input.appendChild(opt);
                }
            }
        
            input.id = label.for;
            input.placeholder =  field.id+ fields[auxName][x];
            input.value =  field.id+ fields[auxName][x];

            label.appendChild(input);
            field.appendChild(label);
    }
}

/*
* Creates fields to control (creation and deletion) elements
* @param {string} field HTML element
* @param {string} controlName The name of the control
* @param {string} fnc1 Add (+) function
* @param {string} fnc2 Del (-) function
*/ 
function addControl(field, controlName, fnc1, fnc2){
    var ctr, _new, _old;

    ctr = document.createElement("p");
    ctr.innerHTML = controlName;

    _new = document.createElement("input");
    _new.type = 'button' ;
    _new.value = "+";
    _new.className = "_new";
    _new.onclick = fnc1;

    _del = document.createElement("input");
    _del.type = 'button';
    _del.value = "-";
    _del.className = "_del";
    _del.onclick = fnc2;

    ctr.appendChild(_new);
    ctr.appendChild(_del);

    field.appendChild(ctr);
}