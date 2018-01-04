var fs = require('fs');
var Filter = require('./MainFilter.js');



var page = require('webpage').create();
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239 Safari/537.36';
//////for scrolling down revealing all dynamic content//
page.settings.javascriptEnabled = true;
page.settings.loadImages = true;
////////////////////////////////////////////////////////
page.onConsoleMessage = function(msg) {
    console.log(msg);
};

var loadInProgress=false;
page.onLoadStarted = function() {
    loadInProgress = true;
   
};

page.onLoadFinished = function() {
    loadInProgress = false;
        page.render('screenshot.png');

};


var  ObjectBack;
var StepsApplyCounter=0;
var PagesCounter= 0 ;
var PagesFlag=true;

var StepsCounter=0;
///////////////////////////////////////////////////////////////////////////
////////////////////////---Login steps---/////////////////////////////////
//////////////////////////////////////////////////////////////////////////
var i = 0;
var LoginCounter=0;
var LoginInterval = setInterval(function()
{

    fs.write('D:\\linkedin.txt',"",'w');

    if ( typeof LoginSteps[LoginCounter]=="function" &&  !loadInProgress)
    {

        LoginSteps[LoginCounter]();
        LoginCounter++;

    }
    if (typeof LoginSteps[LoginCounter]!="function")
{
        console.log("Logged in!");
        page.render('login2.png');
        PagesInterval();
        clearInterval(LoginInterval);
      }
},15000);







var LoginSteps = 
[
function()
{



  page.open('https://www.linkedin.com');

},


function()
{


  page.evaluate(function()

  {
 if ( document.getElementById('login-email')!=null)
      {
        
      
                 document.getElementById('login-email').value = "snir.snir@gmail.com";
                document.getElementById('login-password').value = "abhr1988";
                var formed = document.querySelector('#login-submit');
                formed.click();
                var form = document.querySelector('form');
                form.submit();
      }

              });
},

function()
{
  page.render('login2.png');
}

];


var Pages;
///////////////////////////////////////////////////////////////////////////
////////////////////////---Pages Interval---///////////////////////////////
//////////////////////////////////////////////////////////////////////////




var Pages = [/*'https://www.linkedin.com/jobs/search/?keywords=junior%20developer&location=Israel&locationId=il%3A0','https://www.linkedin.com/jobs/search/?keywords=junior%20javascript%20developer&location=Israel&locationId=il%3A0'
              ,'https://www.linkedin.com/jobs/search/?keywords=junior%20frontend%20developer&location=Israel&locationId=il%3A0',
              */'https://www.linkedin.com/jobs/search/?keywords=junior%20web%20developer&location=Israel&locationId=il%3A0',
              'https://www.linkedin.com/jobs/search/?keywords=Full%20Stack%20Developer&location=Israel&locationId=il%3A0',
              
              'https://www.linkedin.com/jobs/search/?keywords=dotnet%20developer&location=Israel&locationId=il%3A0',/*
              'https://www.linkedin.com/jobs/search/?keywords=Full%20Stack%20Developer&location=Israel&locationId=il%3A0&start=25',
              'https://www.linkedin.com/jobs/search/?keywords=Full%20Stack%20Developer&location=Israel&locationId=il%3A0&start=50',
              'https://www.linkedin.com/jobs/search/?keywords=Full%20Stack%20Developer&location=Israel&locationId=il%3A0&start=75',
              'https://www.linkedin.com/jobs/search/?keywords=Full%20Stack%20Developer&location=Israel&locationId=il%3A0&start=100'*/];



function PagesInterval()
{

var PagesInterval = setInterval(function()
{

console.log("PagesCounter is : "+PagesCounter);

if (PagesCounter==Pages.length)
{
      ApplyInterval();
  
    
    clearInterval(PagesInterval);

  }

else if  (PagesFlag)
{
  OnePageInterval(Pages[PagesCounter]);
  
  PagesFlag = false;
}


},10000);
}

///////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


