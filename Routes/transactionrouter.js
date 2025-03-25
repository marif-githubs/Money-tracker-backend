const express = require("express");
const router = express.Router();
const {
    getEntries,
    createEntry,
    deleteEntry,
    DashboardData,
    search
} = require("../Controllers/entriescontroller");

router.get('/entries', getEntries);
router.post('/entry', createEntry);
router.delete('/entry/:id', deleteEntry);
router.get('/dashboardData', DashboardData);
router.get('/search', search);
//optional: UPDATE ENTRY

module.exports = router;