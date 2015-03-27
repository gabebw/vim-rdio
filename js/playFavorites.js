function playFavorites(){
  setTimeout(playCurrentPlaylist, 3000);

  var $linkToFavoritesStation = $(".user_nav .station_row");
  $linkToFavoritesStation.click();
}
