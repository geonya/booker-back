import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AbstarctModel {
  @Field()
  readonly _id: string;
}
