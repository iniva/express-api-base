export default class HealthController {
  static async get(req, res) {
    res.send({
      data: {
        message: 'All good here, thanks for asking!',
        version: req.app.get('version'),
      },
    });
  }
}
