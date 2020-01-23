/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})

// Back links

$("a.govuk-back-link").click(function() {
    return false;
});

$("a.govuk-back-link").click(function(){
  parent.history.back();
  return false;
});


function show1(){
  document.getElementById('div1').style.display ='none';
}
function show2(){
  document.getElementById('div1').style.display = 'block';
}


function myFunction() {
  document.getElementById("demo").style.opacity = 100;
}


$(document).ready(function(){
    $(".test").click(function(){
        $("#showme").show();
       $("#divsthatIwanttohide").hide();

    });

});


function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
