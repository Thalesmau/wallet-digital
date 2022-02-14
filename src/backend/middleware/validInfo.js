module.exports = (req, res, next) => {
    const {email, name, senha} = req.body;

    function validEmail(email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);	
    }

    if (req.path === "/register") {
        if (![email, name, senha].every(Boolean)) {
            return res.status(401).json("Preencha todos os campos");
        } else if (!validEmail(email)) {
            return res.status(401).json("Email inválido");
        }
    } else if (req.path === "/login") {
        if (![email, senha].every(Boolean)) {
            return res.status(401).json("Preencha todos os campos");
        } else if (!validEmail(email)) {
            return res.status(401).json("Email inválido");
        }
    }

    next();

}