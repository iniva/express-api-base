import Validator from 'Utils/validator';
import PostSchema from './schema';

export default class PostsValidator extends Validator {
  static create(params) {
    const validation = this.validate(params, PostSchema.create());

    return this.parseValidation(validation);
  }
}
