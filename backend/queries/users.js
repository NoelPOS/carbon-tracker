const userSignUpQuery =
  'INSERT INTO users (fullname, email, password, address, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING *'

const userSignInQuery = 'SELECT * FROM users WHERE email = $1 AND password = $2'

const userUpdateQuery = `
  UPDATE users 
  SET fullname = $1, 
      email = $2, 
      password = $3, 
      phone_number = $4, 
      address = $5 
      WHERE user_id = $6 
      RETURNING *`

const articleSearchQuery = `SELECT * FROM article WHERE title ILIKE $1 AND status = $2`

const getArticlesQuery = `SELECT * FROM article WHERE status = $1`

const getArticleByIdQuery = `SELECT * FROM article WHERE article_id = $1`

const createCommentQuery = `INSERT INTO comment (content, article_id, user_id) VALUES ($1, $2, $3) RETURNING *`

const getCommentsQuery = `SELECT * FROM comment JOIN users ON comment.user_id = users.user_id WHERE article_id = $1`

const createReplyQuery = `INSERT INTO reply (content, comment_id, user_id) VALUES ($1, $2, $3) RETURNING *`

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

// CREATE TABLE Comment (
//     comment_id SERIAL PRIMARY KEY,
//     content TEXT NOT NULL,
//     user_id INT REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     article_id INT REFERENCES Article(article_id) ON DELETE CASCADE ON UPDATE CASCADE
// );

// CREATE TABLE Reply (
//     reply_id SERIAL PRIMARY KEY,
//     content TEXT NOT NULL,
//     user_id INT REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     comment_id INT REFERENCES Comment(comment_id) ON DELETE CASCADE ON UPDATE CASCADE
// );

// get the replies for a comment along with the user who replied so we need to join the reply table with the users table

// SELECT * FROM reply JOIN users ON reply.user_id = users.user_id WHERE comment_id = $1
// `SELECT * FROM reply WHERE comment_id = $1`
const getRepliesQuery = `SELECT * FROM reply JOIN users ON reply.user_id = users.user_id WHERE comment_id = $1`

const getQuestionsQuery = `SELECT * FROM question`

const createRecordQuery = `INSERT INTO SurveyRecord (user_id, carbon_amount) VALUES ($1, $2) RETURNING *`

const getRecordsQuery = `SELECT * FROM SurveyRecord WHERE user_id = $1`

const userStreakUpdateQuery = `UPDATE users SET last_survey = $1, streak_day = $2 WHERE user_id = $3 RETURNING *`

const getLeaderboardByNameQuery = `SELECT fullname, AVG(carbon_amount) as avg, streak_day as streak 
FROM users JOIN SurveyRecord ON users.user_id = SurveyRecord.user_id 
GROUP BY fullname, streak_day 
ORDER BY fullname ASC`

const getLeaderboardByCarbonQuery = `SELECT fullname, AVG(carbon_amount) as avg, streak_day as streak 
FROM users JOIN SurveyRecord ON users.user_id = SurveyRecord.user_id 
GROUP BY fullname, streak_day 
ORDER BY avg DESC`

const getLeaderboardByStreakQuery = `SELECT fullname, AVG(carbon_amount) as avg, streak_day as streak FROM users JOIN SurveyRecord ON users.user_id = SurveyRecord.user_id GROUP BY fullname, streak_day ORDER BY streak DESC`

const getBadgeQuery = `SELECT badge_url, badge_desc FROM Badge JOIN Reward ON Badge.badge_id = Reward.badge_id WHERE user_id = $1`

const getProfileQuery = `SELECT * FROM users WHERE user_id = $1`

const checkStatusQuery = `SELECT status FROM users WHERE user_id = $1`

const userResetStreakQuery = `UPDATE users SET streak_day = 0 WHERE user_id = $1 RETURNING *`

module.exports = {
  userSignInQuery,
  userSignUpQuery,
  userUpdateQuery,
  articleSearchQuery,
  getArticlesQuery,
  getArticleByIdQuery,
  createCommentQuery,
  getCommentsQuery,
  createReplyQuery,
  getRepliesQuery,
  getQuestionsQuery,
  createRecordQuery,
  getRecordsQuery,
  userStreakUpdateQuery,
  getLeaderboardByNameQuery,
  getLeaderboardByCarbonQuery,
  getLeaderboardByStreakQuery,
  getBadgeQuery,
  getProfileQuery,
  checkStatusQuery,
  userResetStreakQuery,
}
