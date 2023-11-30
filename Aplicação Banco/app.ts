import prompt from 'prompt-sync';
const input = prompt();


import {EntradaInvalidaError, NumeroContaInvalidoError, 
        ValorInvalidoEntradaError} from './teste_erro'
import {Banco} from './banco';


class App {
    meuBanco: Banco;
    
    constructor(){
        this.meuBanco = new Banco();
    }

    ExibirMenu(): void {
        let opcao: number;
        
        while (true) {
            console.log('\nMenu');
            console.log('1. Cadastrar Conta');
            console.log('2. Consultar Conta');
            console.log('3. Sacar');
            console.log('4. Depositar');
            console.log('5. Transferir');
            console.log('6. Renderizar Juros (Conta Poupança)');
            console.log('7. Alterar o Saldo');
            console.log('8. Sair');
        
            opcao = parseInt(input('Escolha uma opção: '));
        
            try {
            if (isNaN(opcao)) {
                throw new EntradaInvalidaError('Opção inválida. Digite um número.');
            }
        
            if (opcao < 1 || opcao > 8) {
                throw new EntradaInvalidaError('Opção inválida. Digite um número entre 1 e 8.');
            }
            
            if (opcao === 1) {
                const numeroConta = input('Digite o número da conta: ');
                const saldoInicial = Number(input('Digite o saldo inicial: '));
                if (!numeroConta.trim()) {
                    throw new NumeroContaInvalidoError('Número da conta não pode ser vazio.');
                }
        
                if (isNaN(saldoInicial) || saldoInicial < 0) {
                    throw new ValorInvalidoEntradaError('Saldo inicial deve ser um número positivo.');
                }
                const tipoConta = input('Digite o tipo da conta (C para Conta ou P para Poupança): ') || '';
                if (tipoConta.toUpperCase() === 'C') {
                    this.meuBanco.cadastrarConta(numeroConta, saldoInicial);
                }else if(tipoConta.toUpperCase() === 'P'){
                    const taxaJuros = Number(input('Digite a taxa de juros da poupança: ') || '0');
                    this.meuBanco.cadastrarContaPoupanca(numeroConta, saldoInicial, taxaJuros);
                }else{
                    console.log('Tipo da conta não informada')
                }
                
            } else if (opcao === 2) {
                const numeroConsulta = input('Digite o número da conta para consultar: ') || '';
                const contaConsultada = this.meuBanco.consultar(numeroConsulta);
                console.log(`Conta encontrada: Número ${contaConsultada.numero_conta}, Saldo ${contaConsultada.saldo}`);
        
            } else if (opcao === 3) {

                const numeroConsulta = input('Digite o número da conta: ');
                const contaConsultada = this.meuBanco.consultar(numeroConsulta);
                console.log(`Saldo Atual ${contaConsultada.saldo}`);
                const valor = Number(input('Digite o valor que deseja sacar:'))
                this.meuBanco.sacar(numeroConsulta,valor)
                console.log(`Novo Saldo ${contaConsultada.saldo}`);
            
            } else if (opcao === 4) {
                const numeroConsulta = input('Digite o número da conta: ');

                const contaConsultada = this.meuBanco.consultar(numeroConsulta);
                console.log(`Saldo Atual ${contaConsultada.saldo}`);
                const valor = Number(input('Digite o valor que deseja depositar:'))
                this.meuBanco.depositar(numeroConsulta,valor)
                console.log(`Novo Saldo ${contaConsultada.saldo}`);

            } else if (opcao === 5) {
                // Implemente a transferência aqui
                const numeroConsulta = input('Digite o número da conta: ');
                console.log('Digite o número da conta para onde deseja realizar a transferir');
                const numeroTransfere = input('--> ')

                const contaConsultada = this.meuBanco.consultar(numeroConsulta);
                console.log(`Saldo Atual da Conta que irá relaziar a transferência 
                --> ${contaConsultada.saldo}`);
                const valor = Number(input('Digite o valor que deseja transferir:'))
                
                this.meuBanco.transferir(numeroConsulta, numeroTransfere, valor)
                console.log(`Novo Saldo da Conta de transferência ${contaConsultada.saldo}`);
            

            } else if (opcao === 6) {
                const numeroContaPoupanca = input('Digite o número da conta poupança para renderizar juros: ') || '';
                this.meuBanco.renderizarJuros(numeroContaPoupanca);    

           } else if (opcao === 7) {
                const numeroConsulta = input('Digite o número da conta: ');
        
                const contaConsultada = this.meuBanco.consultar(numeroConsulta);
                console.log(`Saldo Atual ${contaConsultada.saldo}`);
                const valor = Number(input('Digite o valor que será o novo saldo:'))
                this.meuBanco.alterarSaldodaConta(numeroConsulta,valor)
                console.log(`Novo Saldo ${contaConsultada.saldo}`);


           } else if (opcao === 8) {
                console.log('Saindo do programa.');
                break;

            } else {
                console.log('Opção inválida. Tente novamente.');

            } 
            } catch (error) {
                if (error instanceof EntradaInvalidaError || error instanceof NumeroContaInvalidoError || error instanceof ValorInvalidoEntradaError) {
                    console.error(`Erro na entrada de dados: ${error.message}`);
                } else {
                    console.error(`Erro não tratado`);
                }
            }
        }  
        
          
    }   
}    


const app = new App();
app.ExibirMenu();