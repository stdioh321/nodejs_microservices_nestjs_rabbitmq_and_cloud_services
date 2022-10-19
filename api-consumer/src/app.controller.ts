import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('temp1')
  // async consume(data: Record<string, unknown>) {
  async consume(@Payload() data: any) {
    console.log(data);
    const doProm = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 3000);
      });
    // throw new RpcException('Tudo ERRADO');
    await doProm();
    return 'okkkkk_' + new Date().toISOString();
  }
  @MessagePattern('temp2')
  temp2(@Payload() data: any) {
    console.log("temp2", data);

    return 'okkkkkkkkkkkkkkkkkk';
  }
}
