const { client } = require("../db/dbconnect.js");

const {
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
} = require("../queries/users.js");

// User sign in
const userSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await client.query(userSignInQuery, [email, password]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    } else if (user.rows[0].status === "suspended") {
      console.log("This is going to be a 403");
      return res.status(403).json({ message: "User is suspended" });
    } else {
      res.status(200).json(user.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// User sign up
const userSignUp = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;

    if (!name || !email || !password || !address || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    result = await client.query(userSignUpQuery, [
      name,
      email,
      password,
      address,
      phone,
    ]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error in userSignUp:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// User update profile
const userUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, email, password, phone_number, address } = req.body;

    const result = await client.query(userUpdateQuery, [
      fullname,
      email,
      password,
      phone_number,
      address,
      id,
    ]);

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error in userUpdate:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all articles for user that are approved by admin
const getArticles = async (req, res) => {
  const { search } = req.query;
  if (search) {
    try {
      const { rows: articles } = await client.query(articleSearchQuery, [
        `%${search}%`,
        "approved",
      ]);

      res.status(200).json(articles);
    } catch (err) {
      console.error("Error fetching articles:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    try {
      const { rows: articles } = await client.query(getArticlesQuery, [
        "approved",
      ]);

      res.status(200).json(articles);
    } catch (err) {
      console.error("Error fetching articles:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Get article by id
const getArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows: articles } = await client.query(getArticleByIdQuery, [id]);

    if (articles.length === 0) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.status(200).json(articles[0]);
  } catch (err) {
    console.error("Error fetching article:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Comment on an article
const commentArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, content } = req.body;

    const { rows: comments } = await client.query(createCommentQuery, [
      content,
      id,
      user_id,
    ]);

    res.status(201).json(comments[0]);
  } catch (err) {
    console.error("Error commenting article:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get comments for an article
const getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows: comments } = await client.query(getCommentsQuery, [id]);

    res.status(200).json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Reply to a comment
const replyComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { user_id, content } = req.body;

    const { rows: replies } = await client.query(createReplyQuery, [
      content,
      commentId,
      user_id,
    ]);

    res.status(201).json(replies[0]);
  } catch (err) {
    console.error("Error replying to comment:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get replies for a comment
const getReplies = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { rows: replies } = await client.query(getRepliesQuery, [commentId]);
    res.status(200).json(replies);
  } catch (err) {
    console.error("Error fetching replies:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all questions for survey
const getQuestions = async (req, res) => {
  try {
    const { rows: questions } = await client.query(getQuestionsQuery);
    res.status(200).json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Save survey record for user
const saveRecord = async (req, res) => {
  try {
    const { user_id, carbon_amount } = req.body;
    const { rows: records } = await client.query(createRecordQuery, [
      user_id,
      carbon_amount,
    ]);
    res.status(201).json(records[0]);
  } catch (err) {
    console.error("Error saving record:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all records for user
const getRecords = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { rows: records } = await client.query(getRecordsQuery, [user_id]);
    res.status(200).json(records);
  } catch (err) {
    console.error("Error fetching records:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update user streak and last survey date
const userStreakUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { last_survey, streak } = req.body;
    const { rows: users } = await client.query(userStreakUpdateQuery, [
      last_survey,
      streak,
      id,
    ]);
    res.status(200).json(users[0]);
  } catch (err) {
    console.error("Error updating streak:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get leaderboard by name
const getLeaderboardByName = async (req, res) => {
  try {
    const { rows: users } = await client.query(getLeaderboardByNameQuery);
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get leaderboard by average carbon amount
const getLeaderboardByAvgCarbon = async (req, res) => {
  try {
    const { rows: users } = await client.query(getLeaderboardByCarbonQuery);
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get leaderboard by streak
const getLeaderboardByStreak = async (req, res) => {
  try {
    const { rows: users } = await client.query(getLeaderboardByStreakQuery);
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get badges for user
const getBadge = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { rows: badges } = await client.query(getBadgeQuery, [user_id]);
    res.status(200).json(badges);
  } catch (err) {
    console.error("Error fetching badges:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("User ID:", id);
    const { rows: users } = await client.query(getProfileQuery, [id]);
    res.status(200).json(users[0]);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Check if user session is active or suspended
const checkSession = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { rows: users } = await client.query(checkStatusQuery, [user_id]);
    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    if (users[0].status === "suspended") {
      return res.status(200).json({ status: "suspended" });
    }

    res.status(200).json({ status: "active" });
  } catch (err) {
    console.error("Error checking session:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update user daily streak
const userDailyStreakUpdate = async (req, res) => {
  try {
    const { user_id } = req.body;

    await client.query(userResetStreakQuery, [user_id]);
  } catch (err) {
    console.error("Error updating daily streak:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  userSignIn,
  userSignUp,
  userUpdate,
  getArticles,
  getArticle,
  commentArticle,
  getComments,
  replyComment,
  getReplies,
  getQuestions,
  saveRecord,
  getRecords,
  userStreakUpdate,
  getLeaderboardByName,
  getLeaderboardByAvgCarbon,
  getLeaderboardByStreak,
  getBadge,
  getProfile,
  checkSession,
  userDailyStreakUpdate,
};
