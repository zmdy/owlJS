/*
* owlJS
* http://github.com/zmdy/owlJS
* MIT Licensed
*
* Copyright (C) 2019 Hudson Uriel Ferreira, http://gihub.com/zmdy
*/

/*
* Stringify Identify object in markdown syntax
* @param {object} object JSON question object
* @returns {Identify} test Return the current Identify object
*/ 
function Stringify(obj){
    var
        rtr = '',
        strType
    ;
    
    // 1st. step --> get question text
    rtr += obj.questionText + '\n';
    
    // 2nd. step --> get question comment
    if(obj.questionComment) rtr += '-[C: ' + obj.questionComment + ']\n';
    
    // 3rd. step --> get question value
    rtr += '-[' + obj.questionValue + ']\n';
    
    
    // 4th. step --> get question key and answers
    switch (obj.questionType){
        case 'single':
            strType = '-';
            break;
        
        case 'multiple':
        case 'choice':
            strType = '-[';
            break;
            
        case 'complete':
        case 'completeKey':
        case 'completeWord':
            strType = '-[C ';
            break;
            
        case 'fill':
            strType = '-[F ';
            break;
            
        case 'short':
            strType = '-[S ';
            break;
        
        case 'long':
            strType = '-[L ';
            break;
    }
    
    for(let q in obj.questionAnswers){   
        // New line flag
        rtr += strType;
        
        // Question keys
        if(obj.questionType == 'single'){
            rtr += parseFloat(obj.questionKeys[q]) == 0 ? ' ' : '- ';
        }else if(obj.questionType == 'completeWord'){
            rtr += obj.questionKeys[q].toString().replace(',', ' | ') + '] ' ;
        }else if(obj.questionType == 'fill'){
            rtr += obj.questionKeys[q].toString().replace(',', ' - ') + '] ';
        }else{
            rtr += obj.questionKeys[q] + '] ';
        }
        
        rtr += obj.questionAnswers[q]+ '\n';
    }
    console.log(rtr);
    
}