var friends = require("../data/friends.js");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 100
        }

        // console.log(req.body);

        // parse the user's survey post
        var userData = req.body;
        var userScores = userData.scores;

        // variable that calculates the difference in scores
        var totalDifference = 0;

        for (var i=0; i < friends.length; i++) {
            totalDifference = 0;
            for (var j = 0; j < friends[i].scores.length; j++ ) {
            //calc difference in scores
            totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
            
            // if sum of differences is less than current best match...
            if (totalDifference <= bestMatch.friendDifference) {
                // new best match object
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.friendDifference = totalDifference;
                }
            }
        }

        // add to the friends array
        friends.push(userData);

        //return a JSON to be used in HTML page
        res.json(bestMatch);

    });
} // end module.exports