import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>) {
  }

  async create(createAccountDto: CreateAccountDto) {
    const account = this.accountsRepository.create(createAccountDto);

    return await this.accountsRepository.save(account);
  }

  async findAll() {
    return await this.accountsRepository.find();
  }

  async findOne(id: number) {
    return await this.accountsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const account = await this.findOne(id);
    if (!account) {
      throw new NotFoundException();
    }

    Object.assign(account, updateAccountDto);

    return await this.accountsRepository.save(account);
  }

  async remove(id: number) {
    const account = await this.findOne(id);
    if (!account) {
      throw new NotFoundException();
    }

    return await this.accountsRepository.remove(account);
  }
}