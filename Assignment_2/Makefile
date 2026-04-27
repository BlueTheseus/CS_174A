install:
	npm init -y
	npm install --save three
	npm install --save-dev vite

run:
	npx vite

nix-install:
	nix-shell -p nodejs --run 'make install'

nix-run:
	nix-shell -p nodejs --run 'make run'

clean:
	rm -rf node_modules package-lock.json package.json Assignment2.zip

submission:
	7z a -tzip '-x!Assignment_2/node_modules*' '-x!Assignment_2/package-lock.json' Assignment2.zip ../Assignment_2
