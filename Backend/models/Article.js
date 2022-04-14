const artcilesSchema = Schema({

    userId: { type: String, required: true },
    title: { type: String, required: true },
    imageURL: { type: String, required: true },
    description: { type: String, required: true },

});