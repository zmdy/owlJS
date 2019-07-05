/*
* owlJS
* http://github.com/zmdy/owlJS
* MIT Licensed
*
* Copyright (C) 2019 Hudson Uriel Ferreira, http://gihub.com/zmdy
*/

/*
* Submits form and build Test object
*/ 
function submitForm(){
    'use strict';
    
    var 
        objects = ['.testObject', '.questionObject', '.questionAnswerObject'],
        
        tst = {},
        qst = [],
        ans = []
    ;
    
    for(let obj in objects){
        var 
            object = document.querySelectorAll(objects[obj]);
        
        for(let field in object){
            if(object[field].id && object[field].type == 'text'){
                var fld = object[field].id.replace(/\d/g, ''),
                    vle = object[field].value;    
                
                // Process Test object
                if(obj == 0) tst[fld] = vle;
                
                // If type is Question
                else if(obj == 1){
                    // Find out the Question Number
                    var ctd = object[field].parentNode.parentNode.id.replace(/\D/g, '');
                    
                    qst[ctd - 1] = qst[ctd - 1] == null ? {} : qst[ctd - 1];
                    qst[ctd - 1][fld] = vle;
                }
                
                // If type is questionAnswer
                else{
                    // Find out the parent question
                    var ctd = object[field].parentNode.parentNode.parentNode.id.replace(/\D/g, ''),
                        type = object[field].id.replace(/\d/g, '');
                    
                    if(type == 'questionAnswerAnswer'){
                        qst[ctd - 1]['questionAnswers'] =
                            qst[ctd - 1]['questionAnswers'] == null ?
                            [] : qst[ctd - 1]['questionAnswers'];
                        
                        qst[ctd-1]['questionAnswers'].push(vle);
                    }else{
                        qst[ctd - 1]['questionKeys'] =
                            qst[ctd - 1]['questionKeys'] == null ?
                            [] : qst[ctd - 1]['questionKeys'];
                        
                        qst[ctd-1]['questionKeys'].push(vle);
                    }
                }
            }                
        }
    }
    
    tst['questions'] = qst;
    
    console.log(tst);
    
    return tst;
}