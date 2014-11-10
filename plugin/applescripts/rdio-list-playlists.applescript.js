// vim: filetype=javascript

function findRdioTab(){
  var app = Application("Google Chrome");
  var rdioTab = undefined;

  // Find the tab that has Rdio in it
  for(var i = 0; i < app.windows().length; i++){
    var window = app.windows[i];
    var possibleRdioTabs = window.tabs.whose({
      url: { _contains: "rdio.com" },
      title: { _endsWith : "– Rdio" }
    })
    if( possibleRdioTabs.length > 0 ){
      rdioTab = possibleRdioTabs.at(0);
      break;
    }
  }
  return rdioTab;
}


// The "run" function is automatically run when the file is run, like "main" in
// some other languages.
function run(argv) {
  var rdioTab = findRdioTab();
  if( rdioTab !== undefined ){
    var defineFunctions = "function getPlaylistNames(){   return _.map($('a.playlist'), function(a) { return $(a).prop('title'); }) }";
    rdioTab.execute({javascript: defineFunctions});
    var result = rdioTab.execute({javascript: 'getPlaylistNames()'})

    // The return value gets printed to STDOUT.
    return result.join("\n");
  }
}
