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
    this.tab.execute({javascript: javascript});
  } else if(this.application.name() === "Safari"){
    this.application.doJavaScript(javascript, {in: this.tab});
  }
};
