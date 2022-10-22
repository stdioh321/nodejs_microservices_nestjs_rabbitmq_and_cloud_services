import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RedisContext,
  RmqContext,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('rabbit-emit')
  // async consume(data: Record<string, unknown>) {
  async consumeRabbitEmit(@Payload() payload: any, @Ctx() context: RmqContext) {
    console.log({ payload });

    // throw new RpcException('Tudo ERRADO');

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
    return 'rabbit-emit_' + new Date().toISOString();
  }
  @MessagePattern('rabbit-send')
  consumeRabbitSend(@Payload() payload: any, @Ctx() context: RmqContext) {
    console.log({ payload });

    // throw new RpcException('Tudo ERRADO');

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
    return 'rabbit-send_' + new Date().toISOString();
  }

  @EventPattern('redis-emit')
  consumeRedisEmit(@Payload() payload: any, @Ctx() context: RedisContext) {
    console.log({ payload });

    return 'redis-emit_' + new Date().toISOString();
  }

  @MessagePattern('redis-send')
  consumeRedisSend(@Payload() payload: any, @Ctx() context: RedisContext) {
    console.log({ payload });

    return 'redis-send_' + new Date().toISOString();
  }
}
