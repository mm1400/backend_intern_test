import { GraphQLScalarType, Kind } from 'graphql';

// https://www.apollographql.com/docs/apollo-server/schema/custom-scalars
export const Timestamp: GraphQLScalarType<Date | null, number> = new GraphQLScalarType({
  name: 'Timestamp',
  description: 'Timestamp custom scalar type',
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    }
    throw Error('GraphQL TimeStamp Scalar serializer expected a `Date` object');
  },
  parseValue(value) {
    if (typeof value === 'number') {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});