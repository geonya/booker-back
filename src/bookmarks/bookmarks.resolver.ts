import { Resolver } from '@nestjs/graphql'
import { BookmarksService } from './bookmarks.service'
import { Bookmark } from './entities/bookmark.entity'

@Resolver((of) => Bookmark)
export class BookmarksResolver {
  constructor(private readonly bookmarksService: BookmarksService) {}
}
