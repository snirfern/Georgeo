var valued=false;

module.exports.Facebook = function
{
var fs = require('fs');
var path = 'D:\\facebook.txt';
var stream = fs.open(path, 'r');
var JobCodes=[];
var Filter = require('./MainFilter.js');
var url='https://www.facebook.com/groups/no.experience';
stream.close();
var page = require('webpage').create();
page.settings.userAgent = 'Mozilla/5.0 (X11; Linux x86_64) ';
fs.write('D:\\facebook.txt',"",'w');


page.open(url, function() {
	  var cookies = page.cookies;
 
page.render('login3.png');
  page.evaluate(function(){
    document.querySelector('#email').value="*****";
    document.querySelector('#pass').value='*****';
    document.querySelector('#loginbutton').click();
    
  });
           page.render('login2.png');


    window.setTimeout(function () {
      var s = page.evaluate(function(){
        var man  = document.querySelectorAll('._5pbw._5vra ');
            var header = document.querySelectorAll('._5ptz');
            var content =  document.querySelectorAll('._5pbx.userContent');


            var json = [];
            for ( var i = 0 ; i <content.length;i++)
            {



               json.push({'man':man[i].textContent,'header':header[i].textContent,'message':content[i].textContent,'IsGood':false,'Email':''});
                  json[i].Email=content[i].textContent.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);

              if ( content[i].textContent.includes('See More')){
                 var see = document.querySelectorAll('.text_exposed_root text_exposed');
                    var tempstring=  json[i].message.substring(0,json[i].message.length-9);
                 json[i].message=tempstring;
               }
            }


            
            return JSON.stringify(json);
      });


var jsoned= JSON.parse(s);
for ( var i = 0 ; i < jsoned.length;i++)
{


  if (Filter.Facebook(jsoned[i].header,jsoned[i].message) )
          jsoned[i].IsGood =true;
}
var jess = JSON.stringify(jsoned);
fs.write(path,jess,'w');
    page.render('login2.png');
          phantom.exit(0);
},7000);


});



}

module.exports.returned =function()
{

  return valued;

}