var mongoose = require("mongoose");
var episodeSchema = new mongoose.Schema({
    name: String,
    link: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: "String"
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }    
    ]
});
module.exports = mongoose.model("Episode", episodeSchema);