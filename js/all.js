var VimRdio = VimRdio || {};

VimRdio.getPlaylistNames = function(){
  return _.map($("a.playlist"), function(a) { return $(a).prop("title"); })
};

VimRdio.next = function(){
  // $("button.next").click();
  R.player.next();
};

// Start playing the first song of the playlist whose page we're on.
VimRdio.playCurrentPlaylist = function(){
  $(".PlayButton:visible:first").click();
};

VimRdio.playFavorites = function(){
  setTimeout(VimRdio.playCurrentPlaylist, 3000);

  var $linkToFavoritesStation = $(".user_nav .station_row");
  $linkToFavoritesStation.click();
};

VimRdio.playPause = function(){
  // $(".play_pause").click();
  R.player.playPause()
};

VimRdio.selectAndPlayPlaylist = function(playlistName){
  // Wait 3 seconds before hitting play, which should be enough time for the
  // new playlist to load. Make the timeout longer if it's kicking in too soon
  // (for example, if you have a slow connection).
  setTimeout(VimRdio.playCurrentPlaylist, 3000);

  $("a.playlist[title='" + playlistName + "']").click()
}
