import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class CriarJogadorDto {
  @IsEmail()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.toLowerCase() : value,
  )
  email: string;
}
