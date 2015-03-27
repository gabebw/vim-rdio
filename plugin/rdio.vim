" rdio.vim: Play Rdio playlists from Vim
" Written by Gabe Berke-Williams

let s:path_to_this_directory = expand('<sfile>:p:h')
let s:path_to_applescripts = s:path_to_this_directory . "/applescripts/"

function! s:ApplescriptCommand(path)
  let path = s:path_to_applescripts . a:path . ".applescript.js"
  return "osascript -l JavaScript " . path
endfunction

function! s:RdioPlaylists()
  let playlistsCommand = s:ApplescriptCommand('rdio-list-playlists')
  let playlists = system(playlistsCommand)
  " If rdio-list-playlists doesn't find anything, it prints out an LF. This
  " usually happens when  Rdio isn't open.
  let isEmpty = len(playlists) == 1
  if isEmpty
    echom "!! Rdio isn't open"
  else
    let items = fzf#run({'source': playlistsCommand})
    let playlistName = shellescape(items[0])
    let command = s:ApplescriptCommand("rdio-play-specific-playlist") . " " . playlistName
    call system(command)
  endif
endfunction

function! s:RdioPlayPause()
  let command = s:ApplescriptCommand('rdio-play-pause')
  call system(command)
endfunction

function! s:RdioNext()
  let command = s:ApplescriptCommand('rdio-next')
  call system(command)
endfunction

function! s:RdioFavorites()
  let command = s:ApplescriptCommand('rdio-favorites')
  call system(command)
endfunction

command! RdioPlaylists call s:RdioPlaylists()
command! RdioPlayPause call s:RdioPlayPause()
command! RdioNext call s:RdioNext()
command! RdioFavorites call s:RdioFavorites()
