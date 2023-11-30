// Rspondendo a questão 1 e 2 separadamente
/*
1) Enumere os 3 tipos mais comuns de tratamento de erros e exemplifique com 
códigos seus ou pesquisados na internet.
*/


class ExemploErro extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ExemploErro';
    }
}

function exemploThrow(idade: number) {
    if (idade < 0) {
        throw new ExemploErro('Idade não pode ser um número negativo.');
    }
    return idade;
}

function exemploTryCatch(idade: number) {
    try {
        if (idade < 0) {
            throw new ExemploErro('Idade não pode ser um número negativo.');
        }
        return `Idade válida: ${idade}`;
    } catch (error: any) {
        return `Erro ao validar idade: ${error.message}`;
    }
}

function exemploFinally(idade: number) {
    try {
        if (idade < 0) {
            throw new ExemploErro('Idade não pode ser um número negativo.');
        }
        return `Idade válida: ${idade}`;
    } catch (error: any) {
        console.log(`Erro ao validar idade: ${error.message}`);
    } finally {
         console.log('Este bloco sempre será executado.');
    }
}

// Testando os exemplos
console.log('Exemplo try-catch:');
console.log(exemploTryCatch(-5));

console.log('\nExemplo throw:');
try {
    const idadeValida = exemploThrow(-5);
    console.log(`Idade válida: ${idadeValida}`);
} catch (error: unknown) {
    if (error instanceof ExemploErro) {
        console.error(`Erro ao validar idade: ${error.message}`);
    } else {
        console.error(`Erro desconhecido: ${error}`);
    }
}

console.log('\nExemplo finally:');
console.log(exemploFinally(-5));



/*
2) Explique por que cada um dos 3 métodos acima possui limitações de uso.

O primeiro metodo a ser usado foi exemploTryCatch()
- Gerar exceções para tratar seus erros, bem parecido com o condional(if, else),
se uma exceção(ou seja, um dado que não obeça as condições) ocorre dentro do bloco 
try, o controle é transferido para o bloco catch, onde você pode lidar com a exceção.
- Percebe uma coisa nesses exemplos:
1 - favorece
console.log('Exemplo try-catch:');
console.log(exemploTryCatch(25));
resultado:
Exemplo try-catch:
Idade válida: 25

2- não favorece
console.log('Exemplo try-catch:');
console.log(exemploTryCatch(25));
resultado:
Exemplo try-catch:
Erro ao validar idade: Idade não pode ser um número negativo.

--> No primeiro exemplo ele valida e mostra a idade, significa que não entrou nas exeções.
Já no segundo exemplo, ele não mostra a idade e já passa para o tratamento de 
exceções (catch). É assim que ele trata seus erros.


- Utilizado quando você espera que um bloco de código possa gerar exceções e você 
quer lidar com essas exceções de maneira específica.

O segundo metodo a ser usado foi exemploThrow()
- O operador throw é usado para lançar explicitamente uma exceção em seu código. 
Pode ser usado dentro de uma função ou bloco para sinalizar um erro ou condição 
excepcional, como está acontecendo aqui:
try {
    const idadeValida = exemploThrow(-5);
    console.log(`Idade válida: ${idadeValida}`);
} catch (error: unknown) {
    if (error instanceof ExemploErro) {
        console.error(`Erro ao validar idade: ${error.message}`);
    } else {
        console.error(`Erro desconhecido: ${error}`);
    }
}
- Por isso ele está instanciando a propria class, já que ele não possui restrições,
ele usa os metodos da class para tratar os erros, por isso ele deve ser usado junto
com o Try-Catch. 
- Utilizado quando você deseja sinalizar e propagar um erro em seu código.

O ultimo metodo a ser usado foi exemploFinally()
-  O bloco finally é usado para definir um bloco de código que será executado, 
independentemente de ocorrer ou não uma exceção dentro do bloco try. Ele é usado para 
garantir que determinadas ações sejam realizadas, mesmo se ocorrer uma exceção.
- No exemplo acima o dado recebido(idade --> exemploFinally(30)), foi um que favoresse 
as condições, o retorn então foi:
Este bloco sempre será executado.
Idade válida: 30
- Ainda que o dado fosse diferente: exemplo exemploFinally(-5), 
o resultado seria:
Erro ao validar idade: Idade não pode ser um número negativo.
Este bloco sempre será executado.
undefined
- Mesmo não favorecendo a condição o erro de exceção e o finally foram executados.

- Utilizado quando você precisa garantir que certas operações sejam realizadas, como a 
liberação de recursos, independentemente de ocorrer uma exceção.

*/