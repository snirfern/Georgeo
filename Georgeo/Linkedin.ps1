function Read()
{

$counter = Get-Content D:\links.txt | Measure-Object -Line
[Array]$Links = Get-Content D:\links.txt;
$run=0;


ForEach($i in $Links)
{
Write-Host $i;
}
while ( $run -ne $counter)
{
    
    Timer([string]$Links[$run])
    $run++;
    Start-Sleep -m 3


}
Get-Process phantomjs.exe | Foreach-Object { $_.CloseMainWindow() }

}

function Timer($Url2)
{
[void] [System.Reflection.Assembly]::LoadWithPartialName("'System.Windows.Forms")
[void] [System.Reflection.Assembly]::LoadWithPartialName("'Microsoft.VisualBasic")
                           $wshell = New-Object -ComObject wscript.shell;
$wshell.AppActivate('InternetExplorer');


#$Url  = 'https://www.linkedin.com/uas/login?session_redirect=https%3A%2F%2Fwww%2Elinkedin%2Ecom%2Fjobs%2Fview%2F521546447%2F&fromSignIn=true&trk=uno-reg-join-sign-in';
$Phone = '0542234805';
$Chrome = New-Object -com InternetExplorer.application;
$Chrome.fullscreen = $false;
$Chrome.visible = $true;
#$Chrome.navigate($Url);

 Function maxIE
{
param($ie)
$asm = [System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms")

    $screen = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
    $ie.Width = $screen.width
    $ie.Height =$screen.height
    $ie.Top =  0
    $ie.Left = 0
}
maxIE $Chrome

$asm = [System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms")

$screen = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds;
$Chrome.height = $screen.height;



$Chrome.navigate($Url2);

	
start-sleep -s 10;
[Windows.Forms.Cursor]::Position = "$(490),$(345)" 
Add-Type -MemberDefinition '[DllImport("user32.dll")] public static extern void mouse_event(int flags, int dx, int dy, int cButtons, int info);' -Name U32 -Namespace W;
#left mouse click
[W.U32]::mouse_event(6,0,0,0,0);


start-sleep -s 5;

[Windows.Forms.Cursor]::Position = "$(820),$(380)" 
start-sleep -s 1
[Windows.Forms.Cursor]::Position = "$(700),$(560)"
 start-sleep -s 2
[Windows.Forms.Cursor]::Position = "$(900),$(580)" 
start-sleep -s 4
[Windows.Forms.Cursor]::Position = "$(500),$(390)" 
start-sleep -s 1


Add-Type -MemberDefinition '[DllImport("user32.dll")] public static extern void mouse_event(int flags, int dx, int dy, int cButtons, int info);' -Name U32 -Namespace W;
#left mouse click
[W.U32]::mouse_event(6,805,580,0,0);


start-sleep -s 3;

[System.Windows.Forms.SendKeys]::SendWait("{0}{5}{4}{2}{2}{3}{5}{4}{0}{5}")
start-sleep -s 6;
[Windows.Forms.Cursor]::Position = "$(500),$(452)" 
[W.U32]::mouse_event(6,0,0,0,0);
Add-Type -MemberDefinition '[DllImport("user32.dll")] public static extern void mouse_event(int flags, int dx, int dy, int cButtons, int info);' -Name U32 -Namespace W;
#left mouse click
 
[W.U32]::mouse_event(6,0,0,0,0);



start-sleep -s 10;
 
Add-Type -AssemblyName System.Windows.Forms

[Windows.Forms.Cursor]::Position = "$(600),$(280)"
start-sleep -s 2
[Windows.Forms.Cursor]::Position = "$(200),$(380)"
start-sleep -s 1
[Windows.Forms.Cursor]::Position = "$(800),$(580)"




       
start-sleep -s 7
[Windows.Forms.Cursor]::Position = "$(805),$(610)"
start-sleep -s 3
Add-Type -MemberDefinition '[DllImport("user32.dll")] public static extern void mouse_event(int flags, int dx, int dy, int cButtons, int info);' -Name U32 -Namespace W;
#left mouse click
[W.U32]::mouse_event(6,0,0,0,0);



start-sleep -s -5
Get-Process iexplore.exe | Foreach-Object { $_.CloseMainWindow() }


}








Read