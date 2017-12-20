var express = require('express');
var fs = require('fs');
var http = require('http');
var request = require('request');

var app = express();

var json = [];
app.use(express.static('public'));


var cock = "snir";


app.get('/', function (req, res) {
    res.sendFile('C:\\Users\\LAPTOP\\Documents\\Visual Studio 2013\\Projects\\NodejsWebApp10\\NodejsWebApp10\\Main.html');

});



app.get('/Indeed', function (req, res) {
   


    var content = "<select style=margin-left:50%;><option>SendAll</option><option>AllJobsIL</option><option>Drushim</option><option>Indeed</option><option>JobNet</option><option>FaceBook</option><option>LinkedIn</option> </select>" + "<br>" + "<button style=margin-left:49.7%;width:100px;height:20px; >Apply All</button>" + "<hr>";
    var path = 'D:\\Indeed.txt';
    var cont = fs.readFileSync(path);
    var obj = JSON.parse(fs.readFileSync(path));
    for (var i = 0; i < obj.length; i++) {
        
     
        content += '<p style="text-align:center;width:500px;margin-left:35%;font-family:Calibri;direction: rtl;">' + '<b>JobTitle</b>' + '<br><br>' + obj[i].JobTitle + '<br><br><b>Location:</b> <br><br>' + obj[i].JobLocation + '<br><br>' + '<b>Content</b> <br>' + obj[i].Content + '<br><br>' + '<b> IsGood :</b><br>' +'<span style="color:'+color(obj[i].IsGood)+'";>'+obj[i].IsGood + '</span><br><br>' + '<b>Link: </b><br><br><a href=' + obj[i].Link + '>ClickMe</a>'+'<br><br></p>'+"<hr>";
        content += "<hr>";
       
    }
    res.send(content);
});

app.get('/AllJobs', function (req, res) {
    var content = "<select style=margin-left:50%;><option>SendAll</option><option>AllJobsIL</option><option>Drushim</option><option>Indeed</option><option>JobNet</option><option>FaceBook</option><option>LinkedIn</option> </select>" + "<br>" + "<button style=margin-left:49.7%;width:100px;height:20px; >Apply All</button>" + "<hr>";
    var path = 'D:\\Alljobs.txt';
    var cont = fs.readFileSync(path);
        var obj = JSON.parse(fs.readFileSync(path));
        for (var i = 0; i < obj.length; i++) {
            
            
            
            content += '<p style="text-align:center;width:500px;margin-left:35%;font-family:Calibri;direction: rtl;">' + '<b>Date:</b>' + '<br><br>' + obj[i].Date + '<br><br><b>Job title:</b> <br><br>' + obj[i].Title + '<br><br>' + '<b>Job Location:</b> <br>' + obj[i].Location + '<br><br>' + '<b> Slavery :</b><br>' + obj[i].HowMuchSlave + '<br><br>' + '<b>Content: </b><br><br>' + obj[i].Content + '<br><br>' + '<b>Requierments: </b><br><br>' + obj[i].Requierments + '<br><br>IsGood:  '+'<span style="color:'+color(obj[i].IsGood)+'";>'+obj[i].IsGood + '</span>'+'</p><hr>';
            content += '<br>' + '<button  style="margin-left:47.5%;width:60px;height:20px;"  >Apply</button>' + '<br><hr>';
            var s = obj[i].Date.split(' ');
            console.log(s[2].substring(0, 2));
        }
    res.send(content);

});



