import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/current-user.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { User } from '../users/entities/user.entity';
import { GetLinksInput, GetLinksOutput } from './dtos/get-links.dto';
import { Link } from './entities/link.entity';
import { LinksService } from './links.service';

@Resolver((of) => Link)
export class LinksResolver {
  constructor(private readonly linksService: LinksService) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => GetLinksOutput)
  async getLinks(
    @Args('input') getLinksInput: GetLinksInput,
    @CurrentUser() user: User,
  ): Promise<GetLinksOutput> {
    return this.linksService.getLinks(getLinksInput, user.id);
  }
}
