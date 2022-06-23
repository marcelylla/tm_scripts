// ==UserScript==
// @name         getting requests
// @namespace    https://www.youtube.com/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/watch?v=9UqutNoJgN8
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at document-start
// ==/UserScript==

(function() {
    'use strict';

    XMLHttpRequest.prototype.realSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(value) {
        this.addEventListener("progress", function(){
            console.log("LOADING")
            console.log(this);
        }, false);
        this.addEventListener("load", function(){
            console.log("DONE")
            console.log(this.responseText);
        }, false);
        this.realSend(value);
    };
    console.log("test")
})();
