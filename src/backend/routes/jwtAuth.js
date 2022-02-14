const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorize = require ('../middleware/authorize');

router.post("/register", validInfo, async (req, res) => {
    try{
        //1 - Get the user from the database (login, senha e nome)
        const {name, email, senha} = req.body;

        //2- Check if the user exists
        const user = await pool.query("SELECT * FROM usuario WHERE login = $1", [email])
        if (user.rows.length !== 0) {
            return res.status(401).send("Usuário já existe");
        }

        //3-Bcrypt the password
        const saltRound = 10;
        const salt = await bcrypt.genSaltSync(saltRound);

        const bcryptPassword = await bcrypt.hash(senha, salt);

        //4- Insert the user into the database
        const newUser = await pool.query("INSERT INTO usuario (nome, login, senha) VALUES ($1, $2, $3) RETURNING *", 
            [name, email, bcryptPassword]
        );

        //5- Generate the token
        const token = jwtGenerator(newUser.rows[0].login);
        res.json({token })
        

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.post("/login", validInfo, async (req, res) => {
    try {
        //1- Destructure the user from the request
        const {email, senha} = req.body;


        //2-Check if the user exists
        const user = await pool.query("SELECT * FROM usuario WHERE login = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(401).json("Email ou senha incorretos");
        }


        //3- Check if the password is correct
        const validPassword = await bcrypt.compare(senha, user.rows[0].senha);

        if (!validPassword) {
            return res.status(401).json("Email ou senha incorretos");
        }


        //4- Give the user a token
        const token = jwtGenerator(user.rows[0].login);
        res.json({token});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/is-verify", authorize, async (req, res) => {
    try {
        res.json(true);

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

module.exports = router;