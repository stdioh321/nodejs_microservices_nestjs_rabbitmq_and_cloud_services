import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('temp-topic')
  async consume(data: Record<string, unknown>) {
    console.log(data);
    return 'ok';
  }
}
