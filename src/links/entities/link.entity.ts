import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Bookmark } from '../../bookmarks/entities/bookmark.entity';
import { CoreEntity } from '../../common/core.entity';

@Entity()
@ObjectType()
@InputType('LinkInput', { isAbstract: true })
export class Link extends CoreEntity {
  @Column()
  @Field((type) => String)
  url: string;

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  title?: string;

  @Column({ nullable: true })
  @Field((type) => String, { nullable: true })
  siteName?: string;

  @Column('text', { array: true, nullable: true })
  @Field((type) => [String], { nullable: true })
  images?: string[];

  @ManyToOne((type) => Bookmark, (bookmark) => bookmark.links, {
    onDelete: 'CASCADE',
  })
  bookmark: Bookmark;

  @Field((type) => Int)
  @RelationId((link: Link) => link.bookmark)
  bookmarkId: number;
}
