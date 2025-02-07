const express = require('express');
const { adminSignin, createTask , createModerator, createBadge, getModerators, getTasks, getBadges, getUsers, assignBadge, assignTask , updateUser, deleteUser} = require('../controllers/admin.controller.js');

const AdminRoute = express.Router();

AdminRoute.post('/signin', adminSignin);
AdminRoute.post('/create/task', createTask);
AdminRoute.post('/create/moderator', createModerator);
AdminRoute.post('/create/badge', createBadge);

AdminRoute.get('/moderators', getModerators);
AdminRoute.get('/users', getUsers);
AdminRoute.get('/tasks', getTasks);
AdminRoute.get('/badges', getBadges);


AdminRoute.post('/assign/task', assignTask);
AdminRoute.post('/assign/badge', assignBadge);

AdminRoute.put('/update/user', updateUser);
AdminRoute.delete('/delete/user/:user_id', deleteUser);
module.exports = { AdminRoute }

