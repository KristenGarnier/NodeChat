module.exports = (express, app, passport, config) => {
    const router = express.Router();

    const securePages = (req, res, next) => {
        if(req.isAuthenticated()){
            next();
        } else {
            res.redirect('/');
        }
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

    router.get('/chatrooms', securePages, ( req, res, next) => {
        res.render('chatrooms', {title : 'Chatrooms', user:req.user, config: config});
    });

    app.use('/', router);
};