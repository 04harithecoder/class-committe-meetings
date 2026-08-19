-- Run this in MySQL Workbench (or `mysql -u root -p < auth_tables.sql`)
-- Creates the database and the two tables needed to test login.
-- The remaining 6 tables (subjects, meetings, responses, etc.) will be
-- added in a later step.
/*
CREATE DATABASE IF NOT EXISTS ccm_portal;
USE ccm_portal;

CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    roll_number VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    password_hash VARCHAR(255) NOT NULL,
    semester VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/
-- Run this AFTER auth_tables.sql (admins + members already created).
-- Adds: teachers table, gender column on members, and subjects table.

USE ccm_portal;

-- Members need a gender so a teacher can pick 1 male + 1 female per subject
ALTER TABLE members
  ADD COLUMN gender ENUM('male', 'female') NOT NULL DEFAULT 'male';

CREATE TABLE IF NOT EXISTS teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subjects are created by a teacher, who links exactly 1 male + 1 female
-- CCM member at creation time. No separate junction table needed since
-- each subject always has exactly these two fixed slots.
CREATE TABLE IF NOT EXISTS subjects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(150) NOT NULL,
    subject_code VARCHAR(20),
    has_lab BOOLEAN DEFAULT FALSE,
    teacher_id INT NOT NULL,
    male_member_id INT NOT NULL,
    female_member_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
    FOREIGN KEY (male_member_id) REFERENCES members(id) ON DELETE CASCADE,
    FOREIGN KEY (female_member_id) REFERENCES members(id) ON DELETE CASCADE,
    CONSTRAINT unique_male_per_subject UNIQUE (male_member_id, subject_name),
    CONSTRAINT unique_female_per_subject UNIQUE (female_member_id, subject_name)
);
SET SQL_SAFE_UPDATES = 0;
DELETE FROM admins;
DELETE FROM meadminsmbers;