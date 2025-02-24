const adminSignInQuery = `SELECT * FROM Admin WHERE email = $1 AND password = $2`

const createTaskQuery = `INSERT INTO Task (task_title, task_desc, admin_id) VALUES ($1, $2, $3) RETURNING *`

const createModeratorQuery = `INSERT INTO Moderator (name, email, password) VALUES ($1, $2, $3) RETURNING *`

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

const getPendingArticlesQuery = `SELECT * FROM Article WHERE status = $1`

const updateArticleStatusQuery = `UPDATE Article SET status = $1 WHERE article_id = $2 RETURNING *`

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
}
