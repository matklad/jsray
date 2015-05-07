all:
	./node_modules/.bin/traceur --experimental --out js/main.js src/main.js
	./node_modules/.bin/traceur --out js/worker-impl.js src/worker.js
