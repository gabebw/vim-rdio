# Control Rdio from Vim

Requirements:

* OS X Yosemite, since it uses Yosemite's [Javascript for Automation] extensively
* [fzf][fzf] (`brew install fzf`), with the [Vim plugin][fzf-vim] set up
* fzf requires the `curses` Rubygem: `gem install curses`

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

You might want to add [mappings] for them:

[mappings]: http://learnvimscriptthehardway.stevelosh.com/chapters/05.html

```vim
nnoremap <Leader>rpp :RdioPlayPause<CR>
nnoremap <Leader>rpl :RdioPlaylists<CR>
nnoremap <Leader>rn :RdioNext<CR>
```

## Development

The `.scpt` files in `plugin/applescripts` are generated from the `.scpt.in`
files, because they require minified JS that's easier to generate than
hand-code.

To re-generate the `.scpt` files, run `rake`.

