import { Module } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { BookmarksResolver } from './bookmarks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from './entities/bookmark.entity';
import { LinksService } from '../links/links.service';
import { Link } from '../links/entities/link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark, Link])],
  providers: [BookmarksService, BookmarksResolver, LinksService],
})
export class BookmarksModule {}
