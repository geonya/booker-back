import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql'
import { CoreOutput } from '../../common/core-output.dto'
import { User } from '../entities/user.entity'

@InputType('GetUserInput')
export class GetUserInput extends PickType(User, ['id']) {}

@ObjectType()
export class GetUserOutput extends CoreOutput {
  @Field((type) => User, { nullable: true })
  user?: User
}
