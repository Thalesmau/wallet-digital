const router = require ('express').Router();
const pool = require ('../db');
const authorize = require ('../middleware/authorize');

router.get("/", authorize, async(req, res) => {
    try {
        //res.json(req.user);

        const user = await pool.query("SELECT * FROM usuario WHERE login = $1", [req.user]);
        res.json(user.rows[0]);


    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});




module.exports = router;