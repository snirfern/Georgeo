///////////////////////////////////////////////////////////////////////////////////
//////////////-----Call Everybody to the disco party!--------------\\\\\\\\\\\\\\\\
///////////////////////////////////////////////////////////////////////////////////



var Facebook =require('D:\\Facebook.js');
var AllJobs =require('D:\\Alljobs.js');
var Indeed =require('D:\\Indeed.js');
var Drushim = require('D:\\Drushim.js');
var Linkedin = require('D:\\linkedin.js');

var active=false;
var Counter =0;
var  value = [function(){return Linkedin.returned();},function(){return Drushim.returned();},function(){return Indeed.returned();},function(){return Facebook.returned();},function(){return AllJobs.returned();}];

var  DiscoParty = [function(){Linkedin.Linkedin();},function(){Drushim.Drushim();},function(){Indeed.Indeed();},function(){Facebook.Indeed();},function(){AllJobs.Indeed();}];
var intervaled = setInterval(function(){


if (!active )
{
	DiscoParty[Counter]();
	active=true;
}


if (value[Counter]())
{
	active=false;
	Counter++;
}


if ( Counter == DiscoParty.length)
{
	console.log("finished working on all models...");
	phantom.exit(0);
}



},10000);



