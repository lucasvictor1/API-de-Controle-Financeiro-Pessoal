import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarTransacaoDto } from './dto/criar-transacao.dto';
import {
  Transacao,
  TransacaoDocument,
  TipoTransacao,
} from './schemas/transacao.schema';

@Injectable()
export class TransacoesService {
  constructor(
    @InjectModel(Transacao.name)
    private readonly transacaoModel: Model<TransacaoDocument>,
  ) {}

  async criar(dados: CriarTransacaoDto) {
    const transacao = new this.transacaoModel(dados);
    return transacao.save();
  }

  async listarTodasComMetricas() {
    const historico = await this.transacaoModel
      .find()
      .select('-__v')
      .lean()
      .exec();

    const metricas = historico.reduce(
      (totais, transacao) => {
        const valor = Number(transacao.valor);

        if (transacao.tipo === TipoTransacao.RECEITA) {
          totais.saldoTotal += valor;
        }

        if (transacao.tipo === TipoTransacao.DESPESA) {
          totais.saldoTotal -= valor;
          totais.totalDespesas += valor;

          if (transacao.consumoConsciente === false) {
            totais.totalGastoImpulso += valor;
          }
        }

        return totais;
      },
      {
        saldoTotal: 0,
        totalDespesas: 0,
        totalGastoImpulso: 0,
      },
    );

    return { historico, metricas };
  }
}
