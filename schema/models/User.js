const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // Unique ID +
    // Name of the User
    name: {
        type: String,
        required: true
    },
    // Favourite Sport of the User
    sport: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    connections: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Connections'
        }
    ],
    // level: Number,
    // hp: Number,
    // challenges: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Challenges'
    //     }
    // ],
    // guild: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Guild'
    // },
    stats: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Stats'
        }
    ],
    // type: Number,
    clients: [String],
    // retreat: String,
    // blogs: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Blogs'
    //     }
    // ],
    // status: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Status'
    // },
    // trackers: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Trackers'
    //     }
    // ],
    // clinical: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Clinical'
    // },
    // diet: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Diet'
    // },
    // reports: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Reports'
    //     }
    // ],
    // doctors: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Doctors'
    //     }
    // ],
    // concerns: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Doctors'
    //     }
    // ],
    // titles: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Titles'
    //     }
    // ],
    // usage: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Usage'
    // },
    // permissions: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Permissions'
    //     }
    // ],
    tokens: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tokens'
        }
    ],
    // messagaes: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Messages'
    //     }
    // ],
    // about: String,
    // history: History,
    // requests: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Requests'
    //     }
    // ],
});

// const guildSchema = new Schema({})

// const connectionsSchema = ({})

// const challengesSchema = ({})

// const statsSchema = ({})

// const blogsSchema = ({})

// const statusSchema = ({})

// const trackersSchema = ({})

// const clinicalsSchema = ({})

// const dietSchema = ({})

// const reportsSchema = ({})

// const doctorsSchema = ({})

// const concernsSchema = ({})

// const titlesSchema = ({})

// const usageSchema({})

// const permissionsSchema = ({})

module.exports = mongoose.model('User', userSchema);