STEPS TO DEPLOY:

--- TERMINAL 1:

- npm install --force
- npm start

--- TERMINAL 2:

- docker run --rm -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=public -p 5432:5432 -v $(pwd)/scripts/db-script.sql:/docker-entrypoint-initdb.d/script.sql postgres:14.3

--- TERMINAL 3:

- cd morpheus-challenge
- npm install 
- npm start