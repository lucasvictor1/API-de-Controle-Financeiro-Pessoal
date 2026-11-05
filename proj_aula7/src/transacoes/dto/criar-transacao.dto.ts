import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { TipoTransacao } from '../schemas/transacao.schema';

export class CriarTransacaoDto {
  @IsString()
  @MinLength(1)
  descricao: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  valor: number;

  @IsEnum(TipoTransacao)
  tipo: TipoTransacao;

  @IsString()
  @MinLength(1)
  categoria: string;

  @IsBoolean()
  consumoConsciente: boolean;
}
