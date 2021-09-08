# FLLW <img src="fllw.png" width=25>

👋 FLLW is an auto-run package for spwn! whenever you save a `.spwn` file, the program will close Geometry Dash, compile the designated file (using spwn), and run Geometry Dash.

⛔ I have only run this on my computer, so I don't quite know how everything will work on other computers, since this is a `.exe` file, it will only work on windows.

# run FLLW

to run FLLW, have the exe in your directory and type this into the terminal

```terminal
$ ./fllw [flags] <filename>
```

_flags are optional_

_filename can be the filename or filename.spwn, FLLW will add .spwn to the end of the filename if it doesn't have it already_

## info

- made with JavaScript ([node.js](https://nodejs.org/en/))

- converted to exe with [pkg](https://www.npmjs.com/package/pkg)
