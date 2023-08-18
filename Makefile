deploy: build
	sudo rm -r /var/www/word2med.com/html/*
	sudo cp -r ./build/* /var/www/word2med.com/html/

build: src/*
	npm run build
