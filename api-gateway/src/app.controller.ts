import { Controller, Get, Logger, Res } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { Response } from 'express';
import { lastValueFrom } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private logger = new Logger(AppController.name);

  @Client({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'temp-queue',
      noAck: false,
      persistent: true,
    },
  })
  private clientProxy: ClientProxy;

  @Client({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  })
  private clientProxyRedis: ClientProxy;

  constructor(private readonly appService: AppService) {}

  @Get('rabbit-emit')
  async rebbitEmmit() {
    const randomValue: number = Math.round(Math.random() * 1000);
    const obs = this.clientProxy.emit('rabbit-emit', {
      random: randomValue,
    });
    lastValueFrom(obs)
      .then((resultRabbitEmit) => {
        console.log({ res: resultRabbitEmit });
      })
      .catch((err) => {
        console.log({ err });
      });
    return 'rabbit-emit';
  }
  @Get('rabbit-send')
  async rabbitSend() {
    const randomValue: number = Math.round(Math.random() * 1000);
    const obs = this.clientProxy.send('rabbit-send', {
      random: randomValue,
    });
    // lastValueFrom(obs)
    //   .then((resultRabbitSend) => {
    //     console.log({ res: resultRabbitSend });
    //   })
    //   .catch((err) => {
    //     console.log({ err });
    //   });
    try {
      const result = await lastValueFrom(obs);
      console.log({ result });
    } catch (err) {
      console.log({ err });
    }

    return 'rabbit-send';
  }
  @Get('redis-emit')
  async redisEmit() {
    const randomValue: number = Math.round(Math.random() * 1000);
    const obs = this.clientProxyRedis.emit('redis-emit', {
      random: randomValue,
    });
    lastValueFrom(obs)
      .then((resultRedisEmit) => {
        console.log({ resultRedisEmit });
      })
      .catch((err) => {
        console.log({ err });
      });
    return 'redis-emit';
  }
  @Get('redis-send')
  async redisSend() {
    const randomValue: number = Math.round(Math.random() * 1000);
    const obs = this.clientProxyRedis.send('redis-send', {
      random: randomValue,
    });
    lastValueFrom(obs)
      .then((resultRedisEmit) => {
        console.log({ resultRedisEmit });
      })
      .catch((err) => {
        console.log({ err });
      });
    return 'redis-send';
  }
}
