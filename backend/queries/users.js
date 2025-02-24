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

const getRepliesQuery = `SELECT * FROM reply JOIN users ON reply.user_id = users.user_id WHERE comment_id = $1`

const getQuestionsQuery = `SELECT * FROM question`

const createRecordQuery = `INSERT INTO SurveyRecord (user_id, carbon_amount) VALUES ($1, $2)`

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
