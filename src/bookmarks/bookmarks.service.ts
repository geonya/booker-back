import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  UpdateBookmarkInput,
  UpdateBookmarkOutput,
} from './dtos/update-bookmark.dto';
import {
  CreateBookmarkInput,
  CreateBookmarkOutput,
} from './dtos/create-bookmark.dto';
import { GetBookmarkInput, GetBookmarkOutput } from './dtos/get-bookmark.dto';
import { GetBookmarksOutput } from './dtos/get-bookmarks.dto';
import { Bookmark } from './entities/bookmark.entity';
import { LinksService } from '../links/links.service';

@Injectable()
export class BookmarksService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarks: Repository<Bookmark>,

    private readonly linksService: LinksService,
  ) {}

  async createBookmark(
    createBookmarkInput: CreateBookmarkInput,
    userId: number,
  ): Promise<CreateBookmarkOutput> {
    try {
      const bookmark = this.bookmarks.create({
        ...createBookmarkInput,
        links: [],
        userId,
      });
      await this.bookmarks.save(bookmark);
      return {
        ok: true,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
      };
    }
  }

  async getBookmarks(userId: number): Promise<GetBookmarksOutput> {
    try {
      const bookmarks = await this.bookmarks.find({
        where: {
          userId,
        },
      });
      return {
        ok: true,
        bookmarks,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: 'Get Bookmarks Internal Error',
      };
    }
  }

  async getBookmark(
    { id }: GetBookmarkInput,
    userId: number,
  ): Promise<GetBookmarkOutput> {
    try {
      const bookmark = await this.bookmarks.findOne({
        where: {
          id,
          userId,
        },
      });

      if (!bookmark) {
        return {
          ok: false,
          error: 'bookmark not found',
        };
      }
      return {
        ok: true,
        bookmark,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: 'Get Bookmark Internal Error',
      };
    }
  }

  async updateBookmark(
    { id, url }: UpdateBookmarkInput,
    userId: number,
  ): Promise<UpdateBookmarkOutput> {
    try {
      const bookmark = await this.bookmarks.findOne({ where: { id, userId } });
      if (!bookmark) {
        return {
          ok: false,
          error: 'Bookmark Not Found',
        };
      }
      const { link } = await this.linksService.createLink({
        url,
        bookmarkId: bookmark.id,
      });
      bookmark.links = [...bookmark.links, link];
      await this.bookmarks.save(bookmark);
      return {
        ok: true,
        bookmark,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: 'Add Link Internal Error',
      };
    }
  }
}
