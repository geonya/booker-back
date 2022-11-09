import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/core-output.dto';
import { Link } from '../entities/link.entity';

@InputType('GetLinksInput')
export class GetLinksInput {
  @Field((type) => Int)
  bookmarkId: number;
}
@ObjectType()
export class GetLinksOutput extends CoreOutput {
  @Field((type) => [Link], { nullable: true })
  links?: Link[];
}
