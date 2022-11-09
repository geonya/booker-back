import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetLinksInput, GetLinksOutput } from './dtos/get-links.dto';
import { Link } from './entities/link.entity';
import { getLinkPreview } from 'link-preview-js';
import { CreateLinkInput, CreateLinkOutput } from './dtos/create-link.dto';
import { Bookmark } from '../bookmarks/entities/bookmark.entity';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private readonly links: Repository<Link>,
    @InjectRepository(Bookmark)
    private readonly bookmarks: Repository<Bookmark>,
  ) {}

  async createLink({
    url,
    bookmarkId,
  }: CreateLinkInput): Promise<CreateLinkOutput> {
    try {
      const metaData = await getLinkPreview(url);
      const link = this.links.create({ ...metaData });
      const bookmark = await this.bookmarks.findOne({
        where: { id: bookmarkId },
      });
      link.bookmark = bookmark;
      await this.links.save(link);
      return {
        ok: true,
        link,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: 'createLink Error',
      };
    }
  }

  async getLinks(
    { bookmarkId }: GetLinksInput,
    userId: number,
  ): Promise<GetLinksOutput> {
    try {
      const links = await this.links.find({
        where: {
          bookmark: {
            id: bookmarkId,
          },
        },
      });
      return {
        ok: true,
        links,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
      };
    }
  }
}
