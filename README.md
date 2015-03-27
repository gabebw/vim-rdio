# Control Rdio from Vim

> potentially as useful as [Fugitive]

&mdash; [Someone on the internet](http://www.reddit.com/r/vim/comments/2n04wj/control_rdio_from_vim/cm978ag)

[Fugitive]: https://github.com/tpope/vim-fugitive

Requirements:

* OS X Yosemite, since it uses Yosemite's [Javascript for Automation] extensively
* [fzf][fzf] (`brew install fzf`), with the [Vim plugin][fzf-vim] set up
* fzf requires the `curses` Rubygem: `gem install curses`
* You must be using Google Chrome

[Javascript for Automation]: https://developer.apple.com/library/mac/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/index.html
[fzf]: https://github.com/junegunn/fzf
[fzf-vim]: https://github.com/junegunn/fzf#install-as-vim-plugin

## Usage

Install this plugin with your preferred Vim plugin manager, like [Vundle] or
[pathogen].

[Vundle]: https://github.com/gmarik/Vundle.vim
[pathogen]: https://github.com/tpope/vim-pathogen

Now you have some neat Vim commands:

* `:RdioPlaylists`, which lets you fuzzy-find through your Rdio playlists
* `:RdioPlayPause`, which plays/pauses Rdio
* `:RdioNext`, which goes to the next track
* `:RdioFavorites`, which plays only your favorited tracks

You might want to add [mappings] for them:

[mappings]: http://learnvimscriptthehardway.stevelosh.com/chapters/05.html

```vim
nnoremap <Leader>rp :RdioPlayPause<CR>
nnoremap <Leader>rl :RdioPlaylists<CR>
nnoremap <Leader>rn :RdioNext<CR>
nnoremap <Leader>rf :RdioFavorites<CR>
```

## Development

The files in `plugin/applescripts` are generated from the files in `source/`
directory, because they require minified JS that's easier to generate than
hand-code.

To re-generate the files, run `rake`.
