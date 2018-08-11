export default class HealthController {
    static async get(req, res) {
        if (req.query.hasOwnProperty('fail')) {
            const error = new Error('oh dear');

            error.statusCode = 400;

            throw error;
        }

        res.send({
            data: {
                message: 'All good here, thanks for asking!'
            }
        });
    }
}
