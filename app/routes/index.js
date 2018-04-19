const noteRoutes = require('./note_routes');

module.exports = function(app, db) {
    noteRoutes(app, db);
    //Other routes could go here in the future
};

