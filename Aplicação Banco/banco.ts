import {Conta, ContaPoupanca} from './conta'
import {ValorInvalidoError, ContaInexistenteError, PoupancaInvalidaError} from './teste_erro'



export class Banco {
    contas: (Conta | ContaPoupanca)[];

    constructor() {
        this.contas = [];
    }

    /*
    --> Metodo inicial da questão 8
    consultar(numero_conta: string): Conta {
        const contaEncontrada = this.contas.find((conta) => conta.numero_conta === numero_conta);

        if (!contaEncontrada) {
            throw new ContaInexistenteError(`Conta com número ${numero_conta} não encontrada.`);
        }

        return contaEncontrada;
    }

    --> Metodo inicial da questão 8
    consultarPorIndice(indice: number): Conta {
        if (indice < 0 || indice >= this.contas.length) {
            throw new ContaInexistenteError('Índice de conta inválido.');
        }

        return this.contas[indice];
    }*/

    // Questão 13
    cadastrarConta(numero: string, saldo: number): void {
        if (saldo < 0) {
            throw new ValorInvalidoError('O saldo inicial não pode ser menor que zero.');
        }

        const conta = new Conta(numero, saldo);
        this.contas.push(conta);
    }

    cadastrarContaPoupanca(numero: string, saldo: number, taxaJuros: number): void {
        if (saldo < 0 || taxaJuros < 0) {
            throw new ValorInvalidoError('Saldo inicial ou taxa de juros não podem ser menores que zero.');
        }

        const poupanca = new ContaPoupanca(numero, saldo, taxaJuros);
        this.contas.push(poupanca);
    }
    
    consultar(numeroConta: string): Conta | ContaPoupanca {
        const contaEncontrada = this.contas.find((conta) => conta.numero_conta === numeroConta);

        if (!contaEncontrada) {
            throw new ContaInexistenteError(`Conta com número ${numeroConta} não encontrada.`);
        }

        return contaEncontrada;
    }

    private isContaPoupanca(conta: Conta | ContaPoupanca): conta is ContaPoupanca {
        return conta instanceof ContaPoupanca;
    }

    sacar(numeroConta: string, valor: number): void {
        const conta = this.consultar(numeroConta);

        if (this.isContaPoupanca(conta)) {
            conta.sacar(valor);
        } else {
            (conta as Conta).sacar(valor);
        }
    }

    depositar(numeroConta: string, valor: number): void {
        const conta = this.consultar(numeroConta);

        if (this.isContaPoupanca(conta)) {
            conta.depositar(valor);
        } else {
            (conta as Conta).depositar(valor);
        }
    }

    transferir(origem: string, destino: string, valor: number): void {
        const contaOrigem = this.consultar(origem);
        const contaDestino = this.consultar(destino);

        if (this.isContaPoupanca(contaOrigem)) {
            contaOrigem.transferir(contaDestino, valor);
        } else {
            (contaOrigem as Conta).transferir(contaDestino, valor);
        }
    }

    alterarSaldodaConta(numeroConta: string, novoSaldo: number): void {
        const conta = this.consultar(numeroConta);

        if (conta instanceof Conta) {
            conta.alterar(novoSaldo);
        } if (conta instanceof ContaPoupanca) {
            conta.alterarSaldo(novoSaldo);
        } else {
            throw new ContaInexistenteError(`Conta com número ${numeroConta} não encontrada.`);
        }
    }

    renderizarJuros(numeroConta: string): void {
        const conta = this.consultar(numeroConta);

        if (conta instanceof ContaPoupanca) {
            conta.renderJuros();
        } else {
            throw new PoupancaInvalidaError('Apenas contas poupança podem renderizar juros.');
        }
    }
    /* Este metodo está sendo criado para não haver a redundacia dos metodos da 
    class Conta, isso permite que a lógica do tratamento de exceções seja 
    centralizada no Banco e não se repita em cada método específico. 
    executarOperacao(numero_conta: string, operacao: (conta: Conta) => void): void {
        const contaEncontrada = this.consultar(numero_conta);

        try {
            operacao(contaEncontrada);
        } catch (error) {
            if (error instanceof AplicacaoError) {
                console.error(`Erro na operação: ${error.message}`);
            }
        }
    }*/
}

/*
Testando  Questão 5
--> Criar uma instância do banco
const meuBanco = new Banco();

--> Criar duas contas
const conta1 = new Conta('Joao',200); 
const conta2 = new Conta('Marcos',100); 

--> Adicionar as contas ao banco
meuBanco.adicionarConta(conta1);
meuBanco.adicionarConta(conta2);

--> Testar transferência com exceção
conta1.transferir(conta2, 300); // Erro

--> Explicação
A exceção lançada no método Conta.transferir() é capturada internamente dentro do bloco 
try-catch para a exceção não se propagar para métodos superiores.

A confiabilidade dessa implementação depende dos requisitos específicos do sistema. 
Se for para a exceção ser propagada até o nível de apliação, o bloco try-catch no 
método Conta.transferir() deve ser removido.
*/ 




/*
--> Testando a questão 8
const meuBanco = new Banco();

const contaA = new Conta(200);
const contaB = new Conta(100);

meuBanco.adicionarConta(contaA);
meuBanco.adicionarConta(contaB);

try {
    const contaConsultada = meuBanco.consultar(123); // Número de conta fictício
    console.log('Conta encontrada:', contaConsultada);
} catch (error) {
    if (error instanceof ContaInexistenteError) {
        console.error(`Erro ao consultar conta: ${error.message}`);
    }
}

try {
    const contaConsultadaPorIndice = meuBanco.consultarPorIndice(2); // Índice inválido
    console.log('Conta encontrada por índice:', contaConsultadaPorIndice);
} catch (error) {
    if (error instanceof ContaInexistenteError) {
        console.error(`Erro ao consultar conta por índice: ${error.message}`);
    }
}
*/