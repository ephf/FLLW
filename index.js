const { execSync } = require("child_process");
const { watch } = require("fs");
const file = process.argv[process.argv.length - 1].replace(
  /\.spwn$|$/,
  ".spwn"
);
const flags = process.argv.slice(2, process.argv.length - 1).join(" ");

var exTimeout;

watch(".", (event, fname) => {
  if (/\.spwn$/.test(fname)) {
    if (event == "change") {
      if (exTimeout) {
        clearTimeout(exTimeout);
      }
      exTimeout = setTimeout(() => {
        console.log(`FLLW >> Detected changes in "${file}", running spwn...`);
        try {
          if (execSync("tasklist").toString().indexOf("GeometryDash.exe") + 1) {
            execSync("taskkill /F /IM GeometryDash.exe", { stdio: "inherit" });
            console.log("FLLW >> Closed Geometry Dash.");
          }
          execSync(`spwn build ${file} ${flags}`, { stdio: "inherit" });
          console.log(`FLLW >> Finished building, running Geometry Dash...`);
          execSync("start steam://rungameid/322170");
        } catch (e) {
          console.log(
            `FLLW >> Error while building, waiting for new changes...`
          );
        }
      }, 100);
    } else if (fname == file) {
      console.log(
        `FLLW >> Detected rename or delete of "${file}", closing FLLW...`
      );
      process.exit();
    }
  }
});

console.log(`FLLW >> Ready and waiting for changes to "${file}"`);
