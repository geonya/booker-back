import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { Column, Entity } from 'typeorm'
import { CoreEntity } from '../../common/core.entity'

@InputType('BookmarkInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Bookmark extends CoreEntity {
  @Column()
  @Field((type) => String)
  name: string

  @Column()
  @Field((type) => Int)
  userId: number

  @Column('text', { array: true })
  @Field((type) => [String], { nullable: true })
  links?: string[]
}
