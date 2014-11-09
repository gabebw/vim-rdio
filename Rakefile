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
FileUtils.mkdir_p(OUTPUT)

desc "Render all .something.in files into .something files"
task :render_scpt do
  scpt_in_file_paths = Dir.glob("*.in")
  scpt_in_file_paths.each do |scpt_in_file_path|
    output_file_path = scpt_in_file_path.sub(/\.in$/, "")
    contents = File.read(scpt_in_file_path)
    result = ERB.new(contents).result(binding)
    File.new(OUTPUT + output_file_path, "w").write(result)
  end
end

task default: :render_scpt