app.get('/Linkedin', function (req, res) {
    var content = "<select style=margin-left:50%;><option>SendAll</option><option>AllJobsIL</option><option>Drushim</option><option>Indeed</option><option>JobNet</option><option>FaceBook</option><option>LinkedIn</option> </select>" + "<br>" + "<button style=margin-left:49.7%;width:100px;height:20px; >Apply All</button>" + "<hr>";
    var path = 'D:\\Linkedin.txt';
    try {
        var obj = JSON.parse(fs.readFileSync(path, 'utf8'));

    for (var i = 0; i < obj.length; i++) {
     
        
        content += '<b>Date</b><br>' + obj[i].Date + '<br><br>' + '<p style="font-family:Calibri;text-align:center;"><b>JobTitle</b><br>' + obj[i].JobTitle + '<br><br><b>CompanyName</b><br>' + obj[i].Company + '<br><br>' + '<b>Location</b><br>' + obj[i].Location+ '<br><br>' + '<b>Description</b><br>' + obj[i].Desc + '<br><br>' +'<b>EasyApply:&nbsp&nbsp</b> ' + obj[i].EasyApply + '&nbsp&nbsp<b>IsGood: </b>&nbsp&nbsp ' +obj[i].IsGood +'<br><br>';
        content += '<br><br><br> <b>Industry</b><br>' + obj[i].Industry + '<br><br><b>SeniorityLevel</b><br>' + obj[i].SeniorityLevel + '<b>EmploymentType</b><br>' + obj[i].EmploymentType + '<br><br><b>Content</b><br>' + obj[i].Content + '<br><br><b>LinkToPage:</b>&nbsp&nbsp<a href=' + obj[i].Link + '>' +'ClickMe' + '</a><br></p>';
        content += "<hr>";
            

        

        }
    } catch (err) { res.send('<p style=margin-left:40%;>&nbsp---- <b>Kushili Linkedin</b> ----<br> have slow and painfull death </p>');};

    res.send(content);

});
app.get('/Facebook', function (req, res) {
    
   
    var content = "<select style=margin-left:50%;><option>SendAll</option><option>AllJobsIL</option><option>Drushim</option><option>Indeed</option><option>JobNet</option><option>FaceBook</option><option>LinkedIn</option> </select>" + "<br>" + "<button disabled style=margin-left:49.7%;width:100px;height:20px; >Apply All</button>" + "<hr>";
    
    var path = 'D:\\facebook.txt';

    var obj = JSON.parse(fs.readFileSync(path, 'utf8'));
    for (var i = 1; i < obj.length; i++)
        content+='Advertiser: '+obj[i].man+ '<br>'+'Time:'+obj[i].header+'<br>'+'<p style="text-align:center;font-size:110%;margin-left:650px;width:500px;direction: rtl;">'+obj[i].message+'<br><br>IsGood:   ' +'<span style="color:'+color(obj[i].IsGood)+'";>'+obj[i].IsGood + '</span>'  + '<br><br>'+ ' Email:  <a href>' + obj[i].Email  + '</a><br><br><button disabled style="width:60px;height:20px;" >Apply</button></p><hr>';

    res.send(content);

});
app.get('/Drushim', function (req, res) {
    
    
    
    var content = "<select style=margin-left:50%;><option>SendAll</option><option>AllJobsIL</option><option>Drushim</option><option>Indeed</option><option>JobNet</option><option>FaceBook</option><option>LinkedIn</option> </select>" + "<br>" + "<button disabled style=margin-left:49.7%;width:100px;height:20px; >Apply All</button>" + "<hr>";
    
    var path = 'D:\\Drushim.txt';
    
    var obj = JSON.parse(fs.readFileSync(path, 'utf8'));
    for (var i = 0; i < obj.length; i++)
        content += '<p style="text-align:center;width:500px;margin-left:35%;font-family:Calibri;direction: rtl;">' + '<b>Date:  </b>' +obj[i].Time+ '<br><br><b>Company:</b><br>  '+obj[i].Company + '<br><br><b>Job title:</b> <br>'+obj[i].JobTitle+'<br>'  + '<br><br>' + '<b>Job Location:</b> <br>' + obj[i].Location + '<br>'  + '<br><br>' + '<b>Content: </b><br><br>' + obj[i].Content + '<br><br>' + '<b>Requierments: </b><br><br>' + obj[i].JobDesc +'<br><br>'+'IsGood :  <span style="color:'+color(obj[i].IsGood)+'";>'+obj[i].IsGood + '</span>'+'<br><br>Link:   <a href="'+obj[i].Link+'">'+obj[i].Link+'</a></p>'+'<hr><hr>';


    res.send(content);
        
        
    
});



app.listen('8081');
console.log('Magic happens on port 8081');

exports = module.exports = app;

function color(IsGood)
{
    if (IsGood)
        return 'green';


    return 'red';
}


