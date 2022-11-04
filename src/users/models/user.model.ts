import { Field, ObjectType } from '@nestjs/graphql';
import { AbstarctModel } from '../../common/abstract.model';

@ObjectType()
export class User extends AbstarctModel {
  @Field()
  readonly email: string;
}
