import Boom from 'boom';

export default class HealthController {
    static async get(req, res) {
        if (req.query.hasOwnProperty('fail')) {
            throw Boom.badRequest('oh dear');
        }

        res.send({
            data: {
                message: 'All good here, thanks for asking!'
            }
        });
    }
}
