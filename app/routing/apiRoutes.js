var userData = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(userData);
    });

    app.post("/api/friends", function(req, res) {

        console.log("POSTING THE SUBMIT");
        
        userData.push(req.body);
        if (userData.length > 0) {
            res.json(userData);
        }
    });
} // end module.exports