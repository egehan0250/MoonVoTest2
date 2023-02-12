var title = document.title;
var alttitle = "Seni Çok Özledik! :)";
window.onblur = function () { document.title = alttitle; };
window.onfocus = function () { document.title = title; }; 
 
var _cod_pageTitleVariables_4 = ["Bizimle de İlgilen :)", "Orada mısın? :) ", "Seni çok özledik :)", "Beni Burda Unutursan Küserim :) "];
$(function() {
    var _cod_pageTitle_4 = $("title").text();
    $(window).blur(function() {
    	var _cod_randomPageTitleText_4 = _cod_pageTitleVariables_4 [Math.floor(Math.random() * _cod_pageTitleVariables_4 .length)];
    	
    	$("title").text(_cod_randomPageTitleText_4);
    	window._cod_titleBlinkInterval = setInterval(function(){
 
         var blinkDate = new Date();
         var blinkTime = parseInt(blinkDate.getTime() / 1000);
 
         if(blinkTime % 2 == 1){
             $("title").text(_cod_randomPageTitleText_4);
         }
         else{
             $("title").text(_cod_pageTitle_4);
         }
 
     }, 750);
    	
    });
    $(window).focus(function() {
        clearInterval(window._cod_titleBlinkInterval);
        $("title").text(_cod_pageTitle_4);
    })
});
 