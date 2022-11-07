import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from '../auth/current-user.decorator'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { User } from '../users/entities/user.entity'
import { BookmarksService } from './bookmarks.service'
import {
  CreateBookmarkInput,
  CreateBookmarkOutput,
} from './dtos/create-bookmark.dto'
import { GetBookmarksOutput } from './dtos/get-bookmarks.dto'
import { Bookmark } from './entities/bookmark.entity'

@Resolver((of) => Bookmark)
export class BookmarksResolver {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => CreateBookmarkOutput)
  async createBookmark(
    @Args('input') createBookmarkInput: CreateBookmarkInput,
    @CurrentUser() user: User,
  ): Promise<CreateBookmarkOutput> {
    return this.bookmarksService.createBookmark(createBookmarkInput, user.id)
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => GetBookmarksOutput)
  async getBookmarks(@CurrentUser() user: User): Promise<GetBookmarksOutput> {
    return this.bookmarksService.getBookmarks(user.id)
  }
}
