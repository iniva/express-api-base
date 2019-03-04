import PostsValidator from './validator';

export default class PostsController {
  static async list(req, res) {
    res.send({
      data: [],
    });
  }

  static async create(req, res) {
    const { errors, value } = PostsValidator.create(req.body);

    if (errors) {
      throw PostsValidator.toResponse(errors);
    }

    res.send({
      data: value,
    });
  }
}
