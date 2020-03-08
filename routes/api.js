module.exports = app => {
    app.get('/url', function (req, res) {
        let url = req.query.q;
        app.controllers.api.getUrl(req.query.q)
            .then(function (response) {
                res.status(200).send(response.data);
            })
            .catch(function (error) {
                res.status(404).end()
            });        
    });
}