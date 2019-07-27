const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const leagueSchema = new Schema({
    name: {
        type: String,
        required,
        lowercase: true
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    teams: [{
        type: Schema.Types.ObjectId,
        ref: "Team"
    }]
});

module.exports = mongoose.model("League", leagueSchema);