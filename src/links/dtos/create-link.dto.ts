import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsUrl } from 'class-validator';
import { CoreOutput } from '../../common/core-output.dto';
import { Link } from '../entities/link.entity';

@InputType('CreateLinkInput')
export class CreateLinkInput extends PickType(Link, ['bookmarkId']) {
  @Field((type) => String)
  @IsUrl()
  url: string;
}

@ObjectType()
export class CreateLinkOutput extends CoreOutput {
  @Field((type) => Link, { nullable: true })
  link?: Link;
}
