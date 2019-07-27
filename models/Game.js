const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    teams: {
        type: Schema.Types.ObjectId,
        ref: "Team"
    },
    winner: {
        type: Schema.Types.ObjectId,
        ref: "Team"
    },
    time: String,
    away: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    home: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },

});

module.exports = mongoose.model('Game', gameSchema);