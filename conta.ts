import {AplicacaoError, SaldoInsuficienteError, 
    ValorInvalidoError, PoupancaInvalidaError} from './teste_erro'

export class Conta {
    private _numero_conta: string;
    saldo: number;


// Constructor inicial
    constructor(_numero_conta: string, saldo: number) {
        this._numero_conta = _numero_conta;
        this.saldo = saldo;
    }
    

    /*
    -->Questão 10
    constructor(_numero_conta: string, saldo: number) {
        this._numero_conta = _numero_conta;
        this.saldo = saldo; // Inicializa com saldo zero
    
        try {
          this.depositar(saldo);
        } catch (error) {
          if (error instanceof ValorInvalidoError) {
            console.error(`Erro ao criar conta: ${error.message}`);
          }
        }
    }*/

    get numero_conta(): string{
        return this._numero_conta;
    }

    //Para ser usando em outras class retira o private


    /* 
    --> Isso mantém o encapsulamento e permite a modificação do saldo usando 
        uma sintaxe semelhante à atribuição direta de propriedades.
    
    private set saldo(valor: number) {
        this._saldo = valor;
    }

    */
    

    /* --> Constructor da question 6
    constructor(numero_conta: string, saldoInicial: number) {
        if (saldoInicial < 0) {
            throw new Error('Saldo inicial não pode ser menor que zero.');
        }
        this._numero_conta = numero_conta;
        this._saldo = saldoInicial;
    }
    */

    alterar(novoSaldo: number): void {
        this.validarValor(novoSaldo);
        this.saldo = novoSaldo;
    }
    
    depositar(valor: number): void {
        if (valor <= 0) {
            throw new ValorInvalidoError('O valor do depósito deve ser maior que zero.');
        }
      
          this.saldo += valor;
          console.log(`Depósito de ${valor} realizado. Novo saldo: ${this.saldo}`);
    }

    sacar(valor: number): void {
        this.validarValor(valor);
        this.validarSaldoSuficiente(valor);
        if (valor > 0 && valor <= this.saldo) {
            this.saldo -= valor;
            console.log(`Saque de ${valor} realizado. Novo saldo: ${this.saldo}`);
        }
    }

    transferir(destinatario: Conta, valor: number): void {
        this.sacar(valor);
        destinatario.depositar(valor);
        console.log(`Transferência de ${valor} realizada de uma conta para outra.`);
    }

    consultarSaldo(): void {
        console.log(`Saldo atual da conta de ${this.numero_conta}: ${this.saldo}`);
    }
    
    //Questão 11
    private validarValor(valor: number): void {
        if (valor <= 0) {
            throw new AplicacaoError('O valor deve ser maior que zero.');
        }
    }

    private validarSaldoSuficiente(valor: number): void {
        if (valor > this.saldo) {
            throw new SaldoInsuficienteError('Saldo insuficiente para realizar o saque.');
        }
    }

    //render juros que verfica se a conta é poupança
    renderJuros(): void {
        throw new PoupancaInvalidaError('A conta não é uma Conta Poupança. Operação desconsiderada.');
    }

    /*
    --> Metodo da questão 6 
    depositar(valor: number): void {
        if (valor < 0) {
            throw new Error('O valor de depósito não pode ser menor que zero.');
        }

        this._saldo += valor;
        console.log(`Depósito de ${valor} realizado. Novo saldo: ${this._saldo}`);
    }

    --> Metodo da questão 6
    sacar(valor: number): void {
        if (valor < 0) {
            throw new Error('O valor de saque não pode ser menor que zero.');
        }

        if (valor > this._saldo) {
            throw new Error('Saldo insuficiente para realizar o saque.');
        }

        this._saldo -= valor;
        console.log(`Saque de ${valor} realizado. Novo saldo: ${this._saldo}`);
    }
    */

    /*
    --> Metodo da questão 7
    transferir(destinatario: Conta, valor: number): void {
        if (destinatario === this) {
            throw new AplicacaoError('Não é possível transferir para a mesma conta.');
        }

        if (valor < 0) {
            throw new AplicacaoError('O valor de transferência não pode ser menor que zero.');
        }

        try {
            this.sacar(valor);
            destinatario.depositar(valor);
            console.log(`Transferência de ${valor} realizada de uma conta para outra.`);
        } catch (error) {
            if (error instanceof AplicacaoError) {
                console.error(`Falha na transferência: ${error.message}`);
                throw error; // Re-lança a exceção para propagar para níveis superiores, se desejado
            }
        }
    }
    */

