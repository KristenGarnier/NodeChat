module.exports = (express, app, passport) => {
    const router = express.Router();

    router.get('/',( req, res, next) => {
        res.render('index', {title : 'welcole to CHATCAT'});
    });

    router.get('/auth/facebook', passport.authenticate('facebook'));

    router.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect : '/'
    } ), (req, res )=> {
        res.redirect('/chatrooms');
    });

    router.get('/chatrooms',( req, res, next) => {
        res.render('chatrooms', {title : 'Chatrooms', user:req.user});
    });

    router.get('/setcolor', (req, res, next) => {
        req.session.favColor = 'Red';
        res.send('setting favorite color...');
    });

    router.get('/getcolor', (req, res, next) => {
        res.send(`Favourite color : ${req.session.favColor === undefined ? 'Not Found' : req.session.favColor}`);
    });

    app.use('/', router);
};