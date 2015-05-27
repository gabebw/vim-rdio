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
