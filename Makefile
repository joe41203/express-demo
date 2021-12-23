.PHONY: setup
setup:
	cp .env.template .env
	docker-compose build
	docker-compose run --rm app /bin/sh -c '/app/scripts/init.sh'
	docker-compose up
