" rdio.vim: Play Rdio playlists from Vim
" Written by Gabe Berke-Williams

let s:path_to_this_directory = expand('<sfile>:p:h')
let s:path_to_applescripts = s:path_to_this_directory . "/applescripts/"

function! s:ApplescriptCommand(path)
  return "osascript -l JavaScript " . s:path_to_applescripts . a:path
endfunction

function! s:RdioPlaylists()
  let source = s:ApplescriptCommand('rdio-list-playlists.scpt')
  let items = fzf#run({'source': source})
  let playlistName = shellescape(items[0])
  let command = s:ApplescriptCommand("rdio-play-specific-playlist.scpt") . " " . playlistName
  call system(command)
endfunction

command! RdioPlaylists call s:RdioPlaylists()
