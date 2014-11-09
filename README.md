# Play Rdio playlists from Vim

Requirements:

* OS X, since it uses Applescript extensively
* [fzf][fzf] (`brew install fzf`), with the [Vim plugin][fzf-vim] set up
* fzf requires the `curses` Rubygem

[fzf]: https://github.com/junegunn/fzf
[fzf-vim]: https://github.com/junegunn/fzf#install-as-vim-plugin

## Usage

Install this plugin with your preferred Vim plugin manager, like [Vundle] or
[pathogen].

Run `:Rdio` and you're off.

[Vundle]: https://github.com/gmarik/Vundle.vim
[pathogen]: https://github.com/tpope/vim-pathogen

## Development

The `.scpt` files in `plugin/applescripts` are generated from the `.scpt.in`
files, because they require minified JS that's easier to generate than
hand-code.

To re-generate the `.scpt` files, run `rake`.

