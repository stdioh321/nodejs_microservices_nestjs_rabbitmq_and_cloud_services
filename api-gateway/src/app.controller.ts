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

  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    const randomValue: number = Math.round(Math.random() * 1000);
    const obs = await this.clientProxy.emit('temp1', {
      a: randomValue,
      b: `abc_${randomValue}`,
    });
    lastValueFrom(obs)
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => {
        console.log({ err });
      });
    return 'okkkk';
  }
  @Get('/temp2')
  async temp2() {
    const randomValue: number = Math.round(Math.random() * 1000);
    const obs = await this.clientProxy.send('temp2', {
      a: randomValue,
      b: `abc_${randomValue}`,
    });
    lastValueFrom(obs)
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => {
        console.log({ err });
      });
    return 'temp2';
  }
}
