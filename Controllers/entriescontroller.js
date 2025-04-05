const dbpool = require("../Configuration/db.js")

const getEntries = async (req, res, next) => {

    try {

        const id = req.user.id;

        const offset = req.query.offset || 0;
        const pool = await dbpool.connect();

        const inc_entries = await pool.query("SELECT t_id, title, amount, description, t_time FROM public.transactions WHERE type = 'income' AND user_id = $1 order by t_time limit 10 offset $2", [id, offset]);

        const exp_entries = await pool.query("SELECT t_id, title, amount, description, t_time FROM public.transactions WHERE type = 'expense' AND user_id = $1 order by t_time limit 10 offset $2", [id, offset]);

        const ass_entries = await pool.query("SELECT t_id, title, amount, description, t_time FROM public.transactions WHERE type = 'asset' AND user_id = $1 order by t_time limit 10 offset $2", [id, offset]);

        res.status(200).json({
            Message: 'Transaction Success', status: 'Success',
            inc_entries: inc_entries.rows,
            exp_entries: exp_entries.rows,
            ass_entries: ass_entries.rows
        })

        pool.release();
    } catch (err) {
        console.log(err);
        res.status(500).json({ Message: 'Transaction Error', status: 'Error' });
    }
}

const createEntry = async (req, res, next) => {
    try {

        const id = req.user.id;
        const title = req.body.title;
        const amount = req.body.amount;
        const description = req.body.description;
        const type = req.body.type;

        const pool = await dbpool.connect();

        const insertResult = await pool.query("INSERT INTO transactions( user_id, title, amount, description, type) VALUES( $1, $2, $3, $4, $5) RETURNING *", [id, title, amount, description, type]);

        if (insertResult.rowCount !== 1) {
            return res.status(400).json({ Message: 'Transaction Fail', status: 'Fail' });
        }

        res.status(200).json({ Message: 'Transaction Success', status: 'Success', item: insertResult.rows[0] });

        pool.release();
    } catch (err) {
        console.log(err);
        res.status(500).json({ Message: 'Transaction Error', status: 'Error' });
    }
}


const deleteEntry = async (req, res, next) => {

    try {

        const id = req.user.id;
        const entry_id = req.params.id;
        const pool = await dbpool.connect();

        const deleteResult = await pool.query("DELETE FROM transactions WHERE t_id = $1", [entry_id]);

        if (deleteResult.rowCount !== 1) {
            return res.status(400).json({ Message: 'Transaction Fail', status: 'Fail' });
        }

        res.status(200).json({ Message: 'Transaction Success', status: 'Success' });

        pool.release();
    } catch (err) {
        console.log(err);
        res.status(500).json({ Message: 'Transaction Error', status: 'Error' });
    }
}

const DashboardData = async (req, res, next) => {
    // compute dashboard data
    const pool = await dbpool.connect();
    const id = req.user.id;

    const result = await pool.query("SELECT total_exp, total_inc, balance FROM users WHERE ID = $1", [id]);

    res.status(200).json({ Message: 'Transaction Success', status: 'Success', info: result.rows });

    pool.release();
}

const search = async (req, res, next) => {

}

module.exports = {
    getEntries,
    createEntry,
    deleteEntry,
    DashboardData,
    search
}