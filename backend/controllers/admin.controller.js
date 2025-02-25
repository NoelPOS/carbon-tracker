const { client } = require("../db/dbconnect.js");

const {
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
  searchPendingArticlesQuery,
  userSearchQuery,
  moderatorSearchQuery,
} = require("../queries/admin.js");

// Admin sign in
const adminSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await client.query(adminSignInQuery, [email, password]);

    if (admin.rows.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(admin.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a task by an admin
const createTask = async (req, res) => {
  try {
    const { title, instruction, admin_id } = req.body;
    const newTask = await client.query(createTaskQuery, [
      title,
      instruction,
      admin_id,
    ]);

    res.status(201).json(newTask.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a moderator by an admin
const createModerator = async (req, res) => {
  try {
    const { admin_id, name, email, password } = req.body;
    console.log(req.body);
    const newModerator = await client.query(createModeratorQuery, [
      name,
      email,
      password,
      admin_id,
    ]);

    res.status(201).json(newModerator.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a badge by an admin
const createBadge = async (req, res) => {
  try {
    const { admin_id, name, image } = req.body;
    console.log(req.body);

    const newBadge = await client.query(createBadgeQuery, [
      admin_id,
      name,
      image,
    ]);
    res.status(201).json(newBadge.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all moderators
const getModerators = async (req, res) => {
  const { search } = req.query;
  if (search) {
    try {
      const moderators = await client.query(moderatorSearchQuery, [
        `%${search}%`,
      ]);
      res.status(200).json(moderators.rows);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    try {
      const moderators = await client.query(getModeratorsQuery);
      res.status(200).json(moderators.rows);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await client.query(getTasksQuery);
    res.status(200).json(tasks.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all badges
const getBadges = async (req, res) => {
  try {
    const badges = await client.query(getBadgesQuery);
    res.status(200).json(badges.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all users or search for a user
const getUsers = async (req, res) => {
  const { search } = req.query;
  if (search) {
    try {
      const users = await client.query(userSearchQuery, [`%${search}%`]);
      res.status(200).json(users.rows);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    try {
      const users = await client.query(getUsersQuery);
      res.status(200).json(users.rows);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

// Assign a task to a moderator
const assignTask = async (req, res) => {
  try {
    const { task_id, moderator_id } = req.body;
    // update task status and insert task id and mod id into assign table

    await client.query(updateTaskStatus, ["assigned", task_id]);

    await client.query(assignTaskQuery, [task_id, moderator_id]);

    res.status(200).json({ message: "Task assigned successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Assign a badge to a user
const assignBadge = async (req, res) => {
  try {
    const { badge_id, user_id } = req.body;

    // check if badge already assigned to user
    const check = await client.query(checkBadgeQuery, [badge_id, user_id]);
    if (check.rows.length > 0) {
      return res
        .status(201)
        .json({ message: "Badge already assigned to user" });
    }

    // insert badge id and user id into reward table
    await client.query(assignBadgeQuery, [badge_id, user_id]);

    res.status(200).json({ message: "Badge assigned successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user status by an admin
const updateUser = async (req, res) => {
  try {
    const { user_id, status, admin_id } = req.body;
    await client.query(updateUserStatusQuery, [status, user_id]);
    await client.query(InsertIntoUserUpdateQuery, [user_id, admin_id]);
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update moderator status by an admin
const updateModerator = async (req, res) => {
  try {
    const { moderator_id, status, admin_id } = req.body;
    await client.query(updateModeratorStatusQuery, [status, moderator_id]);
    await client.query(InsertIntoModeratorUpdateQuery, [
      moderator_id,
      admin_id,
    ]);
    res.status(200).json({ message: "Moderator updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a user by an admin
const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    await client.query(deleteUserQuery, [user_id]);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a moderator by an admin
const deleteModerator = async (req, res) => {
  try {
    const { moderator_id } = req.params;
    await client.query(deleteModeratorQuery, [moderator_id]);
    res.status(200).json({ message: "Moderator deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all pending articles or search for an article
const getArticles = async (req, res) => {
  const { search } = req.query;
  if (search) {
    try {
      const articles = await client.query(searchPendingArticlesQuery, [
        `%${search}%`,
        "pending",
      ]);
      res.status(200).json(articles.rows);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    try {
      const articles = await client.query(getPendingArticlesQuery);
      res.status(200).json(articles.rows);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

// Update article status by an admin
const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;
    await client.query(updateArticleStatusQuery, [action, id]);
    res.status(200).json({ message: "Article updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all questions
const getQuestions = async (req, res) => {
  try {
    const { rows } = await client.query(getQuestionsQuery);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a question by an admin
const createQuestion = async (req, res) => {
  try {
    const { question, admin_id } = req.body;
    const newQuestion = await client.query(createQuestionQuery, [
      question,
      admin_id,
    ]);
    res.status(201).json(newQuestion.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a question by an admin
const deleteQuestion = async (req, res) => {
  try {
    const { question_id } = req.params;
    const question = await client.query(deleteQuestionQuery, [question_id]);
    res.status(200).json(question.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create an option for a question by an admin
const createOption = async (req, res) => {
  try {
    const { question_id, option_name, carbon_value } = req.body;
    const newOption = await client.query(createOptionQuery, [
      question_id,
      option_name,
      carbon_value,
    ]);
    res.status(201).json(newOption.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all options for a question
const getOptions = async (req, res) => {
  try {
    const { question_id } = req.params;
    const options = await client.query(getOptionsQuery, [question_id]);
    res.status(200).json(options.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a question by an admin
const updateQuestion = async (req, res) => {
  try {
    const { question_id } = req.params;
    const { question, admin_id } = req.body;
    const updatedQuestion = await client.query(updateQuestionQuery, [
      question,
      question_id,
    ]);
    await client.query(InsertIntoQuestionUpdateQuery, [question_id, admin_id]);
    res.status(200).json(updatedQuestion.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an option for a question by an admin
const updateOption = async (req, res) => {
  try {
    const { option_id } = req.params;
    const { option_name, carbon_value } = req.body;
    const updatedOption = await client.query(updateOptionQuery, [
      option_name,
      carbon_value,
      option_id,
    ]);
    res.status(200).json(updatedOption.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  adminSignin,
  createTask,
  createModerator,
  createBadge,
  getModerators,
  getUsers,
  getTasks,
  getBadges,
  assignBadge,
  assignTask,
  updateUser,
  deleteUser,
  getArticles,
  updateArticle,
  getQuestions,
  createQuestion,
  createOption,
  getOptions,
  deleteQuestion,
  updateQuestion,
  updateOption,
  updateModerator,
  deleteModerator,
};
