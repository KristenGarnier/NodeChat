module.exports = (express, app, passport, config, rooms) => {
    const router = express.Router();

    const securePages = (req, res, next) => {
        if(req.isAuthenticated()){
            next();
        } else {
            res.redirect('/');
        }
    };

    const roomTitle = (id, rooms) => {
        const room = rooms.filter(room => {
            return room.room_number === Number(id);
        });

        return room[0].room_name;
    };

    router.get('/',( req, res, next) => {
        res.render('index', {title : 'welcole to CHATCAT'});
    });

    router.get('/auth/facebook', passport.authenticate('facebook'));

    router.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect : '/'
    } ), (req, res )=> {
        res.redirect('/chatrooms');
    });

    router.get('/logout', (req, res, next) => {
        req.logout();
        res.redirect('/');
    });

    router.get('/room/:id', securePages, (req, res, next) => {
        res.render('room', {user: req.user, room_number: req.params.id, room_name:roomTitle(req.params.id, rooms), config:config})
    });

    router.get('/chatrooms', securePages, ( req, res, next) => {
        res.render('chatrooms', {title : 'Chatrooms', user:req.user, config: config});
    });

    app.use('/', router);
};