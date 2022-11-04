import { InternalServerErrorException } from '@nestjs/common'
import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { BeforeInsert, Column, Entity } from 'typeorm'
import { CoreEntity } from '../../common/core.entity'
import * as bcrypt from 'bcrypt'

@InputType('UserInput', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column({ unique: true })
  @Field((type) => String)
  email: string

  @Column()
  @Field((type) => String)
  password: string

  async checkPassword(password: string): Promise<boolean> {
    try {
      return bcrypt.compare(password, this.password)
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException('Compare Password Error')
    }
  }

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10)
      } catch (error) {
        console.error(error)
        throw new InternalServerErrorException('Hash Password Error')
      }
    }
  }
}
