" rdio.vim: Play Rdio playlists from Vim
" Written by Gabe Berke-Williams

let s:path_to_this_directory = expand('<sfile>:p:h')
let s:path_to_applescripts = s:path_to_this_directory . "/applescripts/"

function! s:RunApplescript(path, ...)
  if a:0 > 0
    let commandArgument = a:1
  else
    let commandArgument = ""
  endif
  let path = s:path_to_applescripts . a:path . ".applescript.js"
  let command = join(["osascript -l JavaScript", path, commandArgument], " ")
  return system(command)
endfunction

function! s:RdioPlaylists()
  let playlists = split(s:RunApplescript('rdio-list-playlists'), "\n")
  " If rdio-list-playlists doesn't find anything, it prints out an LF or a
  " single line of error message, both of which count as a single list entry.
  " This usually happens when Rdio isn't open.
  let isEmpty = len(playlists) == 1
  if isEmpty
    echom "!! Rdio isn't open"
  else
    let items = fzf#run({'source': playlists})
    let playlistName = shellescape(items[0])
    call s:RunApplescript("rdio-play-specific-playlist", playlistName)
  endif
endfunction

function! s:RdioPlayPause()
  call s:RunApplescript('rdio-play-pause')
endfunction

function! s:RdioNext()
  call s:RunApplescript('rdio-next')
endfunction

function! s:RdioFavorites()
  call s:RunApplescript('rdio-favorites')
endfunction

command! RdioPlaylists call s:RdioPlaylists()
command! RdioPlayPause call s:RdioPlayPause()
command! RdioNext call s:RdioNext()
command! RdioFavorites call s:RdioFavorites()
