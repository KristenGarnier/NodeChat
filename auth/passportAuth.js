module.exports = (passport, FacebookStrategy, config, mongoose) => {

    const chatUser = new mongoose.Schema({
        profileID: String,
        fullname: String,
        profilePic: String
    });

    const User = mongoose.model('chatUser', chatUser);

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    });

    const checkUser = id => {
        return new Promise(
            (resolve, reject) => {
                User.findOne({'profileID': id}, (err, result) => {
                    if (!err) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
            }

        );
    };

    const newUser = profile => {
         return new User({
            profileID:profile.id,
            fullname: profile.displayName,
            profilePic: profile.photos[0].value || ''
        });
    };

    const saveUser = user => {
        return user.save();
    };

    const sendUser = (user, done) => {
        done(null, user);
    };


    passport.use(new FacebookStrategy({
        clientID: config.fb.appID,
        clientSecret: config.fb.appSecret,
        callbackURL: config.fb.callbackURL,
        profileFields: ['id', 'displayName', 'photos']
    }, (access, refresh, profile, done) => {
        checkUser(profile.id)
            .then((result) => {
                if (result !== null){
                    sendUser(result, done);
                }
                else {
                    return saveUser(newUser(profile));
                }
            })
            .then((created) => {
                sendUser(created, done);
            })
            .catch((err) => {
                console.log(err);
            })
    }));
};