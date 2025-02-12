const { client } = require('../db/dbconnect.js')

const ModeratorSignIn = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log(email, password)
    const { rows } = await client.query(
      `SELECT * FROM moderator WHERE email = $1 AND password = $2`,
      [email, password]
    )
    if (rows.length === 0) {
      res.status(401).send('Invalid email or password')
    } else {
      res.status(200).send(rows[0])
    }
  } catch (err) {
    res.status(500).send('Internal Server Error')
  }
}
const getTasks = async (req, res) => {
  try {
    const { moderator_id } = req.body
    console.log(req.body)

    if (!moderator_id) {
      return res.status(400).json({ error: 'Moderator ID is required' })
    }

    // Get all assigned task IDs for this moderator
    const { rows: assignedTasks } = await client.query(
      `SELECT task_id FROM assign WHERE moderator_id = $1 AND task_status = 'assigned'`,
      [moderator_id]
    )

    if (assignedTasks.length === 0) {
      return res.status(200).json([]) // No tasks assigned
    }

    // Extract all task_ids
    const taskIds = assignedTasks.map((row) => row.task_id)

    // Fetch all task details in one query
    const { rows: tasks } = await client.query(
      `SELECT * FROM task WHERE task_id = ANY($1)`,
      [taskIds]
    )

    res.status(200).json(tasks)
  } catch (err) {
    console.error('Error fetching tasks:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const createArticle = async (req, res) => {
  try {
    const { title, subtitle, description, img_url, moderator_id, task_id } =
      req.body
    console.log(req.body)

    if (!title || !description || !moderator_id) {
      return res
        .status(400)
        .json({ error: 'Title, description and moderator_id are required' })
    }

    // update task status to completed
    try {
      await client.query(
        `UPDATE task SET task_status = 'completed' WHERE task_id = $1`,
        [task_id]
      )
    } catch (err) {
      console.error('Error updating task status:', err)
    }

    // Insert the new article
    try {
      const { rows } = await client.query(
        `INSERT INTO article (title, subtitle, description, img_url, moderator_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [title, subtitle, description, img_url, moderator_id]
      )
      console.log(rows[0])
      res.status(201).json(rows[0])
    } catch (err) {
      console.error('Error creating article:', err)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } catch (err) {
    console.error('Error creating article:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getAllArticles = async (req, res) => {
  const { moderator_id } = req.params
  try {
    const { rows } = await client.query(
      `SELECT * FROM article WHERE moderator_id = $1`,
      [moderator_id]
    )
    res.status(200).json(rows)
  } catch (err) {
    console.error('Error fetching articles:', err)
    res.status(500).json({ error: 'Internal Server Error' })
    }
}

const getArticleById = async (req, res) => {
  const { article_id } = req.params;
  try {
    // Get article and comments using a simple JOIN
    const { rows } = await client.query(
      `SELECT 
        a.article_id,
        a.title,
        a.subtitle,
        a.description,
        a.img_url,
        a.moderator_id,
        c.comment_id,
        c.content as comment_content,
        c.user_id as comment_user_id
       FROM article a
       LEFT JOIN comment c ON a.article_id = c.article_id
       WHERE a.article_id = $1`,
      [article_id]
    );

    // If no article found
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Format the response
    const article = {
      article_id: rows[0].article_id,
      title: rows[0].title,
      subtitle: rows[0].subtitle,
      description: rows[0].description,
      img_url: rows[0].img_url,
      moderator_id: rows[0].moderator_id,
      comments: rows
        .filter(row => row.comment_id) // Remove null comments
        .map(row => ({
          comment_id: row.comment_id,
          content: row.comment_content,
          user_id: row.comment_user_id
        }))
    };

    res.status(200).json(article);
  } catch (err) {
    console.error('Error fetching article:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const updateArticle = async (req, res) => {
  const { article_id } = req.params;
  const { title, subtitle, description, img_url } = req.body;
  try {
    const { rows } = await client.query(  
      `UPDATE article SET title = $1, subtitle = $2, description = $3, img_url = $4 WHERE article_id = $5`,   
      [title, subtitle, description, img_url, article_id]
    );
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Error updating article:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const deleteArticle = async (req, res) => {
  const { article_id } = req.params;
  try {
    await client.query(
      `DELETE FROM article WHERE article_id = $1`,
      [article_id]
    );
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (err) {
    console.error('Error deleting article:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  }

const deleteComment = async (req, res) => {
  const { comment_id } = req.params;
  try {
    await client.query(
      `DELETE FROM comment WHERE comment_id = $1`,
      [comment_id]
    );
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.error('Error deleting comment:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}





module.exports = {
  ModeratorSignIn,
  getTasks,
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  deleteComment,
}     
