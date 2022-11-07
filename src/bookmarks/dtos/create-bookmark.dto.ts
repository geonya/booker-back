import { InputType, ObjectType, PickType } from '@nestjs/graphql'
import { CoreOutput } from '../../common/core-output.dto'
import { Bookmark } from '../entities/bookmark.entity'

@InputType('CreateBookmarkInput')
export class CreateBookmarkInput extends PickType(Bookmark, ['name']) {}

@ObjectType()
export class CreateBookmarkOutput extends CoreOutput {}
