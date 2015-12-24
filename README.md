# Control Rdio from Vim

## No longer maintained

Unfortunately [Rdio has shut down](http://www.rdio.com/farewell/), so this
plugin is no longer maintained. :cry:

## The old README, from when Rdio was a Thing

> potentially as useful as [Fugitive]

&mdash; [Someone on the internet](http://www.reddit.com/r/vim/comments/2n04wj/control_rdio_from_vim/cm978ag)

[Fugitive]: https://github.com/tpope/vim-fugitive

Requirements:

* OS X Yosemite, since it uses Yosemite's [Javascript for Automation] extensively
* [fzf][fzf] (`brew install fzf`), with the [Vim plugin][fzf-vim] set up
* fzf requires the `curses` Rubygem: `gem install curses`
* You must be using Google Chrome or Safari (Firefox's Applescript does not
  support sending JS to a tab)

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

* The `plugin/` directory contains `rdio.vim`, which is not auto-generated, and
  `plugin/applescripts/`, which is auto-generated
* The `js/` directory contains JS which is minified as part of the build process
* The `applescripts/` directory contains files which use Erb to bring in and
  minify the JS, then are copied to `plugin/applescripts/`.

To re-generate the files in `plugin/applescripts/`, run `rake`. Don't edit them
directly.