    /*
    --> Metodo transferir incialmente da questão 4
    transferir(destinatario: Conta, valor: number): void {
        try {
            this.sacar(valor);
            destinatario.depositar(valor);
            console.log(`Transferência de ${valor} realizada de uma conta para outra.`);
        } catch (error) {
            console.error(`Falha na transferência: ${error.message}`);
        }

        
        --> Criar duas Conta
        const contaA = new Conta(200); // Saldo inicial de 200
        const contaB = new Conta(100); // Saldo inicial de 100

        --> Testar transferência com contaA sem saldo suficiente
        contaA.transferir(contaB, 300); --> Erro

        --> Explicação
        ContaA não possui saldo suficiente para transferir 300 
        para contaB. Portanto, a transferência deve falhar e 
        imprimir uma mensagem de erro.
        
    }
    */
}

export class ContaPoupanca extends Conta {
    private _taxaJuros: number;

    constructor(numero: string, saldo: number, taxaJuros: number) {
        super(numero, saldo);
        this._taxaJuros = taxaJuros;
    }

    get taxaJuros(): number{
        return this._taxaJuros;
    }

    renderJuros(): void {
        try {
            this.saldo += this.saldo * this.taxaJuros;
            console.log(`Juros aplicados. Novo saldo: ${this.saldo}`);
        } catch (error) {
            console.error(`Erro ao renderizar juros`);
            throw new PoupancaInvalidaError('Erro ao renderizar juros na conta poupança.');
        }
    }

    consultarSaldo(): number {
        return this.saldo;
    }

    sacar(valor: number): void {
        try {
            if (valor <= 0) {
                throw new ValorInvalidoError('O valor de saque deve ser maior que zero.');
            }

            if (valor > this.saldo) {
                throw new SaldoInsuficienteError('Saldo insuficiente para realizar o saque.');
            }

            this.saldo -= valor;
            console.log(`Saque de ${valor} realizado. Novo saldo: ${this.saldo}`);
        } catch (error) {
            console.error(`Erro ao sacar`);
            throw error;
        }
    }

    depositar(valor: number): void {
        try {
            if (valor <= 0) {
                throw new ValorInvalidoError('O valor de depósito deve ser maior que zero.');
            }

            this.saldo += valor;
            console.log(`Depósito de ${valor} realizado. Novo saldo: ${this.saldo}`);
        } catch (error) {
            console.error(`Erro ao depositar`);
            throw error;
        }
    }

    alterarSaldo(novoSaldo: number): void {
        try {
            if (novoSaldo < 0) {
                throw new ValorInvalidoError('O novo saldo não pode ser menor que zero.');
            }

            this.saldo = novoSaldo;
            console.log(`Saldo alterado para ${novoSaldo}.`);
        } catch (error) {
            console.error(`Erro ao alterar saldo`);
            throw error;
        }
    }
}







/*
--> Testando a questão 7
const contaA = new Conta(200); // Saldo inicial de 200
const contaB = new Conta(100); // Saldo inicial de 100

try {
    contaA.transferir(contaA, 50); // Tentativa de transferir para a mesma conta
} catch (error) {
    if (error instanceof AplicacaoError) {
        console.error(`Falha na transferência: ${error.message}`);
    }
}

try {
    contaA.transferir(contaB, -50); // Tentativa de transferir com valor negativo
} catch (error) {
    if (error instanceof AplicacaoError) {
        console.error(`Falha na transferência: ${error.message}`);
    }
}
*/


/*
--> Testando a questão 10
const minhaConta = new Conta('123-456', 100);

try {
  minhaConta.depositar(0); // Deve lançar a exceção ValorInvalidoError
} catch (error) {
  if (error instanceof ValorInvalidoError) {
    console.error(`Erro ao depositar: ${error.message}`);
  }
}

minhaConta.sacar(50); // Deve imprimir o saque normalmente
*/


/*
--> Testando a questão 10
const meuBanco = new Banco();

const contaA = new Conta('111-1', 40);
const contaB = new ContaPoupanca('222-2', 10.65, 0.5);

meuBanco.cadastrarConta(contaA);
meuBanco.cadastrarConta(contaB);

try {
  meuBanco.renderJuros('111-1'); // Deve lançar a exceção PoupancaInvalidaError
} catch (error) {
  if (error instanceof PoupancaInvalidaError) {
    console.error(`Erro ao renderizar juros: ${error.message}`);
  }
}

meuBanco.renderJuros('222-2'); // Deve imprimir a renderização de juros normalmente
*/