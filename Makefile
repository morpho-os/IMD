all:
	tsc --build
	terser --compress -o index.min.js index.js

clean:
	rm -f *.{js,js.map}
