const adminSignInQuery = `SELECT * FROM Admin WHERE email = $1 AND password = $2`

const createTaskQuery = `INSERT INTO Task (task_title, task_desc, admin_id) VALUES ($1, $2, $3) RETURNING *`

const createModeratorQuery = `INSERT INTO Moderator (name, email, password) VALUES ($1, $2, $3)`

const createBadgeQuery = `INSERT INTO Badge (admin_id, badge_desc, badge_url) VALUES ($1, $2, $3) RETURNING *`

const getModeratorsQuery = `SELECT * FROM Moderator`

const getTasksQuery = `SELECT * FROM Task`

const getBadgesQuery = `SELECT * FROM Badge`

const getUsersQuery = `SELECT * FROM Users`

const updateTaskStatus = `UPDATE Task SET task_status = $1 WHERE task_id = $2`

const assignTaskQuery = `INSERT INTO Assign (task_id, moderator_id) VALUES ($1, $2)`

const checkBadgeQuery = `SELECT * FROM Reward WHERE badge_id = $1 AND user_id = $2`

const assignBadgeQuery = `INSERT INTO Reward (badge_id, user_id) VALUES ($1, $2)`

const updateUserStatusQuery = `UPDATE Users SET status = $1 WHERE user_id = $2 RETURNING *`

const updateModeratorStatusQuery = `UPDATE Moderator SET status = $1 WHERE moderator_id = $2 RETURNING *`

const deleteUserQuery = `DELETE FROM Users WHERE user_id = $1 RETURNING *`

const deleteModeratorQuery = `DELETE FROM Moderator WHERE moderator_id = $1 RETURNING *`
// CREATE TABLE Article (
//     article_id SERIAL PRIMARY KEY,
//     title VARCHAR(255) NOT NULL,
//     subtitle VARCHAR(255),
//     description TEXT NOT NULL,
//     img_url VARCHAR(255),
//     status VARCHAR(10) CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
//     moderator_id INT REFERENCES Moderator(moderator_id) ON DELETE CASCADE ON UPDATE CASCADE
// );

// CREATE TABLE Moderator (
//     moderator_id SERIAL PRIMARY KEY,
// 	name VARCHAR(255),
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     status VARCHAR(10) CHECK (status IN ('active', 'suspended')) DEFAULT 'active'
// 	admin_id INTEGER NOT NULL,
//     CONSTRAINT fk_moderator_admin FOREIGN KEY (admin_id)
//         REFERENCES admin(admin_id)
//         ON DELETE CASCADE
// );

// join with article table and moderator table to get moderator name
const getPendingArticlesQuery = `
SELECT *
FROM Article
JOIN Moderator
ON Article.moderator_id = Moderator.moderator_id
WHERE Article.status = 'pending'
`

const updateArticleStatusQuery = `UPDATE Article SET status = $1 WHERE article_id = $2`

const getQuestionsQuery = `SELECT * FROM Question`

const createQuestionQuery = `INSERT INTO Question (question_title, admin_id) VALUES ($1, $2) RETURNING *`

const createOptionQuery = `INSERT INTO Option (question_id, option_name, carbon_value) VALUES ($1, $2, $3) RETURNING *`

const deleteQuestionQuery = `DELETE FROM Question WHERE question_id = $1 RETURNING *`

const getOptionsQuery = `SELECT * FROM Option WHERE question_id = $1`

const updateQuestionQuery = `UPDATE Question SET question_title = $1 WHERE question_id = $2 RETURNING *`

const updateOptionQuery = `UPDATE Option SET option_name = $1, carbon_value = $2 WHERE option_id = $3 RETURNING *`

const InsertIntoQuestionUpdateQuery =
  'INSERT INTO question_edit (question_id, admin_id) VALUES ($1, $2)'

const InsertIntoModeratorUpdateQuery =
  'INSERT INTO moderator_update (moderator_id, admin_id) VALUES ($1, $2)'

const InsertIntoUserUpdateQuery =
  'INSERT INTO user_update (user_id, admin_id) VALUES ($1, $2)'

const articleSearchQuery = `SELECT * FROM article WHERE title ILIKE $1 AND status = $2`

const userSearchQuery = `SELECT * FROM users WHERE fullname ILIKE $1`

const moderatorSearchQuery = `SELECT * FROM moderator WHERE name ILIKE $1`

const searchPendingArticlesQuery = `SELECT * FROM article WHERE title ILIKE $1 AND status = $2`

module.exports = {
  adminSignInQuery,
  createTaskQuery,
  createModeratorQuery,
  createBadgeQuery,
  getModeratorsQuery,
  getTasksQuery,
  getBadgesQuery,
  getUsersQuery,
  updateTaskStatus,
  assignTaskQuery,
  checkBadgeQuery,
  assignBadgeQuery,
  updateUserStatusQuery,
  updateModeratorStatusQuery,
  deleteUserQuery,
  deleteModeratorQuery,
  getPendingArticlesQuery,
  updateArticleStatusQuery,
  getQuestionsQuery,
  createQuestionQuery,
  createOptionQuery,
  deleteQuestionQuery,
  getOptionsQuery,
  updateQuestionQuery,
  updateOptionQuery,
  InsertIntoQuestionUpdateQuery,
  InsertIntoModeratorUpdateQuery,
  InsertIntoUserUpdateQuery,
  articleSearchQuery,
  userSearchQuery,
  moderatorSearchQuery,
  searchPendingArticlesQuery,
}
