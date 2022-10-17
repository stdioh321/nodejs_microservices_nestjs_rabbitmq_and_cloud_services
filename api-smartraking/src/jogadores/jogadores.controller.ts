import { Body, Controller, Get, Post } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criarJogador.dto';

@Controller('jogadores')
export class JogadoresController {
  @Post()
  criarAtualizarJogador(@Body() criarAtualizarJogador: CriarJogadorDto) {
    const { email } = criarAtualizarJogador;
    return email;
  }
}
