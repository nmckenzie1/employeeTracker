DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_ind (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
  );


INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, department_id)
VALUES
    ('Sales Lead', 1),
    ('Salesperson', 1),
    ('Lead Engineer', 2),
    ('Software Engineer', 2),
    ('Account Manager', 3),
    ('Accountant', 3),
    ('Legal Team Lead', 4),
    ('Lawyer', 4);

INSERT INTO employee
    (first_name, last_name, role_id)
VALUES
    ('John', 'Doe', 1),
    ('Mike', 'Chan', 2),
    ('Ashley', 'Rodriguez', 3),
    ('Kevin', 'Tupik', 4),
    ('Kunal', 'Singh', 5),
    ('Malia', 'Brown', 6),
    ('Sarah', 'Lourd', 7),
    ('Tom', 'Allen', 8);

