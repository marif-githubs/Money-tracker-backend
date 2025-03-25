const pool = require("../Services/db.js")

const getEntries = async (req, res, next) => {
    const id = req.user.id;
    const offset = req.query.offset || 0;
    try {
        const inc_entries = await pool.query("SELECT t_id, title, amount, description, t_time FROM public.transactions WHERE type = 'income' AND user_id = $1 order by t_time limit 10 offset $2", [id, offset]);

        const exp_entries = await pool.query("SELECT t_id, title, amount, description, t_time FROM public.transactions WHERE type = 'expense' AND user_id = $1 order by t_time limit 10 offset $2", [id, offset]);

        const ass_entries = await pool.query("SELECT t_id, title, amount, description, t_time FROM public.transactions WHERE type = 'assets' AND user_id = $1 order by t_time limit 10 offset $2", [id, offset]);

        res.json({
            inc_entries: inc_entries.rows,
            exp_eentries: exp_entries.rows,
            ass_entries: ass_entries.rows
        })

    } catch (err) {
        console.log(err);
        //message to client
    }
}

const createEntry = async (req, res, next) => {
    const id = req.user.id;
    const title = req.body.title;
    const amount = req.body.amount;
    const description = req.body.description;
    const type = req.body.type;
    console.log(id);

    console.log(type);
    console.log(title);
    console.log(amount);

    try {
        const insertResult = await pool.query("INSERT INTO transactions( user_id, title, amount, description, type) VALUES( $1, $2, $3, $4, $5)", [id, title, amount, description, type]);

        if (insertResult.rowCount !== 1) {
            return res.json({ Message: 'Transaction Fail', status: 'Fail' });
        }

        res.json({ Message: 'Transaction Success', status: 'Success' });
    } catch (err) {
        console.log(err);
        res.json({ Message: 'Transaction Error', status: 'Error' });
    }
}


const deleteEntry = async (req, res, next) => {
    console.log(req);
    const id = req.user.id;
    const entry_id = req.params.id;

    try {
        const deleteResult = await pool.query("DELETE FROM transactions WHERE t_id = $1", [entry_id]);

        if (deleteResult.rowCount !== 1) {
            return res.json({ Message: 'Transaction Fail', status: 'Fail' });
        }

        res.json({ Message: 'Transaction Success', status: 'Success' });

    } catch (err) {
        console.log(err);
        res.json({ Message: 'Transaction Error', status: 'Error' });
    }

}

const DashboardData = async (req, res, next) => {

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