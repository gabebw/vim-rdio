var VimRdio = VimRdio || {};

VimRdio.getPlaylistNames = function(){
  return _.map($("a.playlist"), function(a) { return $(a).prop("title"); })
};

VimRdio.next = function(){
  // Also: R.player.next()
  $("button.next").click();
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
  // Also: R.player.playPause()
  $(".play_pause").click();
};

VimRdio.selectAndPlayPlaylist = function(playlistName){
  // Wait 3 seconds before hitting play, which should be enough time for the
  // new playlist to load. Make the timeout longer if it's kicking in too soon
  // (for example, if you have a slow connection).
  setTimeout(VimRdio.playCurrentPlaylist, 3000);

  $("a.playlist[title='" + playlistName + "']").click()
}
