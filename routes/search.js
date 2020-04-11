const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');
const moment = require('moment');

const adapter = new FileSync('./db/db.json');
const db = low(adapter);

module.exports = app => {
    let apps = {'url':process.env.APP_URL,'port':process.env.APP_PORT,'all':process.env.APP_URL_PORT};
    app.get('/search', function (req, res) {
        let q = req.query.q;      
        app.controllers.search.getSuggests(q)
        .then(function (response) {
            if(response.data.status==200) {
                db.get('search')
                    .push({ id: shortid.generate(), query: q, date: moment().format()})
                    .write()
                    res.render('search.html', { query: q, suggests: response.data, app: apps});
            }
            else {
                res.redirect('/?q='+q+'&status=error');
            }
        })
        .catch(function (error) {
            res.redirect('/?q='+q+'&status=error');
        });        
    });
}