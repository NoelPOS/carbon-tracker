const moderatorSignInQuery = `SELECT * FROM Moderator WHERE email = $1 AND password = $2`

const getTasksQuery = `SELECT * FROM Task WHERE task_id IN (SELECT task_id FROM Assign WHERE moderator_id = $1) AND task_status = 'assigned'`

const updateTaskStatusQuery = `UPDATE Task SET task_status = 'completed' WHERE task_id = $1`

const createArticleQuery = `INSERT INTO Article (title, subtitle, description, img_url, moderator_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`

const getAllArticlesQuery = `SELECT * FROM Article WHERE moderator_id = $1`

// CREATE TABLE Comment (
//     comment_id SERIAL PRIMARY KEY,
//     content TEXT NOT NULL,
//     user_id INT REFERENCES Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
//     article_id INT REFERENCES Article(article_id) ON DELETE CASCADE ON UPDATE CASCADE
// );

// CREATE TABLE Article (
//     article_id SERIAL PRIMARY KEY,
//     title VARCHAR(255) NOT NULL,
//     subtitle VARCHAR(255),
//     description TEXT NOT NULL,
//     img_url VARCHAR(255),
//     status VARCHAR(10) CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
//     moderator_id INT REFERENCES Moderator(moderator_id) ON DELETE CASCADE ON UPDATE CASCADE
// );

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
// modify getArticleByIdQuery by joining three tables instead of two so that we can get name of the user who posted the comment

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

// const getArticleByIdQuery = `SELECT
//         a.article_id,
//         a.title,
//         a.subtitle,
//         a.description,
//         a.img_url,
//         a.moderator_id,
//         c.comment_id,
//         c.content as comment_content,
//         c.user_id as comment_user_id
//        FROM article a
//        LEFT JOIN comment c ON a.article_id = c.article_id
//        WHERE a.article_id = $1`

const updateArticleQuery = `UPDATE Article SET title = $1, subtitle = $2, description = $3, img_url = $4 WHERE article_id = $5 RETURNING *`

const deleteArticleQuery = `DELETE FROM Article WHERE article_id = $1`

const deleteCommentQuery = `DELETE FROM Comment WHERE comment_id = $1`

const checkStatusQuery = `SELECT status FROM moderator WHERE moderator_id = $1`

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
}
