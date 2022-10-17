const joi = require('joi')

const id = joi.number().integer().min(1).required()
const channel_id= joi.number().integer().required()
const title= joi.string().required()
const content= joi.string().required()
const type=joi.number().integer().required()
const images=joi.array().required()


exports.get_article = {
    params: {
        id
    }
}

exports.add_article = {
    body: {
        channel_id,
        title,
        content,
        type,
        cover: joi.object().keys({
            type,
            images
        })
    }
}

exports.delete_article = {
    params: {
        id
    }
}

exports.update_article = {
    body: {
        channel_id,
        title,
        content,
        cover: joi.object().keys({
            images
        })
    },
    params: {
        id
    }
}

