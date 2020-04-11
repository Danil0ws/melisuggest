module.exports = app => {
    let apps = {'url':process.env.APP_URL,'port':process.env.APP_PORT};
    app.get('/', function (req, res) {       
        let status = req.query.status;   
        res.render('index.html', {status: status, app: apps});
    });
}