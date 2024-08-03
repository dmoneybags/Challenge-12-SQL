DROP DATABASE IF EXISTS ERD;
CREATE DATABASE ERD;
DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS Role;
DROP TABLE IF EXISTS Department;

CREATE TABLE Department (
    id SERIAL, 
    name VARCHAR(30) UNIQUE NOT NULL,
    CONSTRAINT Department_PK PRIMARY KEY (id)
);
CREATE TABLE Role (
    id SERIAL,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    CONSTRAINT Role_PK PRIMARY KEY (id),
    CONSTRAINT Role_FK FOREIGN KEY (department_id) REFERENCES Department(id)
);
CREATE TABLE Employee (
    id SERIAL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    CONSTRAINT Employee_PK PRIMARY KEY (id),
    CONSTRAINT Employee_FK1 FOREIGN KEY (role_id) REFERENCES Role(id),
    CONSTRAINT Employee_FK2 FOREIGN KEY (manager_id) REFERENCES Employee(id)
);