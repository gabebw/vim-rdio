// vim: filetype=javascript

var VimRdio = VimRdio || {};

// Detect if an application with the given name is running.
// This is necessary because calling `Application(name)` causes that application
// to open. This way we can check if something is running without opening it.
VimRdio._applicationIsRunning = function(applicationName){
  var systemEvents = Application("System Events");

  var applicationsWithName = systemEvents.applicationProcesses.whose({name: applicationName});
  return applicationsWithName.length > 0;
}

// Given the name of an application (like "Google Chrome"), and the name of the
// tab property that corresponds to the tab's title, search that application for
// the tab that has Rdio playing in it.
// We need tabTitleProperty because Chrome has `tab.title`, while Safari calls
// it `tab.name`.
VimRdio._findRdioTab = function(applicationName, tabTitleProperty){
  var application = Application(applicationName);
  var rdioTab = undefined;
  var criteria = {};
  criteria.url = { _contains: "rdio.com" };
  criteria[tabTitleProperty] = { _endsWith : "Rdio" };

  for(var i = 0; i < application.windows().length; i++){
    var window = application.windows[i];
    var possibleRdioTabs = window.tabs.whose(criteria);
    if( possibleRdioTabs.length > 0 ){
      rdioTab = possibleRdioTabs.at(0);
      break;
    }
  }
  if(rdioTab){
    return new VimRdio.RdioTab(application, rdioTab);
  } else {
    return undefined;
  }
}

// Find a tab that has Rdio in it, in either Google Chrome or Safari.
VimRdio.findRdioTab = function(){
  if(VimRdio._applicationIsRunning("Google Chrome")){
    return VimRdio._findRdioTab("Google Chrome", "title")
  } else if(VimRdio._applicationIsRunning("Safari")){
    return VimRdio._findRdioTab("Safari", "name")
  }
}

// An object that wraps the Rdio browser tab returned by the Javascript bridge.
//
// It's an intermediate layer so we can use the same interface to send
// Javascript to a Safari or Google Chrome tab, both of which have slightly
// differnt APIs.

VimRdio.RdioTab = function(application, tab){
  this.application = application;
  this.tab = tab;
};

VimRdio.RdioTab.prototype.executeJavascript = function(javascript){
  if(this.application.name() === "Google Chrome"){
    return this.tab.execute({javascript: javascript});
  } else if(this.application.name() === "Safari"){
    return this.application.doJavaScript(javascript, {in: this.tab});
  }
};


// The "run" function is automatically run when the file is run, like "main" in
// some other languages.
function run(argv){
  var rdioTab = VimRdio.findRdioTab();
  var playlistName = argv[0];
  var defineFunctions = "var VimRdio = VimRdio || {};  VimRdio.getPlaylistNames = function(){   return _.map($(\"a.playlist\"), function(a) { return $(a).prop(\"title\"); }) };  VimRdio.next = function(){   R.player.next(); };  VimRdio.playCurrentPlaylist = function(){   $(\".PlayButton:visible:first\").click(); };  VimRdio.playFavorites = function(){   setTimeout(VimRdio.playCurrentPlaylist, 3000);    var $linkToFavoritesStation = $(\".user_nav .station_row\");   $linkToFavoritesStation.click(); };  VimRdio.playPause = function(){   R.player.playPause() };  VimRdio.selectAndPlayPlaylist = function(playlistName){   setTimeout(VimRdio.playCurrentPlaylist, 3000);    $(\"a.playlist[title='\" + playlistName + \"']\").click() }";
  rdioTab.executeJavascript(defineFunctions);
  rdioTab.executeJavascript(
    'VimRdio.selectAndPlayPlaylist("' + playlistName + '")'
  );
}
