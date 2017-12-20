var valued=false;

module.exports.Linkedin = function()
{
var fs = require('fs');
var Filter = require('./MainFilter.js');



var page = require('webpage').create();
page.settings.userAgent = 'Mozilla/5.0 (X11; Linux x86_64)';

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

    fs.write('D:\\Linkedin.txt',"",'w');

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
},25000);







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
        
      
                 document.getElementById('login-email').value = "*****";
                document.getElementById('login-password').value = "*****";
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



///////////////////////////////////////////////////////////////////////////
////////////////////////---Pages Interval---///////////////////////////////
//////////////////////////////////////////////////////////////////////////




var Pages = ['https://www.linkedin.com/jobs/search/?keywords=junior%20javascript%20developer&location=Israel&locationId=il%3A0',
'https://www.linkedin.com/jobs/search/?keywords=junior%20developer&location=Israel&locationId=il%3A0',
              'https://www.linkedin.com/jobs/search/?keywords=junior%20frontend%20developer&location=Israel&locationId=il%3A0',
              'https://www.linkedin.com/jobs/search/?keywords=junior%20web%20developer&location=Israel&locationId=il%3A0',
              'https://www.linkedin.com/jobs/search/?keywords=Full%20Stack%20Developer&location=Israel&locationId=il%3A0',
              'https://www.linkedin.com/jobs/search/?keywords=junior%20javascript%20developer&location=Israel&locationId=il%3A0',
              'https://www.linkedin.com/jobs/search/?keywords=dotnet%20developer&location=Israel&locationId=il%3A0',
              'https://www.linkedin.com/jobs/search/?keywords=Full%20Stack%20Developer&location=Israel&locationId=il%3A0&start=25',
              'https://www.linkedin.com/jobs/search/?keywords=Full%20Stack%20Developer&location=Israel&locationId=il%3A0&start=50',
              'https://www.linkedin.com/jobs/search/?keywords=Full%20Stack%20Developer&location=Israel&locationId=il%3A0&start=75',
              'https://www.linkedin.com/jobs/search/?keywords=Full%20Stack%20Developer&location=Israel&locationId=il%3A0&start=100'];



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
page.open(AdressIn);
page.render('login2.png');

},

function()
{

      page.viewportSize = {
    width: 1080 ,
    height: 1920 
};
},
function()
{
  page.evaluate(function(){
  window.scrollTo(0,2000);

});
},
function()
{
  page.evaluate(function(){
  window.scrollTo(0,4000);

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

          var json=[];

              for ( var i = 0 ; i < JobTitle.length;i++)
              {
console.log('links : '+Links[i]);
                json.push({'JobTitle':JobTitle[i].textContent,'Company':Company[i].textContent,'Location':Place[i].textContent,'Desc':Desc[i].textContent,'Date':JobDate[i].textContent,'EasyApply':false,'IsGood':false,'Link':'https://www.linkedin.com'+Links[i].querySelector('.job-card-search__link-wrapper.js-focusable-card.ember-view').getAttribute('href'),'SeniorityLevel':'','Industry':'','Content':'','EmploymentType':''});

                if (EasyApply[i].textContent.indexOf('Easy Apply')>-1)
                  json[i].EasyApply=true;
                if ( Place[i].textContent.toLowerCase()!='jerusalem' && Place[i].textContent.toLowerCase()!='tel-hai')
                  json[i].IsGood=true;
              }


                  return json;

       
        });


          UpdateJSON(s);
        
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
  }

  if (typeof Steps[StepsCounter] != "function" ) 
  {
        console.log("test complete!");

          StepsCounter=0;
         
              PagesCounter++;
               PagesFlag=true;

        clearInterval(Interval);
                console.log("Finished");


                
               
    }


},10000);
}


var JsonCounter=0;
function ApplyInterval()
{

var json= LoadJSON();
console.log("Load json part: "+json[1].IsGood);
var Intervaled  = setInterval(function()
{
if ( JsonCounter < json.length)
{



   console.log ( "jsonounter : "+JsonCounter + "Eastaply : "+json[JsonCounter].EasyApply);
   
if ( StepsApplyCounter==4 && !json[JsonCounter].EasyApply )
{
  StepsApplyCounter=254;
}


if ( typeof CompanyPageSteps[StepsApplyCounter]== "function" && !loadInProgress)
{









    CompanyPageSteps[StepsApplyCounter](json);


     
  

   ++StepsApplyCounter;

}


if ( typeof CompanyPageSteps[StepsApplyCounter]!= "function" )
{
  ++JsonCounter;
  StepsApplyCounter=0;



}
}

else
{
  clearInterval(Intervaled);
   phantom.exit(0);
 
}

},17000);

}

var CompanyPageSteps = 
[
function(json)
{

page.open(json[JsonCounter].Link);
page.render('login2.png');



},
function(json)
{
  page.render('login2.png');

},

function(json)
{
        page.evaluate(function(){


            document.querySelector('[aria-controls="job-details"]').click();

        });
},
function(json)
{


  var s = page.evaluate(function(json,JsonCounter){


  var SeniorityLevel = document.querySelector('.jobs-box__body.js-formatted-exp-body');
          var Industry = document.querySelector('.jobs-box__list-item.jobs-description-details__list-item');
          var EmploymentType = document.querySelector('.jobs-box__body.js-formatted-employment-status-body');
          var Content = document.querySelector('#job-details');
          var ApplyLink = document.querySelector('.a11y-text');

if ( !json[JsonCounter].Easyapply)
{

  var url = document.querySelector('body').textContent.toLowerCase();
var startindex = url.indexOf('companyapplyurl');
var endindex = url.indexOf('linkedinjobs');
console.log("startindex of link is : "+startindex + "end index : "+endindex);
var Link = url.substring(startindex,endindex);

json[JsonCounter].Link = Link+'LinkedInJobs';
}

      

json[JsonCounter].SeniorityLevel = SeniorityLevel.textContent;
  json[JsonCounter].Industry = Industry.textContent;
  json[JsonCounter].EmploymentType = EmploymentType.textContent;
  json[JsonCounter].Content = Content.textContent;

     
      if (document.querySelector('.jobs-details-top-card__actions.mt4').textContent.indexOf('Easy Apply') >-1  )
      {
              json.EasyApply = true;

}


  
return json;

  },json,JsonCounter);

var Stringified = JSON.stringify(s);
  fs.write('D:\\Linkedin.txt', Stringified, 'w');




},


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
document.querySelector('.jobs-apply-form__recent-resume-filename').click();


});
page.uploadFile('input[name=file]', 'D:\\CV.pdf');
},







function()
{
  page.evaluate(function(){

    document.querySelector('.jobs-apply-form__submit-button.button-primary-large').click();
  });
  
},

function()
{


  
  page.render('login2.png');
}
];
//////////////////////////////////////////////////////////////////////////////////////////////
              //------Update JSON file--------\\
//////////////////////////////////////////////////////////////////////////////////////////////
function UpdateJSON(jsonIn)
{
   fs.write('D:\\Linkedin.txt','','w');

  var Stringified =  JSON.stringify(jsonIn);
  fs.write('D:\\Linkedin.txt',Stringified,'w');

}
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////----Load my pretty json file----////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////


function LoadJSON()
{

    var JsonFile = fs.read('D:\\Linkedin.txt');
    var jsoned =JSON.parse(JsonFile);
      console.log("LOADJSON : "+jsoned[3].IsGood);

    return jsoned;


}
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
}
module.exports.returned =function()
{

  return valued;

}