var Steps = 
[
function(AdressIn)
{


console.log("Adress In: "+AdressIn);

page.open(AdressIn, function (status) {
      page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");

page.render('login2.png');
 });
},



function(AdressIn)
{
      page.viewportSize = {
    width: 1080 ,
    height: 1920 

};
   
  
console.log ("vvvvvvvvvvvviewwwwwwwwwwwwwwwwwwwwwwwwwwwwwww port size");
  page.render('login2.png');
},
function(AdressIn)
{
    page.viewportSize = { width: 1600, height: 10000, };

  page.render('login2.png');
},


function(AdressIn)
{
   page.evaluate(function(){
    window.document.body.scrollTop = '1000';

});
},

function(AdressIn)
{
  page.render('login2.png');



        var s = page.evaluate(function(){


          var JobTitle = document.querySelectorAll('.truncate-multiline--last-line-wrapper');
          var Company = document.querySelectorAll('.job-card-search__company-name');
          var Place = document.querySelectorAll('.job-card-search__location');
          var Desc = document.querySelectorAll('.job-card-search__description-snippet');
          var JobDate = document.querySelectorAll('.job-card-search__listed-status.pt1');
          var EasyApply = document.querySelectorAll('.job-card-search__footer.job-card-search__footer');
          var Links = document.querySelectorAll('.job-card-search__upper-content-wrapper-left');
          var All = document.querySelector('body');
          var json=[];

              for ( var i = 0 ; i < JobTitle.length;i++)
              {
console.log('links : '+Links[i]);
                json.push({'All':All.textContent,'JobTitle':JobTitle[i].textContent,'Company':Company[i].textContent,'Location':Place[i].textContent,'Desc':Desc[i].textContent,'Date':JobDate[i].textContent,'EasyApply':false,'IsGood':false,'Link':'https://www.linkedin.com'+Links[i].querySelector('.job-card-search__link-wrapper.js-focusable-card.ember-view').getAttribute('href'),'SeniorityLevel':'','Industry':'','Content':'','EmploymentType':''});

                if (EasyApply[i].textContent.indexOf('Easy Apply')>-1)
                  json[i].EasyApply=true;
                if ( Place[i].textContent.toLowerCase().indexOf('jerusalem')<0 && Place[i].textContent.toLowerCase().indexOf('tel-hai')<0)
                  json[i].IsGood=true;
              }


                  return json;

       
        });


var jess = fs.read('D:\\linkedin.txt');
if  (jess =="")
{

 fs.write('D:\\linkedin.txt',JSON.stringify(s),'w');
}
else
{
  var ll = JSON.parse(jess);
  var out = ll.concat(s);
  fs.write('D:\\linkedin.txt',JSON.stringify(out),'w');
}
         
        
},



];


function OnePageInterval()
{
var Interval = setInterval(function(){

PagesFlag=false;

  if (!loadInProgress && typeof Steps[StepsCounter] == "function")
  {
    Steps[StepsCounter](Pages[PagesCounter]);
    console.log("steps");
    StepsCounter++;
    page.render('login2.png');
  }

  if (typeof Steps[StepsCounter] != "function" ) 
  {
        console.log("test complete!");

          StepsCounter=0;
         
              PagesCounter++;
              console.log("Pages counterrrrrrr " +PagesCounter);
               PagesFlag=true;

 
        clearInterval(Interval);
                console.log("Finished");


                
               
    }


},7000);
}


var JsonCounter=0;
function ApplyInterval()
{


var Intervaled  = setInterval(function()
{
  if ( CaptchaSteps()==0)
{
    var json= LoadJSON();
if ( JsonCounter < json.length)
{



   /////////////try/////////////
   console.log ( "jsonounter : "+JsonCounter + "Eastaply : "+json[JsonCounter].EasyApply);
  /* 
if ( StepsApplyCounter==4 && !json[JsonCounter].EasyApply )
{
  console.log(" i m  inside the condition");
  StepsApplyCounter=254;
}*/
/////////////////last added : 14:03//////


if ( typeof CompanyPageSteps[StepsApplyCounter]== "function" && !loadInProgress)
{










    CompanyPageSteps[StepsApplyCounter](json);


     
  

   ++StepsApplyCounter;
console.log("Easyapply step : "+json[JsonCounter].EasyApply);

}


if ( typeof CompanyPageSteps[StepsApplyCounter]!= "function" )
{
  ++JsonCounter;
  StepsApplyCounter=0;



}
}

else
{
  console.log('Dear ser,i completed loading  each job and job content succefully!');
  //UpdateJSON(JSON);
   Automation();
  clearInterval(Intervaled);
 
   }
 

}
else
{
  var l = setInterval(function(){
      if ( CaptchaSteps()==1)
      {
        console.log('captcha' + captcha);
        CaptchaArray[0];
      }
      else 
      {
        console.log('captcha' + captcha);
        CaptchaArray[1];
setTimeout(function(){clearInterval(l);},6000);

      }


  },6000);
}
},12000);

}

