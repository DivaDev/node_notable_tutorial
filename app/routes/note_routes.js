module.exports = function(app, db) {
    //CREATE route
    app.post('/notes', (req, res) => {
        //You'll create your note here
        console.log(req.body)
        res.send('Hello');
    });
};