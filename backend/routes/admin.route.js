const express = require('express');
const { adminSignin, createTask , createModerator, createBadge} = require('../controllers/admin.controller.js');

const AdminRoute = express.Router();

AdminRoute.post('/signin', adminSignin);
AdminRoute.post('/create/task', createTask);
AdminRoute.post('/create/moderator', createModerator);
AdminRoute.post('/create/badge', createBadge);

module.exports = { AdminRoute }

