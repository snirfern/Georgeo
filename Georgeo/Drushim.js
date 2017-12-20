var valued=false;

module.exports.Drushim = function()
{


//////////////////////////////////////////////////////////////////
////////// --------    Phantomjs vars     -------////////////////
/////////////////////////////////////////////////////////////////
var fs = require('fs');
var Filter = require('./DrushimFilter.js');
 loadInProgress = false;



var page = require('webpage').create();

page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.onLoadStarted = function() {
    loadInProgress = true;
};

page.onLoadFinished = function() {
    loadInProgress = false;
        page.render('screenshot.png');

};

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


 //--> Json file for each page <--//
 var TrueJson = [];
 //--> Json file to store date <--//
var path = 'D:\\Drushim.txt'; 


//////////////////////////////////////////////////////////////////
///////////////---------Intervals counters-------////////////////
/////////////////////////////////////////////////////////////////

var StepsCounter=0;
var StepsCounter2 = 0;
var PagesCounter=0;
var PageFlag=false;
var jsonCounter=0;
var LoginnCounter=0;


//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////
//////////    ---------  Login Interval  -------  ////////////////
/////////////////////////////////////////////////////////////////
LoginInterval = setInterval(function(){

fs.write('D:\\Drushim.txt',"",'w');


if (!loadInProgress && typeof Login[LoginnCounter] == "function")
     {

        Login[LoginnCounter]();
        LoginnCounter++;

    }

    if (typeof Login[LoginnCounter] != "function" ) {
        console.log("Login test complete!");
     
                page.render('login2.png');
               AllPagesInterval();
                clearInterval(LoginInterval);

                
               
    }

},10000);


//////////////////////////////////////////////////////////////////
//////    ---------  Login functions array  -------  ////////////
/////////////////////////////////////////////////////////////////
var Login = 
[
function()
{

        page.open('https://www.drushim.co.il/personal/myboard.aspx');


},

function()
{

page.render("login2.png");
},

function()
{

var Login = page.evaluate(function(){

if ( document.querySelector('#MainContent_SignUp_Login_EmailText')!=null)
	return false;



return true;
});


if ( !Login)
{
page.evaluate(function(){

		document.querySelector('.login-email').value ="*****";
		document.querySelector('.login-password').value = "*****";
		document.querySelector('#MainContent_SignUp_Login_SubmitLogin').click();
		Login=true;



});
}


},
];

//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////
//////    ---------  GetJobsData steps array  -------  //////////
/////////////////////////////////////////////////////////////////
var Steps = 

[

function(In)
{
console.log("function in"+In);
        page.open(In);

page.render('login2.png')
},




function(In)
{



	var s = page.evaluate(function()
	{

			var Container = document.querySelectorAll('.jobContainer');
			var json = [];

		
				var JobName = document.querySelectorAll('.jobName');
				var JobDate = document.querySelectorAll('.jobDate');

					for ( var i= 0 ; i <Container.length ; i++)
					{

						var Cont = Container[i].querySelectorAll('.fieldContainer');
						 var Company = Container[i].querySelectorAll('span.fieldTitle');
						var Button = Container[i].querySelector('.stdButton.orangeBg.roundCorners.sendCV');
						var Link = Button.getAttribute('action');
						console.log(Link);
						var JobCode = Button.getAttribute('jobcode');


						json.push({'Company':Company[0].textContent,'JobTitle':JobName[i].textContent,'Content':Cont[0].textContent,'JobDesc':Cont[1].textContent,'Experience':Cont[2].textContent,'Location':Cont[3].textContent,'IsGood':false,'Link':'NoLink','JobCode':JobCode,'Time':JobDate[i].textContent});
					
							if ( Link!='popup')
							{
								json[i].Link = Button.getAttribute('action');
								json[i].IsGood='RedirectPage';
							}
							if ( Button ==null)
								json[i].IsGood=false;


					}





					             return json;
	});

	for ( var i = 0 ; i < s.length;i++)
	{
		if ( Filter.Drushim(s[i]) && s[i].IsGood!='RedirectPage')
		{
			s[i].IsGood=true;

		}
	}


UpdateJSON(s);

 



	TrueJson = s;

				    		


}

];


///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////-----Main Interval-----///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
function MainInterval(AddressIn)
{

	PageFlag=true;

Interval = setInterval(function() {
    if (!loadInProgress && typeof Steps[StepsCounter] == "function")
     {

        Steps[StepsCounter](AddressIn);
        StepsCounter++;

    }

    if (typeof Steps[StepsCounter] != "function" ) {
        console.log("test complete!");
     StepsCounter=0;
                page.render('login2.png');
                Interval2();
                clearInterval(Interval);

                
               
    }

}, 15000);
}

///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////-----SendCV Interval-----//////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

function Interval2()
{
console.log("I am in interval number 2!");
interval2 = setInterval(function(){


	 if ( jsonCounter == TrueJson.length-1)
	 {
	 	
	 	PageFlag=false;
	 	clearInterval(interval2);
	 }
if ( TrueJson[jsonCounter].IsGood==true )
{
	 if (!loadInProgress && typeof Steps2[StepsCounter2] == "function" )
     {

        Steps2[StepsCounter2](TrueJson[jsonCounter].JobCode);
        StepsCounter2++;

    }
   




    if (typeof Steps2[StepsCounter2] != "function" ) 
    {
     
               StepsCounter2=0;
               jsonCounter++;
               
    }

   }
   else
   	jsonCounter++;

},10000);

}

///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////  -----  ApplyJobs steps array  -----  /////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

var Steps2 = 
[

function(idIn)
{

page.evaluate(function(idIn){

						document.querySelector('#jobItem'+idIn).querySelector('.expandLink').click();



},idIn);


},

function(idIn)
{

page.evaluate(function(idIn){

						document.querySelector('#jobItem'+idIn).querySelector('.stdButton.orangeBg.roundCorners.sendCV').click();



},idIn);


},

function(idIn)
{

page.evaluate(function(idIn){

						document.querySelector('#SendCVPopup'+idIn).querySelector('.stdButton.orangeBg.roundCorners').click();



},idIn);


},





];





///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////-----AllPagesInterval-----////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


function AllPagesInterval()
{

var Page ='https://www.drushim.co.il/personal/myboard.aspx';
var Interval = setInterval(function(){
if ( !PageFlag)
{
	jsonCounter=0;
	if ( PagesCounter==0)
	{
		MainInterval('https://www.drushim.co.il/personal/myboard.aspx/');
		PagesCounter++;
	}
	else
		MainInterval(Page+'/?page='+PagesCounter)

PagesCounter++;
}

if ( PagesCounter==20)
{
	var valued=true;

	phantom.exit(0);
}



},15000);






}

//////////////////////////////////////////////////////////////////////////////////////////////
							//------Update JSON file--------\\
//////////////////////////////////////////////////////////////////////////////////////////////
function UpdateJSON(jsonIn)
{
		var JsonFile = fs.read('D:\\Drushim.txt');
if ( JsonFile!="")
{
  	var jsoned =JSON.parse(JsonFile);
  	var concat = jsoned.concat(jsonIn);
  	console.log(concat[0].JobTitle);
  	console.log("json file length: "+concat.length);

	var Stringified =  JSON.stringify(concat);
	fs.write('D:\\Drushim.txt', Stringified, 'w');
  	
  	
}
else
{
	var Stringified =  JSON.stringify(jsonIn);
	fs.write('D:\\Drushim.txt',Stringified,'w');
}
//////////////////////////////////////////////////////////////////////////////////////////////


}
}
module.exports.returned =function()
{

  return valued;

}