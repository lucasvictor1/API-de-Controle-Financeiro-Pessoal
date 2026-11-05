import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransacaoDocument = HydratedDocument<Transacao>;

export enum TipoTransacao {
  RECEITA = 'receita',
  DESPESA = 'despesa',
}

@Schema({ timestamps: true, versionKey: false })
export class Transacao {
  @Prop({ required: true, trim: true })
  descricao: string;

  @Prop({ required: true, min: 0.01 })
  valor: number;

  @Prop({
    required: true,
    enum: Object.values(TipoTransacao),
  })
  tipo: TipoTransacao;

  @Prop({ required: true, trim: true })
  categoria: string;

  @Prop({ required: true, type: Boolean, default: true })
  consumoConsciente: boolean;
}

export const TransacaoSchema = SchemaFactory.createForClass(Transacao);
