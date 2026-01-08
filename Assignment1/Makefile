run:
	npm init -y
	npm install --save three
	npm install --save-dev vite
	npx vite

nix-run:
	nix-shell -p nodejs --run 'make run'

clean:
	rm -rf node_modules package-lock.json package.json

