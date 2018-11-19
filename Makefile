install:
	npm install
publish:
	npm publish
lint:
	npx eslint .
gendiff-h:
	npx babel-node -- src/bin/gendiff.js -h
