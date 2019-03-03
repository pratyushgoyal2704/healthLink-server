const bcrypt = require('bcryptjs');

const User = require('../../schema/models/User');
const Stat = require('../../schema/models/Stat');
const Key = require('../../schema/models/Key');
const Token = require('../../schema/models/Token');
const Guild = require('../../schema/models/Guild');
const Connection = require('../../schema/models/Connection');
const GuildChallenge = require('../../schema/models/GuildChallenge');
const FlutterNumber = require('../../schema/models/FlutterNumber');
const jwt = require('jsonwebtoken');
const Axios = require('axios');

// PREnc
const {PRE, Delegator, Delegatee, Proxy} = require("../../util/enc/PRE");
const AES = require("../../util/enc/AES")

require("../../util/mcl-wasm/mcl");

const user = userId => {
    return User.findById(userId)
    .then( user => {
        return {...user._doc, _id: user.id, stats: stats.bind(this, user._doc.stats)}
    }).catch( err => {
        console.log('Error getting the User by ID: ', err);
        throw err;
    })
}

const stats = statIds => {
    return Stat.find({_id: {$in: statIds}})
    .then( stats => {
        return stats.map( stat => {
            return { ...stat._doc, _id: stat.id, holder: user.bind(this, stat.holder) }
        })
    }).catch( err => {
        console.log('Error getting the Stat by ID: ', err);
        throw err;
    })
}


