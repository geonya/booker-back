import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto'
import { GetUserInput, GetUserOutput } from './dtos/get-user.dto'
import { User } from './entities/user.entity'
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async createUser({
    email,
    password,
  }: CreateUserInput): Promise<CreateUserOutput> {
    try {
      const existingUser = await this.users.findOne({ where: { email } })
      if (existingUser) {
        return {
          ok: false,
          error: 'User Already Exists',
        }
      }
      const user = this.users.create({ email, password })
      await this.users.save(user)
      return {
        ok: true,
      }
    } catch (error) {
      console.error(error)
      return {
        ok: false,
        error: 'Create User Internal Error',
      }
    }
  }

  async getUser({ id }: GetUserInput): Promise<GetUserOutput> {
    try {
      const user = await this.users.findOneBy({ id })
      return {
        ok: true,
        user,
      }
    } catch (error) {
      console.error(error)
      return {
        ok: false,
        error: 'Get User Internal Error',
      }
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.users.findOne({ where: { email } })
    if (user) {
      const passwordIsValid = await user.checkPassword(password)
      if (!passwordIsValid) {
        throw new UnauthorizedException('비밀번호가 틀렸습니다.')
      }
      return user
    } else {
      return null
    }
  }
}
