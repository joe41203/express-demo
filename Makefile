.PHONY: setup
setup:
	@cp .env.template .env
	@docker-compose build --no-cache
	@docker-compose run app npx prisma migrate dev --name init
	@docker-compose up
