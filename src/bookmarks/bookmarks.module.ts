import { Module } from '@nestjs/common'
import { BookmarksService } from './bookmarks.service'
import { BookmarksResolver } from './bookmarks.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Bookmark } from './entities/bookmark.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark])],
  providers: [BookmarksService, BookmarksResolver],
})
export class BookmarksModule {}
