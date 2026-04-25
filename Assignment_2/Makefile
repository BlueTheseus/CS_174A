install:
	npm init -y
	npm install --save three
	npm install --save-dev vite

run:
	npx vite

nix-run:
	nix-shell -p nodejs --run 'make run'

clean:
	rm -rf node_modules package-lock.json package.json

submission:
	7z a -tzip '-x!node_modules' '-x!package-lock.json' Assignment2.zip ../Assignment_2
