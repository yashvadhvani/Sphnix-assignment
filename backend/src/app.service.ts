import { Inject, Injectable } from '@nestjs/common';
import Web3, { Contract } from 'web3';
import { RegisteredSubscription } from 'web3/lib/commonjs/eth.exports';
import {
  ETHERSCAN_URL,
  TRANSACTION_PER_PAGE,
  USDC_MAIN_NETWORK_ADDRESS,
} from './constants';
import * as usdcAbi from './abis/USDC.json';
import axios from 'axios';
import { Transaction } from './types/transaction.type';

@Injectable()
export class AppService {
  UsdcContract: null | Contract<typeof usdcAbi> = null;
  web3: Web3<RegisteredSubscription> | null = null;
  constructor(
    @Inject('WEB3') private readonly web3Param: Web3<RegisteredSubscription>,
  ) {
    this.web3 = web3Param;
    this.UsdcContract = new web3Param.eth.Contract(
      usdcAbi,
      USDC_MAIN_NETWORK_ADDRESS,
    );
  }
  async getBalance(address: string): Promise<string> {
    try {
      const balance = this.web3.utils.fromWei(
        await (this.UsdcContract.methods as any).balanceOf(address).call(),
        'mwei', // 6 Digit Decimals
      );
      return balance.toString();
    } catch (error) {
      throw new Error('Failed to fetch Balancee.');
    }
  }

  async getTransactions(
    address: string,
    page: number = 1,
  ): Promise<Transaction[]> {
    try {
      const apiUrl = `${ETHERSCAN_URL}?module=account&action=txlist&address=${address}&page=${page}&offset=${TRANSACTION_PER_PAGE}&sort=desc&apikey=${process.env.ETHERSCAN_API_KEY}`;
      const response = await axios.get(apiUrl);

      if (response.data.status === '1') {
        return response.data.result;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error('Failed to fetch transactions from etherscan API.');
    }

    // const transactionsPerPage = 10; // Number of transactions to retrieve per page
    // const latestBlockNumber = parseInt(
    //   (await this.web3.eth.getBlockNumber()).toString(),
    // );
    // const startBlock = lastScannedBlock;
    // const transactions = [];

    // for (let i = startBlock; i <= latestBlockNumber; i++) {
    //   const block: any = await this.web3.eth.getBlock(i, true);

    //   if (block && block.transactions && block.transactions.length > 0) {
    //     for (const tx of block.transactions) {
    //       if (
    //         tx.from.toLowerCase() === address.toLowerCase() ||
    //         (tx.to && tx.to.toLowerCase() === address.toLowerCase())
    //       ) {
    //         transactions.push({
    //           hash: tx.hash,
    //           from: tx.from,
    //           to: tx.to,
    //           value: this.web3.utils.fromWei(tx.value, 'ether') + ' ETH',
    //           blockNumber: tx.blockNumber,
    //         });

    //         if (transactions.length >= transactionsPerPage * page) {
    //           return transactions.slice(
    //             (page - 1) * transactionsPerPage,
    //             page * transactionsPerPage,
    //           );
    //         }
    //       }
    //     }
    //   }
    // }

    // return transactions;
  }
}
