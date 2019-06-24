all:
	tsc --build
	minify imd.js --no-comments --removeConsole --removeDebugger --out-file imd.min.js

clean:
	rm -f *.{js,js.map}
