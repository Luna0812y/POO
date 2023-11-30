export class AplicacaoError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ContaInexistenteError extends AplicacaoError {
    constructor(message: string = 'Conta inexistente.') {
        super(message);
    }
}

export class SaldoInsuficienteError extends AplicacaoError {
    constructor(message: string = 'Saldo insuficiente.') {
        super(message);
    }
}

export class ValorInvalidoError extends AplicacaoError {
    constructor(mensagem: string) {
      super(mensagem);
      this.name = 'Valor Invalido';
    }
}

export class PoupancaInvalidaError extends AplicacaoError {
    constructor(mensagem: string) {
      super(mensagem);
      this.name = 'PoupancaInvalidaError';
    }
}

export class EntradaInvalidaError extends AplicacaoError {
    constructor(mensagem: string = 'Entrada inválida.') {
        super(mensagem);
    }
}

export class NumeroContaInvalidoError extends EntradaInvalidaError {
    constructor(mensagem: string = 'Número da conta inválido.') {
        super(mensagem);
    }
}

export class ValorInvalidoEntradaError extends EntradaInvalidaError {
    constructor(mensagem: string = 'Valor inválido.') {
        super(mensagem);
    }
}