// -- Admin Table (Only one admin exists)
// CREATE TABLE Admin (
//     admin_id SERIAL PRIMARY KEY,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL
// );

// -- Moderator Table
// CREATE TABLE Moderator (
//     moderator_id SERIAL PRIMARY KEY,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     status VARCHAR(10) CHECK (status IN ('active', 'suspended')) DEFAULT 'active'
// );

// -- Users Table
// CREATE TABLE Users (
//     user_id SERIAL PRIMARY KEY,
//     fullname VARCHAR(255) NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     address VARCHAR(255),
//     phone_number VARCHAR(20),
//     status VARCHAR(10) CHECK (status IN ('active', 'suspended')) DEFAULT 'active',
//     streak_day INT DEFAULT 0,
//     last_survey DATE
// );

// -- Question Table
// CREATE TABLE Question (
//     question_id SERIAL PRIMARY KEY,
//     question_title TEXT NOT NULL,
//     admin_id INT REFERENCES Admin(admin_id) ON DELETE CASCADE ON UPDATE CASCADE
// );

// -- Option Table
// CREATE TABLE Option (
//     option_id SERIAL PRIMARY KEY,
//     question_id INT REFERENCES Question(question_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     option_name VARCHAR(255) NOT NULL,
//     carbon_value DECIMAL(10,2) NOT NULL
// );

// -- Task Table
// CREATE TABLE Task (
//     task_id SERIAL PRIMARY KEY,
//     task_title VARCHAR(255) NOT NULL,
//     task_desc TEXT,
//     admin_id INT REFERENCES Admin(admin_id) ON DELETE CASCADE ON UPDATE CASCADE
// );

// -- Assign Table (Links Tasks to Moderators)
// CREATE TABLE Assign (
//     task_id INT REFERENCES Task(task_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     moderator_id INT REFERENCES Moderator(moderator_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     PRIMARY KEY (task_id, moderator_id)
// );

// -- Article Table
// CREATE TABLE Article (
//     article_id SERIAL PRIMARY KEY,
//     title VARCHAR(255) NOT NULL,
//     subtitle VARCHAR(255),
//     description TEXT NOT NULL,
//     img_url VARCHAR(255),
//     status VARCHAR(10) CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
//     moderator_id INT REFERENCES Moderator(moderator_id) ON DELETE CASCADE ON UPDATE CASCADE
// );

// -- Review Table (Admin Reviews Articles)
// CREATE TABLE Review (
//     review_id SERIAL PRIMARY KEY,
//     admin_id INT REFERENCES Admin(admin_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     article_id INT REFERENCES Article(article_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     decision VARCHAR(10) CHECK (decision IN ('accepted', 'rejected')) NOT NULL,
//     review_date DATE DEFAULT CURRENT_DATE
// );

// -- Comment Table
// CREATE TABLE Comment (
//     comment_id SERIAL PRIMARY KEY,
//     content TEXT NOT NULL,
//     user_id INT REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     article_id INT REFERENCES Article(article_id) ON DELETE CASCADE ON UPDATE CASCADE
// );

// -- Reply Table
// CREATE TABLE Reply (
//     reply_id SERIAL PRIMARY KEY,
//     content TEXT NOT NULL,
//     user_id INT REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     comment_id INT REFERENCES Comment(comment_id) ON DELETE CASCADE ON UPDATE CASCADE
// );

// -- Badge Table
// CREATE TABLE Badge (
//     badge_id SERIAL PRIMARY KEY,
//     badgeimg_url VARCHAR(255),
//     badge_desc TEXT,
//     admin_id INT REFERENCES Admin(admin_id) ON DELETE CASCADE ON UPDATE CASCADE
// );

// -- Reward Table (Links Badges to Users)
// CREATE TABLE Reward (
//     badge_id INT REFERENCES Badge(badge_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     user_id INT REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     PRIMARY KEY (badge_id, user_id)
// );

// -- SurveyRecord Table
// CREATE TABLE SurveyRecord (
//     record_id SERIAL PRIMARY KEY,
//     survey_date DATE DEFAULT CURRENT_DATE,
//     carbon_amount DECIMAL(10,2) NOT NULL,
//     user_id INT REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
// );


const adminSignInQuery = `SELECT * FROM Admin WHERE email = $1 AND password = $2`;


module.exports = { adminSignInQuery }