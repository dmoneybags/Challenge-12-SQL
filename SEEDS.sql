-- Insert seed data into Deparment table
INSERT INTO Department (name) VALUES ('Engineering');
INSERT INTO Department (name) VALUES ('Human Resources');
INSERT INTO Department (name) VALUES ('Marketing');
INSERT INTO Department (name) VALUES ('Sales');

-- Insert seed data into Role table
INSERT INTO Role (title, salary, department_id) VALUES ('Software Engineer', 70000, 1);
INSERT INTO Role (title, salary, department_id) VALUES ('HR Manager', 60000, 2);
INSERT INTO Role (title, salary, department_id) VALUES ('Marketing Specialist', 55000, 3);
INSERT INTO Role (title, salary, department_id) VALUES ('Sales Representative', 50000, 4);

-- Insert seed data into Employee table
INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Smith', 2, NULL);
INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ('Emily', 'Jones', 3, NULL);
INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ('Michael', 'Brown', 4, NULL);
INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ('Sarah', 'Davis', 1, 1);
INSERT INTO Employee (first_name, last_name, role_id, manager_id) VALUES ('Chris', 'Wilson', 1, 1);