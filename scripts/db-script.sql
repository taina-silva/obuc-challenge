DROP SCHEMA if exists morpheus cascade;
CREATE SCHEMA morpheus;

ALTER SCHEMA morpheus OWNER TO postgres;
SET default_tablespace = '';
SET search_path = morpheus;

DROP TABLE if exists users cascade;
DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS users_id_seq;
CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE users (
    "id" bigint DEFAULT NEXTVAL('users_id_seq') NOT NULL,
    "email" text NOT NULL,
    "username" text NOT NULL,
    "password" text NOT NULL,
    "full_name" text NOT NULL,
    "created_at" timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "users_email_key" UNIQUE ("email"),
    CONSTRAINT "username" UNIQUE ("username"),
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

ALTER TABLE users OWNER TO postgres;

insert into users (email, username, password, full_name)
        values ('taina@gmail.com', 'tainass', '123123', 'Tainá Silva');
insert into users (email, username, password, full_name)
        values ('morpheus@gmail.com', 'morpheus', '123123', 'morpheus');     

select * from users;
