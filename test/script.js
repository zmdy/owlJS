/*
* owlJS
* http://github.com/zmdy/owlJS
* MIT Licensed
*
* Copyright (C) 2019 Hudson Uriel Ferreira, http://gihub.com/zmdy
*/

/*
* Write Object - Basic document.write function to objects
* @param {object} obj JSON object
*/ 
function writeObject(obj){
    var rtr = "<strong>" + obj.__proto__.constructor.name + "</strong>";

    for(let prp in obj){
        var _c = obj[prp];

        _c = _c == null ? '(NULL)' : _c.toString().substring(0, 50);
        _c = _c.length == 50 ? _c + "..." : _c;

        rtr += "<li>" + prp + " --> " + _c + "</li>";
    }

    rtr += "<hr/>";

    document.write(rtr);

    return(rtr);
}