var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db) {
    // Create route
    app.post('/notes', (req, res) => {
        // We'll create the note here
        // console.log(req.body)
        // res.send('Hello!!')
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });
            }
            else {
                res.send(result.ops[0]);
            }
        });
    });

    // Read route
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });
            }
            else {
                res.send(item);
            }
        });
    });

    // Update route
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').update(details, note, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });
            }
            else {
                res.send(item);
            }
        });
    });

    // Delete route
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occured' });
            }
            else {
                res.send('Note ' + id + ' deleted!!');
            }
        });
    });
}