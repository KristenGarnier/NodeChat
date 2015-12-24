module.exports = (express, app) => {
    const router = express.Router();

    router.get('/',( req, res, next) => {
        res.render('index', {title : 'welcole to CHATCAT'});
    });

    router.get('/chatroom',( req, res, next) => {
        res.render('chatrooms', {title : 'Chatrooms'});
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