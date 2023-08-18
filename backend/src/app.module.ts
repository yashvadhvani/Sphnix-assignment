import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import Web3 from 'web3';
import { MAIN_NETWORK_URL } from './constants';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: `.env` })],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'WEB3',
      useValue: new Web3(
        new Web3.providers.HttpProvider(
          `${MAIN_NETWORK_URL}${process.env.INFURA_API_KEY}`,
        ),
      ),
    },
  ],
})
export class AppModule {}
