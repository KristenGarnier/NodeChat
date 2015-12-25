module.exports = (passport, FacebookStrategy, config, mongoose) => {

    const chatUser = new mongoose.Schema({
        profileID: String,
        fullName: String,
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
            User.findOne({'profileID': id}, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            })
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
        return user.save()
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
                if (result)
                    sendUser();
                else {
                    const newUser = newUser(profile);
                    saveUser(newUser)
                        .then(() => {
                            saveUser(newUser, done);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }));
};