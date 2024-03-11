DROP DATABASE IF EXISTS HealthDiary;
CREATE DATABASE HealthDiary;
USE HealthDiary;

-- Create a table for users
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_level VARCHAR(10) NOT NULL DEFAULT 'regular'
);

-- Create a table for diary entries
CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    mood VARCHAR(50),
    weight DECIMAL(5,2),
    sleep_hours INT,
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- INSERT User sample data
-- Iserting multiple user rows at once
INSERT INTO Users (username, password, email, user_level) VALUES
  ('johndoe', 'temp-pw-1', 'johndoe@example.com', 'regular'),
  ('janedoe', 'temp-pw-2', 'janedoe@example.com', 'admin'),
  ('mike_smith', 'temp-pw-3', 'mike@example.com', 'moderator');


-- Inserting multiple diary entries
INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
  (1, '2024-01-10', 'Happy', 70.5, 8, 'Had a great day, felt energetic', '2024-01-10 20:00:00'),
  (1, '2024-01-11', 'Tired', 70.2, 6, 'Long day at work, need rest', '2024-01-11 20:00:00'),
  (2, '2024-01-10', 'Stressed', 65.0, 7, 'Busy day, a bit stressed out', '2023-12-10 21:00:00');

-- Example queries
SELECT Users.username, DiaryEntries.entry_date, DiaryEntries.mood, DiaryEntries.notes
  FROM Users, DiaryEntries
  WHERE DiaryEntries.user_id = Users.user_id;

-- Same with JOIN
SELECT Users.username, DiaryEntries.entry_date, DiaryEntries.mood, DiaryEntries.notes
  FROM Users JOIN DiaryEntries ON DiaryEntries.user_id = Users.user_id;

-- Entries for specific username
SELECT entry_date, mood, sleep_hours FROM DiaryEntries
  JOIN Users ON DiaryEntries.user_id = Users.user_id
  WHERE username = 'johndoe';

-- Table for HRV measurements
CREATE TABLE HRVMeasurements (
    hrv_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    measurement_date DATE NOT NULL,
    time_of_day TIME NOT NULL,
    hrv_value DECIMAL(7,2) NOT NULL,
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

--Insert data into HRVMeasurements
INSERT INTO HRVMeasurements (user_id, measurement_date, time_of_day, hrv_value, notes, created_at) VALUES
  (1, '2024-01-10', '08:00:00', 65.3, 'Measured upon waking up', '2024-01-10 08:00:00'),
  (2, '2024-01-10', '12:00:00', 68.7, 'Measured after morning workout', '2024-01-10 12:00:00'),
  (3, '2024-01-10', '07:30:00', 59.8, 'Measured before breakfast', '2024-01-10 07:30:00');

--Table for exercise entries
CREATE TABLE ExerciseEntries (
    exercise_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    exercise_date DATE NOT NULL,
    exercise_type VARCHAR(50),
    duration_minutes INT,
    intensity_level VARCHAR(50),
    calories_burned DECIMAL(7,2),
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Insert data into ExerciseEntries
INSERT INTO ExerciseEntries (user_id, exercise_date, exercise_type, duration_minutes, intensity_level, calories_burned, notes, created_at) VALUES
  (1, '2024-01-10', 'Running', 30, 'Moderate', 250.5, 'Nice morning run', '2024-01-10 08:00:00'),
  (1, '2024-01-11', 'Yoga', 60, 'Low', 150.2, 'Relaxing session', '2024-01-11 18:00:00'),
  (2, '2024-01-10', 'Cycling', 45, 'High', 350.0, 'Great workout outdoors', '2024-01-10 10:00:00');

