module.exports = (express, app) => {
    const router = express.Router();

    router.get('/',( req, res, next) => {
        res.render('index', {title : 'welcole to CHATCAT'});
    });

    router.get('/chatroom',( req, res, next) => {
        res.render('chatrooms', {title : 'Chatrooms'});
    });

    app.use('/', router);
};