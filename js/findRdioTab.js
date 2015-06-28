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
