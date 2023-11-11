CREATE SCHEMA proj2;

-- DROP TABLE proj2.users_unsafe;
CREATE TABLE proj2.users_unsafe(
    id serial primary key,
    username varchar,
    password varchar,
    first_name varchar,
    last_name varchar,
    dob date
);

-- DROP TABLE proj2.users_safe;
CREATE TABLE proj2.users_safe(
    id serial primary key,
    username varchar,
    password_hash varchar,
    password_salt varchar,
    first_name varchar,
    last_name varchar,
    dob date
);