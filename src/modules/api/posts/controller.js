export default class PostsController {
    static async list(req, res) {
        res.send({
            data: []
        });
    }

    static async create(req, res) {
        // req.body content must not be trusted and
        // should be validated before handling it
        res.send({
            data: req.body
        });
    }
}
