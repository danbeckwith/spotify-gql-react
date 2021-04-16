import { SchemaDirectiveVisitor } from 'apollo-server';
import { defaultFieldResolver, GraphQLField } from 'graphql';

type SchemaField = GraphQLField<unknown, unknown>;
export class renameField extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: SchemaField): SchemaField | void | null {
    const { name } = this.args;
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (object, args, context, info) => {
      object[field.name] = object[name];
      delete object[name];
      return resolve.call(this, object, args, context, info);
    };
  }
}
