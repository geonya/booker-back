import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { CoreEntity } from '../../common/core.entity';
import { Link } from '../../links/entities/link.entity';

@InputType('BookmarkInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Bookmark extends CoreEntity {
  @Column()
  @Field((type) => String)
  name: string;

  @Column()
  @Field((type) => Int)
  userId: number;

  @Field((type) => [Link], { nullable: true })
  @OneToMany((type) => Link, (link) => link.bookmark, {
    onDelete: 'SET NULL',
    eager: true,
  })
  links?: Link[];
}
