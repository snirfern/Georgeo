var valued=false;

module.exports.AllJobs = function()
{


//////////////////////////////////////////////////////////////////
////////// --------    Phantomjs vars     -------////////////////
/////////////////////////////////////////////////////////////////
var page = require('webpage').create();
page.settings.userAgent = 'Mozilla/5.0 (X11; Linux x86_64) ';
var fs = require('fs');
var Filter = require('./MainFilter.js');
var Content = [];

page.settings.javascriptEnabled = true;
page.settings.loadImages = true;
phantom.javascriptEnabled = true;


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
fs.write('D://Alljobs.txt',"",'w');

//////////////////////////////////////////////////////////////////
////////// --------   Interval counters&flags     -------/////////
/////////////////////////////////////////////////////////////////

var StepsCounter = 0,
    loadInProgress = false;
var flag=0;
var Appliance;
var cvFlag=true;
	var SendCV=0;
var FilteredJson=[];



var SubPageURL=true;
var BlockInterval=false;
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////LoginInterval//////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
var URLcounter=0;
	var PagesNumberPerSearch;


var LoginInterval = setInterval(function(){

console.log("Login - Interval");
			if ( typeof steps[StepsCounter]== "function" && StepsCounter <5 )
			{
				steps[StepsCounter]();
				StepsCounter++;
			}
			else
			{
				Categories();
				clearInterval(LoginInterval);
			}
},15000);
//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////--End--///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////






//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////ALLCategoriesInterval - iterate all categories/////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

var FinishedLoadingURL = true;
function Categories()
{
PagesNumberPerSearch =2;
	var Categories = ['https://www.alljobs.co.il/SearchResultsGuest.aspx?page=1&position=1153&region=1,2,10,6&type=',
						'https://www.alljobs.co.il/SearchResultsGuest.aspx?page=1&position=1323&region=1,2,6&type=',
						//'https://www.alljobs.co.il/SearchResultsGuest.aspx?page=1&position=1203,1692,1712&region=1,2,10,6&type=18',
				
							
						'https://www.alljobs.co.il/SearchResultsGuest.aspx?page=1&position=1546,1547&region=1,2,10,6&type=18,33,14'];

					var URLInterval = setInterval(function()
					{
							if ( FinishedLoadingURL && URLcounter!=(Categories.length+1))
							{
								console.log("FinishedLoadingURL && URLcounter!=4 : "+URLcounter );
								AllPagesInterval(Categories[URLcounter]);
								FinishedLoadingURL=false;
							}
							if ( URLcounter  == (Categories.length+1))
							{
								phantom.exit(0);

							}



					},10000);


}


//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////--End--///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////ALLPageInterval - iterate all pages//////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
function AllPagesInterval(URL)
{
		var Pages= 0;

	console.log("GOT IN");
var AllPagesInterval = setInterval(function(){

	var numbers="";
if (  SubPageURL && Pages != PagesNumberPerSearch )
{
	var UpdatedURL = URL;


Pages=Pages+1;

console.log("Pages agter ++:"+Pages);
	UpdatedURL ='https://www.alljobs.co.il/SearchResultsGuest.aspx?page='+Pages+URL.substring(56,URL.length);
		OnePageInterval(UpdatedURL);
	numbers+=Pages+',';

	SubPageURL = false;
	
}
 else if ( Pages == PagesNumberPerSearch )
{
	console.log("Finished loading all current date pages");
		FinishedLoadingURL=true;	
URLcounter++;

		clearInterval(AllPagesInterval);

}

	},40000);


}


//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////--End--///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////







//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////OnePageInterval - Send All cvs in page///////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

function OnePageInterval(URL)
{
	console.log(URL);
	var FivePages=0;
	var secondcounter = 0;
var interval = setInterval(function(){

if (typeof steps[StepsCounter]== "function"  && !loadInProgress    )
{
	cvFlag=true;
	if ( StepsCounter==6)
	{
		steps[StepsCounter](URL);
			StepsCounter++;

	}
	else
	{
	steps[StepsCounter]();
	StepsCounter++;
	page.render('login1.png');
	}
}
else if (typeof steps[StepsCounter]!= "function"  ) 
{
	if ( cvFlag)
	{
				if ( typeof send[secondcounter]=="function" && !loadInProgress && Appliance != SendCV)
				{
					send[secondcounter](FilteredJson[SendCV].i);
					secondcounter++;
				}
				else if ( Appliance != SendCV)
				{

					SendCV++;
					secondcounter=0;

				}
				else  
				{
					cvFlag=false;
										secondcounter=0;

				}
	}
	else
	{

	StepsCounter=6;
	SubPageURL=true;
	SendCV=0;
	clearInterval(interval);
}
}

},15000);
}


//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////AllSteps Nedded array////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////




var steps = 
[


///////////////////////////////////////////////
///////////////////////////////////////////////

function()
{
page.open('https://www.alljobs.co.il/?Campaign=/Campaigns/Google/Landing3.aspx&AffiliateID=53&gclid=EAIaIQobChMI9I6t1sis1gIVghXTCh3KqQA0EAAYASAAEgICYvD_BwE');

},
///////////////////////////////////////////////
///////////////////////////////////////////////

function()
{
page.evaluate(function(){
});
page.render("login1.png");
},
function()
{
	 page.evaluate(function(){
document.querySelector('#cboxClose').click();

		document.querySelector('.acu.gatbd1').click();
				document.querySelector('input[placeholder="מייל:"]').click();


document.querySelector('input[name="TopBarEmail"]').focus();
		document.querySelector('input[name="TopBarEmail"]').setAttribute('class','ng-valid ng-dirty LTR');
				document.querySelector('input[name="TopBarEmail"]').value="*****";

				document.querySelector('input[name="TopBarEmail"]').dispatchEvent(new Event('input'));
							setTimeout(function(){},5000);
console.log(document.body);



	});
		page.render('login1.png');

},

function()
{				
page.evaluate(function(){
//document.querySelector('#LoginBox').click();
		document.querySelector('input[type="password"]').setAttribute('class','ng-valid ng-dirty LTR');
document.querySelector('input[name="password"]').focus();

				document.querySelector('input[placeholder="סיסמה:"]').click();
			document.querySelector('[placeholder="סיסמה:"]').value="*****";
							document.querySelector('input[placeholder="סיסמה:"]').dispatchEvent(new Event('input'));




			});
	page.render('login1.png');


		
},
function()
{
	setTimeout(function(){
		page.render('login1.png');

	page.evaluate(function(){

				document.querySelector('button[ng-click="LogIn.LogIn()"]').click();
							});
	page.render('login1.png');
	},1000);

},

///////////////////////////////////////////////
///////////////////////////////////////////////



function()
{
	setTimeout(function(){		page.render('login1.png');
},10000);

},


function(URL)
{
	page.open(URL);
	page.render('login1.png');
},
function()
{
	BlockInterval=true;
page.render('login1.png');

var json = fs.read('D://Alljobs.txt');

if ( json !="")
	var Prejson = JSON.parse(json);
else
	var Prejson = [];
var s = page.evaluate(function(Prejson){

var FreeJobs = document.querySelector('#divOpenBoardContainer');
if (  FreeJobs!=null)
{
var Title = FreeJobs.querySelectorAll('.job-content-top-title');
	var Location = FreeJobs.querySelectorAll('.job-content-top-location');
	var HowMuchSlave=FreeJobs.querySelectorAll('.job-content-top-type');
	var JobContent = FreeJobs.querySelectorAll('.job-content-top-acord');
	var Requierments  = FreeJobs.querySelectorAll('.PT15');
	var SettingsApplication = FreeJobs.querySelectorAll('.Hand.gad');
	var AddLetter = FreeJobs.querySelectorAll('.job-sendcv-preltimg');
	var AddPreLetter = FreeJobs.querySelectorAll('#job-sendcv-preletterlnk');
	var Close = FreeJobs.querySelectorAll('.Hand');
	var Date = FreeJobs.querySelectorAll('.job-content-top-date');
	var Header = FreeJobs.querySelectorAll('.N');

console.log(Title.length);
for ( var i = 0 ; i < Title.length;i++)
{




Prejson.push({'Header':Header[i].textContent,'Title':Title[i].textContent,'Location':Location[i].textContent,'HowMuchSlave':HowMuchSlave[i].textContent,'Content':JobContent[i].textContent,'Requierments': Requierments[i].textContent,'Date':Date[i].textContent,'IsGood':false,'i':i});
			
}


return JSON.stringify(Prejson);
}
else
	return JSON.stringify(Prejson);


},Prejson);
var count=0;


var jsoned= JSON.parse(s);
FilteredJson=[];
for ( var i = 0 ; i < jsoned.length;i++)
{
		if ( Filter.AllJobs(jsoned[i].Header,jsoned[i].Title,jsoned[i].Location,jsoned[i].Content,jsoned[i].Requierments))
		{
				jsoned[i].IsGood=true;
				FilteredJson.push(jsoned[i]);
		}


}
var len = page.evaluate(function()
{
	var FreeJobs = document.querySelector('#divOpenBoardContainer');

var Title = FreeJobs.querySelectorAll('.job-content-top-title');
return Title.length;
});







Appliance  =FilteredJson.length;
PagesNumberPerSearch = page.evaluate(function(){
	var PagesNumberDiv = document.querySelector('.jobs-paging-tp').textContent;
	console.log(PagesNumberDiv);
	var splitted = PagesNumberDiv.trim().split(' ');
	return splitted[1];
});

console.log('PagesNumberPerSearch:'+PagesNumberPerSearch);
fs.write('D://Alljobs.txt',JSON.stringify(jsoned),'w');
page.render('login1.png');

},

function()
{
},

];


//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////





var send =
 [

function(TitlesNumber)
{

	page.evaluate(function(TitlesNumber){
				console.log("TITLES NUMBER:"+TitlesNumber);

				var settings = document.querySelectorAll('.Hand.gad');
				settings[TitlesNumber].click();

			},TitlesNumber);
	page.render('login1.png');
},
function(TitlesNumber)
{

	console.log("Preletter");
	page.render('login1.png');
	page.evaluate(function(TitlesNumber){
		console.log(TitlesNumber);
				var OpenPreLetter = document.querySelector('.job-sendcv-preltlnk');
				console.log(TitlesNumber);
				OpenPreLetter.click();
			},TitlesNumber);
		page.render('login1.png');


},
function(TitlesNumber)
{
	
		page.evaluate(function(TitlesNumber){
				var OpenPreLetter = document.querySelector('#job-sendcv-preletterlnk');
				OpenPreLetter.click();
			},TitlesNumber);
			page.render('login1.png');

},

function(TitlesNumber)
{
page.evaluate(function(){

var Apply = document.querySelector('[ng-click="SubmitForm(JobWithMailForm)"]');
Apply.click();
});
},
function(TitlesNumber)
{
	page.render('login1.png');
}
];

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