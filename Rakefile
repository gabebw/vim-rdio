require "erb"
require "fileutils"

def minify_javascript(filename)
  contents = File.read("./js/" + filename)
  contents.gsub!(%r{^ *//.*\n}, "")
  contents.gsub!("\n", " ")
  contents.strip!
  '"' + contents.gsub('"', '\\"') + '"'
end

OUTPUT = "./plugin/applescripts/"
EXTENSION = "erb"
FileUtils.mkdir_p(OUTPUT)

desc "Render all .something.#{EXTENSION} files into .something files"
task :render_erb do
  paths = Dir.glob("source/*.#{EXTENSION}")
  paths.each do |path|
    without_extension = path.sub(/\.#{EXTENSION}$/, "")
    output_basename = File.basename(without_extension)
    full_output_path = OUTPUT + output_basename

    rendered = ERB.new(File.read(path)).result(binding)

    FileUtils.rm_f(full_output_path)
    File.new(full_output_path, "w").write(rendered)
  end
end

task default: :render_erb
