import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/core-output.dto';
import { Bookmark } from '../entities/bookmark.entity';

@InputType('GetBookmarkInput')
export class GetBookmarkInput extends PickType(Bookmark, ['id']) {}

@ObjectType()
export class GetBookmarkOutput extends CoreOutput {
  @Field((type) => Bookmark, { nullable: true })
  bookmark?: Bookmark;
}
