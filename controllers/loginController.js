function getLogin(req, res) {
    console.log(req.session.isLoggedIn);
    res.send('login page');
}

function postLogin(req, res) {
    req.session.isLoggedIn = true;
    res.redirect('/');
}

module.exports = { getLogin, postLogin };
