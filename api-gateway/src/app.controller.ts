import { Controller, Get, Logger } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
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
    },
  })
  private clientProxy: ClientProxy;

  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    const randomValue: number = Math.round(Math.random() * 1000);
    const obs = await this.clientProxy.send('temp-topic', {
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
    return this.appService.getHello();
  }
}
