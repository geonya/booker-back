import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from '../bookmarks/entities/bookmark.entity';
import { Link } from './entities/link.entity';
import { LinksResolver } from './links.resolver';
import { LinksService } from './links.service';

@Module({
  imports: [TypeOrmModule.forFeature([Link, Bookmark])],
  providers: [LinksResolver, LinksService],
  exports: [LinksService],
})
export class LinksModule {}
