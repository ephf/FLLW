require('colors');
const { execSync } = require("child_process");
const { watch } = require("chokidar");

const FLLW = `${"FLLW".green} ${">>".cyan}`;

const file = process.argv.length > 2 ?
  process.argv[2].replace(/(\.spwn)?$/i,'.spwn') :
  false

const flags = process.argv
  .slice(2)
  .join(" ");

const event = watch(file || ".", {depth: Infinity});

event.on('all', (event, fname) => {
  if (!/\.spwn$/i.test(fname)) return;
  if (event == "change") {
    console.log(this.exTimeout)
    if (this.exTimeout) clearTimeout(this.exTimeout);
    this.exTimeout = setTimeout(() => {
      console.log(`${FLLW} Detected changes in "${fname}", running spwn...`);
      try {
        if (execSync("tasklist").toString().indexOf("GeometryDash.exe") + 1) {
          execSync("taskkill /F /IM GeometryDash.exe", { stdio: "inherit" });
          console.log(`${FLLW} Closed Geometry Dash.`);
        }
        execSync(`spwn build ${fname} ${flags}`, { stdio: "inherit" });
        console.log(`${FLLW} Finished building, running Geometry Dash...`);
        execSync("start steam://rungameid/322170");
      } catch (e) {
        console.log(`${FLLW} Error while building, waiting for new changes...`);
      }
    }, 100);
  } else if (fname == file && event == 'unlink') {
    console.log(`${FLLW} Detected rename or delete of "${file}", closing FLLW...`);
    process.exit();
  }
});

console.log(`${FLLW} Ready and waiting for changes to ${file ? `"${file}"` : "any spwn file"}`);
