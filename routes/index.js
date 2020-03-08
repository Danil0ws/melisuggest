module.exports = app => {
    app.get('/', function (req, res) {       
        let status = req.query.status;   
        res.render('index.html', {status: status});
    });
}