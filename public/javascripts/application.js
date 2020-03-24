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

// Eligible condition

$('.radioTargetSet').click(function(){
    var getTarget = $(this).val();
    $('#siblingsForm').attr('action', getTarget);
    // $('.govuk-button').attr('href',getTarget);
});

// Siblings conditional

$('.radioTargetSet').click(function(){
    var getTarget = $(this).val();
    $('#eligible-form').attr('action', getTarget);
    // $('.govuk-button').attr('href',getTarget);
});

// Birth mother conditional

$('.radioTargetSet').click(function(){
    var getTarget = $(this).val();
    $('#birth-mother-form').attr('action', getTarget);
    // $('.govuk-button').attr('href',getTarget);
});

// Birth father conditional

$('.radioTargetSet').click(function(){
    var getTarget = $(this).val();
    $('#birth-father-form').attr('action', getTarget);
    // $('.govuk-button').attr('href',getTarget);
});

// Solicitor conditional

$('.radioTargetSet').click(function(){
    var getTarget = $(this).val();
    $('#solicitor-form').attr('action', getTarget);
    // $('.govuk-button').attr('href',getTarget);
});


// Child placed conditional

$('.radioTargetSet').click(function(){
    var getTarget = $(this).val();
    $('#placemet-date-form').attr('action', getTarget);
    // $('.govuk-button').attr('href',getTarget);
});


// Number of applicants

$('.radioTargetSet').click(function(){
    var getTarget = $(this).val();
    $('#number-of-applicants-form').attr('action', getTarget);
    // $('.govuk-button').attr('href',getTarget);
});


function show1(){
  document.getElementById('div1').style.display ='none';
  document.getElementById('div2').style.display = 'none';
  document.getElementById('div3').style.display = 'none';
}
function show2(){
  document.getElementById('div1').style.display = 'block';
  document.getElementById('div2').style.display = 'block';
  document.getElementById('div3').style.display = 'block';
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

function myFunction2() {
  var x = document.getElementById("myDIV2");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}


function toggle_visibility(id) {
       var e = document.getElementById(id);
       if(e.style.display == 'none')
          e.style.display = 'block';
       else
          e.style.display = 'none';
    }
