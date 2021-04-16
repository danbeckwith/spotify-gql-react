import { SchemaDirectiveVisitor } from 'apollo-server';
import { defaultFieldResolver } from 'graphql';

export class renameField extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { name } = this.args;
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (object, args, context, info) => {
      object[field.name] = object[name];
      delete object[name];
      return resolve.call(this, object, args, context, info);
    };
  }
}
