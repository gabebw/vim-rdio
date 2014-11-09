require "erb"
require "fileutils"

def minify_javascript(filename)
  contents = File.read("./js/" + filename)
  contents.gsub!(%r{^ *//.*\n}, "")
  contents.gsub!("\n", " ")
  contents.gsub!('"', '\\"')
  contents.strip
end

OUTPUT = "./plugin/applescripts/"
FileUtils.mkdir_p(OUTPUT)

desc "Create the rdio-lists-playlists.scpt file"
task :list_playlists do
  list_playlists_contents = File.read("rdio-list-playlists.scpt.in")
  result = ERB.new(list_playlists_contents).result(binding)

  File.new(OUTPUT + "rdio-list-playlists.scpt", "w").write(result)
end

desc "Create the rdio-play-specific-playlist.scpt file"
task :play_specific_playlist do
  play_specific_playlist_contents = File.read("rdio-play-specific-playlist.scpt.in")
  result = ERB.new(play_specific_playlist_contents).result(binding)

  File.new(OUTPUT + "rdio-play-specific-playlist.scpt", "w").write(result)
end

task default: [:list_playlists, :play_specific_playlist]
