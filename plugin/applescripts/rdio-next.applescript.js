// vim: filetype=javascript

var VimRdio = VimRdio || {};

VimRdio.findRdioTab = function(){
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


function run(argv) {
  var rdioTab = VimRdio.findRdioTab();
  var defineFunctions = "var VimRdio = VimRdio || {};  VimRdio.getPlaylistNames = function(){   return _.map($(\"a.playlist\"), function(a) { return $(a).prop(\"title\"); }) };  VimRdio.next = function(){   $(\"button.next\").click(); };  VimRdio.playCurrentPlaylist = function(){   $(\".PlayButton:visible:first\").click(); };  VimRdio.playFavorites = function(){   setTimeout(VimRdio.playCurrentPlaylist, 3000);    var $linkToFavoritesStation = $(\".user_nav .station_row\");   $linkToFavoritesStation.click(); };  VimRdio.playPause = function(){   $(\".play_pause\").click(); };  VimRdio.selectAndPlayPlaylist = function(playlistName){   setTimeout(VimRdio.playCurrentPlaylist, 3000);    $(\"a.playlist[title='\" + playlistName + \"']\").click() }";
  rdioTab.execute({javascript: defineFunctions});
  rdioTab.execute({javascript: "VimRdio.next()"});
}
