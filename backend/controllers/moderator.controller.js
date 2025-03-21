const { client } = require("../db/dbconnect.js");
const {
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
  articleSearchQuery,
} = require("../queries/moderator.js");

// Moderator sign in
const ModeratorSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const { rows } = await client.query(moderatorSignInQuery, [
      email,
      password,
    ]);
    console.log(rows[0]);
    // check if moderator is suspended
    if (rows.length > 0 && rows[0].status === "suspended") {
      res.status(403).send("Moderator is suspended");
    } else if (rows.length === 0) {
      res.status(401).send("Invalid email or password");
    } else {
      res.status(200).send(rows[0]);
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

// Get tasks assigned to a moderator
const getTasks = async (req, res) => {
  try {
    const { moderator_id } = req.body;
    console.log(req.body);

    if (!moderator_id) {
      return res.status(400).json({ error: "Moderator ID is required" });
    }

    const { rows: tasks } = await client.query(getTasksQuery, [moderator_id]);

    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create an article by a moderator
const createArticle = async (req, res) => {
  try {
    const { title, subtitle, description, img_url, moderator_id, task_id } =
      req.body;
    console.log(req.body);

    if (!title || !description || !moderator_id) {
      return res
        .status(400)
        .json({ error: "Title, description and moderator_id are required" });
    }

    // update task status to completed
    try {
      await client.query(updateTaskStatusQuery, [task_id]);
    } catch (err) {
      console.error("Error updating task status:", err);
    }

    // Insert the new article
    try {
      const { rows } = await client.query(createArticleQuery, [
        title,
        subtitle,
        description,
        img_url,
        moderator_id,
      ]);
      console.log(rows[0]);
      res.status(201).json(rows[0]);
    } catch (err) {
      console.error("Error creating article:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (err) {
    console.error("Error creating article:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all articles by a moderator
const getAllArticles = async (req, res) => {
  // check if query parameter is present

  const { moderator_id } = req.params;
  if (!req.query.search) {
    try {
      const { rows } = await client.query(getAllArticlesQuery, [moderator_id]);
      res.status(200).json(rows);
    } catch (err) {
      console.error("Error fetching articles:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    try {
      const { rows } = await client.query(articleSearchQuery, [
        `%${req.query.search}%`,
        "approved",
        moderator_id,
      ]);
      res.status(200).json(rows);
    } catch (err) {
      console.error("Error fetching articles:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Get an article by ID with comments and replies
const getArticleById = async (req, res) => {
  const { article_id } = req.params;
  try {
    // Get article and comments using a simple JOIN
    const { rows } = await client.query(getArticleByIdQuery, [article_id]);
    // console.log(rows)

    // If no article found
    if (rows.length === 0) {
      return res.status(404).json({ error: "Article not found" });
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
        .filter((row) => row.comment_id) // Remove null comments
        .map((row) => ({
          comment_id: row.comment_id,
          content: row.comment_content,
          user_id: row.comment_user_id,
          user_name: row.user_name,
        })),
    };

    res.status(200).json(article);
  } catch (err) {
    console.error("Error fetching article:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an article by ID by a moderator
const updateArticle = async (req, res) => {
  const { article_id } = req.params;
  const { title, subtitle, description, img_url, moderator_id } = req.body;
  try {
    const { rows } = await client.query(updateArticleQuery, [
      title,
      subtitle,
      description,
      img_url,
      article_id,
    ]);
    await client.query(
      "INSERT INTO article_update (article_id, moderator_id) VALUES ($1, $2)",
      [article_id, moderator_id]
    );
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Error updating article:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an article by ID by a moderator
const deleteArticle = async (req, res) => {
  const { article_id } = req.params;
  try {
    await client.query(deleteArticleQuery, [article_id]);
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (err) {
    console.error("Error deleting article:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a comment of user by ID by a moderator
const deleteComment = async (req, res) => {
  const { moderator_id, comment_id } = req.params;
  try {
    const { rows } = await client.query(
      "INSERT INTO comment_deletion (comment_id, moderator_id) VALUES ($1, $2) RETURNING *",
      [comment_id, moderator_id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }
    await client.query(deleteCommentQuery, [comment_id]);

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Check if moderator session is active or suspended
const checkSession = async (req, res) => {
  const { moderator_id } = req.params;
  try {
    const { rows } = await client.query(checkStatusQuery, [moderator_id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Moderator not found" });
    }
    if (rows[0].status === "suspended") {
      return res.status(200).json({ status: "suspended" });
    }
    res.status(200).json({ status: "active" });
  } catch (err) {
    console.error("Error checking session:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update moderator profile
const updateProfile = async (req, res) => {
  const { moderator_id } = req.params;
  const { name, email } = req.body;
  try {
    const { rows } = await client.query(updateProfileQuery, [
      name,
      email,
      moderator_id,
    ]);
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get moderator profile
const getProfile = async (req, res) => {
  const { moderator_id } = req.params;
  try {
    const { rows } = await client.query(getModeratorProfileQuery, [
      moderator_id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Moderator not found" });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  ModeratorSignIn,
  getTasks,
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  deleteComment,
  checkSession,
  updateProfile,
  getProfile,
};
