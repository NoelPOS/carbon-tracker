const {client} = require('../db/dbconnect.js');

const {adminSignInQuery} = require('../queries/admin.js');

const {cloudinary} = require('../utils/cloudinary.js');


const adminSignin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await client.query(adminSignInQuery, [email, password]);
    
        if (admin.rows.length === 0) {
        return res.status(404).json({ message: 'Admin not found' });
        }
    
        res.status(200).json(admin.rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const createTask = async (req, res) => {
    try {
        const { title, instruction, admin_id } = req.body;
        const newTask = await client.query(
        'INSERT INTO Task (task_title, task_desc, admin_id) VALUES ($1, $2, $3) RETURNING *',
        [title, instruction, admin_id]
        );
    
        res.status(201).json(newTask.rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const createModerator = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(req.body)
        const newModerator = await client.query(
        'INSERT INTO Moderator (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name,email, password]
        );
    
        res.status(201).json(newModerator.rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


const createBadge = async (req, res) => {
    try {
        const {admin_id, name, image } = req.body;
        console.log(req.body)
        const uploadedResponse = await cloudinary.uploader.upload(image, {
            upload_preset: 'badges'
        });
        const newBadge = await client.query(
        'INSERT INTO Badge (admin_id, name, image) VALUES ($1, $2, $3) RETURNING *',   
        [admin_id, name, uploadedResponse.secure_url]
        );
        res.status(201).json(newBadge.rows[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { adminSignin, createTask , createModerator, createBadge}