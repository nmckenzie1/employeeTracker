DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;

CREATE TABLE job (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  job_id INT UNSIGNED NOT NULL,
  INDEX job_ind (job_id),
  CONSTRAINT fk_department FOREIGN KEY (job_id) REFERENCES job(id) ON DELETE CASCADE
);

CREATE TABLE sprite (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
  );


INSERT INTO job
    (name)
VALUES
    ('Damage'),
    ('Healing'),
    ('Tank'),
    ('Summoner')
    ;
    

INSERT INTO role
    (title, job_id)
VALUES
    ('Fighter', 1),
    ('Berserker', 1),
    ('Cleric', 2),
    ('White Mage', 2),
    ('Paladin', 3),
    ('Warrior', 3),
    ('Necromancer', 4),
    ('Warlock', 4);

INSERT INTO sprite
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
