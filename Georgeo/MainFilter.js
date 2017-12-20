
 ///////////////////////////////////////////////////////////////
 ////////////////-----> Filter values  <--------///////////////
 ///////////////////////////////////////////////////////////////

var JobTilteDesc = ['informatica','צ"ר','יאסדנה','ייצור','רוציי','embedded','pl','cach','intersystem','dsp','siebel','cobol','gpa','university','known','manager','lead','team lead','הסונמ','tibco','osb','סדנהמ ',' scala ','rpg','magic','wordpress','סרפדרוו','תויתרבח תותשר','טנרטניא','sharepoint','יארחא','++c','c++','leader','ios','soi',' qa ',' integration ','project manager',' php',' senior ',' react ','reduce','linux','unix',' senior ',' manager','היצמוטוא','הנכות קדוב','ריכב ','תווצ שאר','קדוב','ראש צוות','להנמ','מנהל','vb','sales','םוסרפ','engineer'];
var Location = ['tel-hai','telhai','tel hai','eilat','תליא','יח-לת','יחלת','יח לת','הנומש-תיירק','הנומש תיירק'];

var WantedContent = ['junior',' c#',' c ','.net','dotnet','dot net','js','javascript','java script','nodejs','node js','java','bsc','html','html5','css','android','jquery','sql','no sql','nosql','mongodb','mongo db','oop','web','client','frontend','front-end','developer'];

var Experiment = ['3','4','5','6','7','10','םייתנש'];
		

 ///////////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////////
 ///////////////////////////////////////////////////////////////



module.exports.Drushim = function(json)
{






				
var JobTitle  = json.JobTitle.toLowerCase();
var JobDesc = json.JobDesc.toLowerCase();
var Experience = json.Experience.toString().toLowerCase();
var Location = json.Locaton.toLowerCase();


						
								return TitleAndContent(JobTilte)&&Experience(Experience)&&Location(Location);



					};


module.exports.Indeed =function(json)
{




var JobContent  = json.Content.toLowerCase();
var JobLocation = json.JobLocation.toLowerCase();

return Location(Location)&&TitleAndContent(JobContent);
					


};


module.exports.Linkedin = function(SeniorityLevel,EmploymentType,Content)
{


var JobContent  = Content.toLowerCase();
var Experience = SeniorityLevel.toLowerCase();

return TitleAndContent(JobContent)&&Experience(Experience);




};
module.exports.AllJobs = function(Header,Title,Location,Content,Requierments)
{

var JobContent  = Content.toLowerCase();
var Experience = SeniorityLevel.toLowerCase();
 return Experience(Experience)&&TitleAndContent(Title)&&TitleAndContent(Content);








};


module.exports.Facebook = function(Header,ContentIn)
{




return TitleAndContent(ContentIn);
};




function TitleAndContent(TitleIn)
{

for ( var i = 0   ; i < JobTilteDesc.length ; i++)
{
	var Temp =JobTilteDesc[i].toString().toLowerCase();
	if ( TitleIn.toLowerCase().indexOf(Temp)>-1)
		return false;

}

for ( var j = 0   ; j < WantedContent.length ; j++)
{
	if ( Content.toLowerCase().indexOf(WantedContent[i]))
			true;
}

return false;
}





function Location(LocationIn)
{

for ( var k = 0 ; k < Location.length;k++)


						{
							if ( json.Location.toLowerCase().indexOf(Location[k])>-1  && json.Location.toLowerCase().length <6 )
								return false;
						}

}
return true;
}








function Experiment(ExpIn)
{
for ( var exp = 0 ; exp < Experiment.length;exp++)
{


	Temp = Experiment[exp].toString().toLowerCase();
if ( Requierments.toLowerCase().indexOf(Temp)>-1)
		return false;

}
return true;
}