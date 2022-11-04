import { Injectable } from '@nestjs/common'
import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { UsersService } from '../../users/users.service'
import { User } from '../../users/entities/user.entity'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'email' })
  }
  async validate(email: string, password: string): Promise<User> {
    return this.usersService.validateUser(email, password)
  }
}
