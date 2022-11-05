import { Module } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { BookmarksResolver } from './bookmarks.resolver';

@Module({
  providers: [BookmarksService, BookmarksResolver]
})
export class BookmarksModule {}
