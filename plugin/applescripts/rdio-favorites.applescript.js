// vim: filetype=javascript

function findRdioTab(){
  var app = Application("Google Chrome");
  var rdioTab = undefined;

  // Find the tab that has Rdio in it
  for(var i = 0; i < app.windows().length; i++){
    var window = app.windows[i];
    var possibleRdioTabs = window.tabs.whose({
      url: { _contains: "rdio.com" },
      title: { _endsWith : "Rdio" }
    })
    if( possibleRdioTabs.length > 0 ){
      rdioTab = possibleRdioTabs.at(0);
      break;
    }
  }
  return rdioTab;
}


var playCurrentPlaylist = "function playCurrentPlaylist(){   $(\".PlayButton:visible:first\").click(); }";
var playFavorites = "function playFavorites(){   setTimeout(playCurrentPlaylist, 3000);    var $linkToFavoritesStation = $(\".user_nav .station_row\");   $linkToFavoritesStation.click(); }";
var defineFunctions = playCurrentPlaylist + playFavorites;

// The "run" function is automatically run when the file is run, like "main" in
// some other languages.
function run(argv){
  var rdioTab = findRdioTab();
  rdioTab.execute({javascript: defineFunctions});
  rdioTab.execute({javascript: "playFavorites()"});
}
