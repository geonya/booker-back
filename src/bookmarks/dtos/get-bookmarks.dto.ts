import { Field, ObjectType } from '@nestjs/graphql'
import { CoreOutput } from '../../common/core-output.dto'
import { Bookmark } from '../entities/bookmark.entity'

@ObjectType()
export class GetBookmarksOutput extends CoreOutput {
  @Field((type) => [Bookmark], { nullable: true })
  bookmarks?: Bookmark[]
}
