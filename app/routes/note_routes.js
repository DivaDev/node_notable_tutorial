var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    app.get('/notes/:id', (req, res) => { //READ route
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
              res.send(item);  
            }
        });
    });
    

    app.post('/notes', (req, res) => { //CREATE route
        const note = { text: req.body.body, title: req.body.title };
            db.collection('notes').insert(note, (err, result) => {
              if (err) {
                  res.send({ 'error': 'An error has occurred' });
              } else {
                  res.send(result.ops[0]);
              }
        });
    });
    
    app.delete('/notes/:id', (req, res) => { //DELETE route
        const id = req.params.id;
        const details = { '_id':  new ObjectID(id)};
        db.collection('notes').remove(details, (err, item) => {
            if(err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send('Note ' + id + ' deleted! ');
            }
        });
    });
    
    app.put('/notes/:id', (req, res) => { //UPDATE route
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        
        //error checking
        if (req.body.body != null && req.body.title != null) {
            const note = { text: req.body.body, title: req.body.title };
            db.collection('notes').update(details, note, (err, result) => { //if found update, otherwise create the note
                if(err) {
                    res.send({'error': 'An error has occurred'});
                } else {
                    res.send(note);
                }
            });
        } else {
            res.send({'error': 'Invalid request! In order to update this note, both the title and body must not be null!'});
        }
        
        
    })
};