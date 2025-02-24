const moderatorSignInQuery = `SELECT * FROM Moderator WHERE email = $1 AND password = $2`

const getTasksQuery = `SELECT * FROM Task WHERE task_id IN (SELECT task_id FROM Assign WHERE moderator_id = $1) AND task_status = 'assigned'`

const updateTaskStatusQuery = `UPDATE Task SET task_status = 'completed' WHERE task_id = $1`

const createArticleQuery = `INSERT INTO Article (title, subtitle, description, img_url, moderator_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`

const getAllArticlesQuery = `SELECT * FROM Article WHERE moderator_id = $1`

const getArticleByIdQuery = `SELECT
        a.article_id,
        a.title,
        a.subtitle,
        a.description,
        a.img_url,
        a.moderator_id,
        c.comment_id,
        c.content as comment_content,
        c.user_id as comment_user_id,
        u.fullname as user_name
       FROM article a
       LEFT JOIN comment c ON a.article_id = c.article_id
       LEFT JOIN users u ON c.user_id = u.user_id
       WHERE a.article_id = $1`

const updateArticleQuery = `UPDATE Article SET title = $1, subtitle = $2, description = $3, img_url = $4 WHERE article_id = $5`

const deleteArticleQuery = `DELETE FROM Article WHERE article_id = $1`

const deleteCommentQuery = `DELETE FROM Comment WHERE comment_id = $1`

const checkStatusQuery = `SELECT status FROM moderator WHERE moderator_id = $1`

const getModeratorProfileQuery = `SELECT * FROM Moderator WHERE moderator_id = $1`

const updateProfileQuery = `UPDATE Moderator SET name = $1, email = $2 WHERE moderator_id = $3 RETURNING *`

module.exports = {
  moderatorSignInQuery,
  getTasksQuery,
  updateTaskStatusQuery,
  createArticleQuery,
  getAllArticlesQuery,
  getArticleByIdQuery,
  updateArticleQuery,
  deleteArticleQuery,
  deleteCommentQuery,
  checkStatusQuery,
  updateProfileQuery,
  getModeratorProfileQuery,
}
