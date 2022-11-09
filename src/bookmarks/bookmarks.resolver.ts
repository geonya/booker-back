import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/current-user.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { User } from '../users/entities/user.entity';
import { BookmarksService } from './bookmarks.service';

import {
  CreateBookmarkInput,
  CreateBookmarkOutput,
} from './dtos/create-bookmark.dto';
import { GetBookmarkInput, GetBookmarkOutput } from './dtos/get-bookmark.dto';
import { GetBookmarksOutput } from './dtos/get-bookmarks.dto';
import {
  UpdateBookmarkInput,
  UpdateBookmarkOutput,
} from './dtos/update-bookmark.dto';
import { Bookmark } from './entities/bookmark.entity';

@Resolver((of) => Bookmark)
export class BookmarksResolver {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => CreateBookmarkOutput)
  async createBookmark(
    @Args('input') createBookmarkInput: CreateBookmarkInput,
    @CurrentUser() user: User,
  ): Promise<CreateBookmarkOutput> {
    return this.bookmarksService.createBookmark(createBookmarkInput, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => GetBookmarksOutput)
  async getBookmarks(@CurrentUser() user: User): Promise<GetBookmarksOutput> {
    return this.bookmarksService.getBookmarks(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => GetBookmarkOutput)
  async getBookmark(
    @Args('input') getBookmarkInput: GetBookmarkInput,
    @CurrentUser() user: User,
  ): Promise<GetBookmarkOutput> {
    return this.bookmarksService.getBookmark(getBookmarkInput, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => UpdateBookmarkOutput)
  async updateBookmark(
    @Args('input') updateBookmarkInput: UpdateBookmarkInput,
    @CurrentUser() user: User,
  ): Promise<UpdateBookmarkOutput> {
    return this.bookmarksService.updateBookmark(updateBookmarkInput, user.id);
  }
}
