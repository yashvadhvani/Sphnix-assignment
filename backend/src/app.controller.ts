import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Transaction } from './types/transaction.type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('balance/:address')
  async getBalance(
    @Param('address') address: string,
  ): Promise<{ balance: string }> {
    const balance = await this.appService.getBalance(address);
    return { balance };
  }

  @Get('transactions/:address')
  async getTransactions(
    @Param('address') address: string,
    @Query('page') page: number = 1,
  ): Promise<Transaction[]> {
    const transactions = await this.appService.getTransactions(address, page);
    return transactions;
  }
  @Get('usdc/transactions/:address')
  async listUSDCTransfers(@Param('address') address: string) {
    const usdcTransfers = await this.appService.traceUSDCTransfers(address);
    return { usdcTransfers };
  }
}
