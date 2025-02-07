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
        const { moderator_id } = req.body;
        console.log(req.body)



        if (!moderator_id) {
            return res.status(400).json({ error: "Moderator ID is required" });
        }

        // Get all assigned task IDs for this moderator
        const { rows: assignedTasks } = await client.query(
            `SELECT task_id FROM assign WHERE moderator_id = $1`, [moderator_id]
        );

        if (assignedTasks.length === 0) {
            return res.status(200).json([]); // No tasks assigned
        }

        // Extract all task_ids
        const taskIds = assignedTasks.map(row => row.task_id);

        // Fetch all task details in one query
        const { rows: tasks } = await client.query(
            `SELECT * FROM task WHERE task_id = ANY($1)`, [taskIds]
        );

        res.status(200).json(tasks);
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = { ModeratorSignIn , getTasks}