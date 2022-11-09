import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsUrl } from 'class-validator';
import { CoreOutput } from '../../common/core-output.dto';
import { Bookmark } from '../entities/bookmark.entity';

@InputType('UpdateBookmarkInput')
export class UpdateBookmarkInput extends PickType(Bookmark, ['id']) {
  @Field((type) => String)
  @IsUrl()
  url: string;
}

@ObjectType()
export class UpdateBookmarkOutput extends CoreOutput {
  @Field((type) => Bookmark, { nullable: true })
  bookmark?: Bookmark;
}
