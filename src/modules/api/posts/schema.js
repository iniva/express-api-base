import Joi from '@hapi/joi';

export default class PostSchema {
  static create() {
    return Joi.object().keys({
      title: Joi.string()
        .min(5)
        .required(),
    });
  }
}
