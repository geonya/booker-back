import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto'
import { GetUserInput, GetUserOutput } from './dtos/get-user.dto'
import { User } from './entities/user.entity'

import { UsersService } from './users.service'

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation((returns) => CreateUserOutput)
  async createUser(
    @Args('input') createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.usersService.createUser(createUserInput)
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => GetUserOutput)
  async getUser(
    @Args('input') getUserInput: GetUserInput,
  ): Promise<GetUserOutput> {
    return this.usersService.getUser(getUserInput)
  }
}