var CompanyPageSteps = 
[
function(json)
{

page.open(json[JsonCounter].Link);
console.log('Link in address: ' + json[JsonCounter].Link);
page.render('login2.png');



},
function(json)
{
  page.render('login2.png');

},

function(json)
{
        page.evaluate(function(){


          if (document.querySelector('button[aria-controls="job-details"]'))
                document.querySelector('button[aria-controls="job-details"]').click();
          else
            console.log("no job detalis tag exists..");

        });
},
function(json)
{

 var flag = page.evaluate(function(){

  if (  document.querySelector('.jobs-description__container'))
    return 1;
  return 0;
 });
 if (flag==1)
 {
  var s = page.evaluate(function(json,JsonCounter){


//var json = [];
  var SeniorityLevel = document.querySelector('.jobs-box__body.js-formatted-exp-body');
          var Industry = document.querySelector('.jobs-box__list-item.jobs-description-details__list-item');
          var EmploymentType = document.querySelector('.jobs-box__body.js-formatted-employment-status-body');
          var Content = document.querySelector('#job-details');
          var ApplyLink = document.querySelector('.a11y-text');

if ( !json[JsonCounter].Easyapply)
{




  var url = document.querySelector('body').innerHTML;
var startindex= url.indexOf('companyApplyUrl');

var start =startindex+15;
var endindex = url.indexOf('}',start);

var Link = url.substring(start,endindex);

json[JsonCounter].ApplyLink = Link;
}


      
//json.push({'SeniorityLevel':SeniorityLevel.textContent,'Industry':Industry.textContent,'EmploymentType':EmploymentType.textContent,'Content':Content.textContent,'ApplyLink':false})

json[JsonCounter].SeniorityLevel = SeniorityLevel.innerHTML;
  json[JsonCounter].Industry = Industry.innerHTML;
  json[JsonCounter].EmploymentType = EmploymentType.innerHTML;
  json[JsonCounter].Content = Content.innerHTML;

  console.log  ( "seniorityyyyy : "+json[JsonCounter].SeniorityLevel + "jsonleength : "+json.length);
     
      if (document.querySelector('.jobs-details-top-card__actions.mt4').textContent.indexOf('Easy Apply') >-1  )
      {
              json[JsonCounter].EasyApply = true;
              console.log("Easy aply ISSSS true!");

}
else
  json[JsonCounter].EasyApply = true;



  
return json;

  },json,JsonCounter);
  
UpdateJSON(s);

}
},

/*
function()
{
  page.evaluate(function(){
        document.querySelector('.jobs-s-apply__button.js-apply-button').click();
  });
},



function()
{
  page.evaluate(function(){
        

        document.querySelector('#apply-form-phone-input').click();
        document.querySelector('#apply-form-phone-input').value = "0542234805";
  });
},

function()
{
page.evaluate(function(){
  
document.querySelector('.jobs-apply-form__upload-options-text.Sans-15px-black-70%-semibold').click();
//jobs-apply-form__resume-date Sans-13px-black-55% pr2
document.querySelector('.jobs-apply-form__recent-resume-filename').click();
//page.uploadFile('input[name=file]', 'D:\\CV.pdf');


});
page.uploadFile('input[name=file]', 'D:\\CV.pdf');
},







function()
{
page.evaluate(function(){

    document.querySelector('.jobs-apply-form__submit-button.button-primary-large').click();
  });
  
},
*/

];
//////////////////////////////////////////////////////////////////////////////////////////////
              //------Update JSON file--------\\
//////////////////////////////////////////////////////////////////////////////////////////////
function UpdateJSON(jsonIn)
{
 
  var Stringified =  JSON.stringify(jsonIn);
  fs.write('D:\\linkedin.txt',Stringified,'w');

}
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////----Load my pretty json file----////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////


function LoadJSON()
{

    var JsonFile = fs.read('D:\\linkedin.txt');
    var jsoned =JSON.parse(JsonFile);

    return jsoned;


}
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
function Automation()
{
  fs.write('D:\\links.txt',"",'w');
  var json = LoadJSON();
  var links ="";
  for ( var i = 0 ; i < json.length;i++)
  {

    if ( json[i].EasyApply==true && json[i].IsGood==true )
    {
      links+=json[i].Link+'\r\n';


    }


  }
  fs.write('D:\\links.txt',links,'w');
console.log("i finished All steps");
child();
}

function child()
{

    var spawn = require("child_process").spawn, child;
    child = spawn("powershell.exe", ["powershell.exe -noprofile -executionpolicy bypass -file D:\\out.ps1"]);
    child.stdout.on("data", function (data) {
        console.log("Powershell Data: " + data);
    });
    child.stderr.on("data", function (data) {
        console.log("Powershell Errors: " + data);
    });
    child.on("exit", function () {
        console.log("Powershell Script finished");
    });
     //end input
 
}




function CaptchaSteps()
{


return page.evaluate(function(){

   if ( document.getElementById('login-email')!=null)
      return 1;
        
    if ( document.querySelector('recaptcha-checkbox-checkmark')!=null) 
      return 2;


    return 0;
               
               
      

});

 


}


var CaptchaArray = 
[
function()
{

 Steps[1]("a");


},
function()
{
  page.evaluate(function(){
    document.querySelector('.recaptcha-checkbox-checkmark').click();
  });
},
function()
{
page.render("D:\\captcha.png")

}
];