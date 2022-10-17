import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [ConfigModule.forRoot({}), JogadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