module.exports = {
    stats: () => {
        return Stat.find().then(stats => {
            return stats.map( stat => {
                return {
                    ...stat._doc,
                     _id: stat.id,
                     holder: user.bind(this, stat._doc.holder) 
                };
            });
        }).catch(err => {
            console.log('Error fetching Stats: ', err);
            throw err;
        });
    },
    users: (req) => {
        const users = [];
        // if(!req.isAuth) {
        //     throw new Error('Unauthenticated!')
        // }
        return User.find().then( usersAll => {
            usersAll.map( user => {
                users.push(user);
            })
        }).then(() => {
            if(users.length !== 0){
                return users;
            }
            else throw err;
        }).catch(err => {
            console.log('Captain, Error getting all the users: ', err);
            throw err;
        });
    },
    syncFlutterOne: (args) => {
        const steps = new FlutterNumber({
            steps: args.syncFlutterOneInput.steps
        });
        steps.save();
        return 0;
    },
    syncFlutterTwo: (args) => {
        const steps = new FlutterNumber({
            steps: args.syncFlutterTwoInput.steps
        });
        steps.save();
        return 0;
    },
    guildChallenges: (req) => {
        if(!req.isAuth) {
            throw new Error('Unauthenticated!')
        }
        return GuildChallenge.findOne( {$elemMatch: {holderNames: args.holderName}}).then(() => {
            console.log('Found that Challenge');
        });
    },
    createUser: (args) => {
        return User.findOne({ $or: [{ email: args.userInput.email }, {username: args.userInput.username}]}).then( user => {
            if(user){
                throw new Error('User exists already');
            }
            return bcrypt.hash(args.userInput.password, 12)    
        })
        .then( hashedPassword => {
            const pre = new PRE();
            console.log('Hashed Password: ', hashedPassword);
            console.log('User input args: ', args);
            pre.init(args.userInput.password, hashedPassword).then(() => {
                // console.log(33543);
                const A = new Delegator(pre);
                const B = new Delegatee(pre);
                const key = new Key({
                    kind: "PUBLIC_KEY",
                    value: B.pk,
                })
                console.log('Main Key: ', key);
                key.save();
                return(key);
            }).then((key) => {
                const user = new User({
                    email: args.userInput.email,
                    password: hashedPassword,
                    username: args.userInput.username,
                    sport: args.userInput.sport,
                    name: args.userInput.name,
                    key: key,
                });
                if(args.userInput.clients) {
                    user.clients = args.userInput.clients;
                    args.userInput.tokensInput.map( token => {
                        let tokenToBeSent = new Token({
                            kind: token.kind,
                            value: token.value
                        })
                        user.tokens.push(tokenToBeSent);
                    }); 
                    console.log("TokenInput: ", args.userInput.tokensInput); 
                }
                console.log('Saving the following User: ', user);
                return user.save();
            }).then( res => {
                return {...res._doc, _id: res.id};
            });
        })
        .catch( err => {
            console.log('Error: ', err);
            throw err;
        })
    },
    createStat: (args, req) => {
        if(!req.isAuth) {
            throw new Error('Unauthenticated!')
        }
        date = Date.now().toString()
        const stat = new Stat({
            name: args.statInput.name,
            date: date,
            description: args.statInput.description,
            value: args.statInput.value,
            holder: req.userId,
        });
        let createdStat; 
        return stat.save()
        .then(res => {
            console.log('Stat saved: ', stat);
            console.log('Saved Stat to Atlas: ', res);
            createdStat = {...res._doc, _id: res._doc._id.toString(), holder: user.bind(this, res._doc.holder) };
            return User.findById(req.userId);
        }).then(user => {
            if(!user) {
                throw new Error('No User Found')
            }
            user.stats.push(stat);
            return user.save();
        })
        .then(res => {
            return createdStat;
        })
        .catch(err => {
            console.log('Stat: ', stat);
            console.log('Error saving to Atlas: ', err);
        });
    },
    updateStat: (args, req) => {
        if(!req.isAuth) {
            throw new Error('Unauthenticated!')
        }
        const todayDate = new Date.toLocaleDateString();
        return Stat.findOne({ $and: [{ date: todayDate }, { username: req.username }, { name: args.updateStatInput.name }]}).then(stat => {
            if( !stat ) {
                throw new Error('Stat not found');
            }
            stat.value = args.updateStatInput.value;
            stat.save();
        })
    },
    createChallenge: (args) => {
        if (args.createChallengeInput.kind === 'GUILD') {
            // GUILD TYPE CHALLENGE
            const challenge = new GuildChallenge({
                mission: args.createChallengeInput.mission,
                holderIDs: args.createChallengeInput.holderIDs,
                holderNames: args.createChallengeInput.holderNames
            })
            challenge.save();
        }
        else {
            // INDIVIDUAL TYPE CHALLENGE
        }
    },
    sendRequest: (args, req) => {
        if(!req.isAuth) {
            throw new Error('Unauthenticated!')
        }
        return User.findOne({username: args.sendRequestInput.reciever}).then( user => {
            if(user){
                throw new Error('Captain!, error getting user for this request');
            }
            const cReq = new Request({
                sender: args.sendRequestInput.sender,
                receiver: args.sendRequestInput.receiver,
                kind: args.sendRequestInput.kind,
                status: 1,
            }) 
            cReq.save();
        });
    },
    // Accept request estabilishes a new connection
    acceptRequest: (args, req) => {
        if(!req.isAuth) {
            throw new Error('Unauthenticated!')
        }
        return Request.findOne({ $and: [{ sender: args.acceptRequest.sender }, {reciever: args.acceptRequest.reciever}]}).then( request => {
            const reKey = new Key({
                kind: 'reKey',
                value: args.reKey.value
            });
            const connect = new Connection({
                reKey: reKey,
                resKey: args.acceptRequestInput.reskey,
                holder: args.acceptRequestInput.userId,
            });
            reKey.save();
            connect.save();
        });
    },
    createStats: (args) => {
        // AAA Describe
    },
    deleteStat: (args) => {
        // AAA Describe
    },
    deleteStats: (args) => {
        // AAA Describe
    },
    syncFit: (args, req) => {
        if(!req.isAuth) {
            throw new Error('Unauthenticated!')
        }
        // !!! Use the username provided to log that the user synced the Data into the History Object
        const fitSet = {};
        const timeNow = Date.now();
        console.log('Time in milliseconds: ', timeNow);
        
        // const apiKey = 
        return Axios.post(
            'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate/', {
                "aggregateBy": [{
                    "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
                }],
                "bucketByTime": { "durationMillis": 86400000 },
                "startTimeMillis": ((timeNow - (timeNow % 86400000)) - (86400000 * 29)) - ( 330 * 60 * 1000 ),
                "endTimeMillis": timeNow
            },{
                headers: {
                    "Authorization" : 'Bearer ' + args.syncFitInput.token.value
                }
            }
        ).then((res) => {
            var res = res.data;
            const stats = [];
            for( i = 0; i <= 29; i++ ){
                console.log('Data to be synced: ', res.bucket[i].dataset[0].point[0].value[0].intVal);
                let stat = new Stat({
                    name: 'Steps',
                    date: (timeNow - (timeNow % 86400000)).toString(),
                    description: 'Steps Day: ' + ( 29 - i ) + ' were taken',
                    value: res.bucket[i].dataset[0].point[0].value[0].intVal
                })
                stats.push(stat);
                console.log('Stats: ', stats);
            }
            return stats;
            // return
            // createStat({statInput: {name: "Steps", description: "Steps For Last 30 Days", va}});
        },
        (error) => {
            var status = error
            console.log('Error Getting Steps Data from Google Fit: ', status);
        });
    },
    login: async ({email, password}) => {
        const user = await User.findOne({email : email});
        if (!user) {
            throw new Error('User does not exist!');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual) {
            throw new Error('Invalid Password');
        }
        const token = jwt.sign({userId: user.id, email: user.email}, 'brooklynninenine', {
            expiresIn: '100hr'
        })
        return { userId: user.id , token: token, tokenExpiration: 100 }
    },
    createRequest : (args) => {

    },
    createGuild: (args) => {
        var members = [];
        args.createGuildInput.map( username => {
            return User.findOne({username: username}).then( user => {
                if(!user) {
                    throw new Error('Usernames of one or more participants not found!');
                }
                members.push(username);
            }).then( () => {
                const guild = new Guild({
                    name: args.createGuildInput.name,
                    members: args.createGuildInput.members,
                });
                return guild.save();
            }).catch( err => {
                throw(err);
            });
        })
    }
    // createConnection: (args) => {
    //     const connection = new Connection({

    //     })
    // }
}