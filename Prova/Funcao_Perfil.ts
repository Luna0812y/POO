// 01 - Criar as classes
export class Perfil{ // a) Perfil
    private _id : number
    private _nome : string
    private _email : string
    private _postagens : Postagem[] = []

   constructor (id : number, nome : string, email: string){
        this._id = id
        this._nome = nome
        this._email = email
   }
    
    get id() : number{
        return this._id
    }

    get nome() : string{
        return this._nome
    }

    get email() : string{    
        return this._email
    }

    get postagens(): Postagem[]{
        return this._postagens
    }

    adicionarPostagem(postagem: Postagem): void {
        this._postagens.push(postagem);
    }    

}

export class Postagem { // b) Postagem
    private _id : number
    private _texto : string
    private _curtidas : number
    private _descurtidas : number
    private _data : Date
    private _perfil : Perfil

    constructor (id : number, texto : string, data : Date,  perfil : Perfil){
            //falta o super
        this._id = id
        this._texto = texto
        this._curtidas = 0
        this._descurtidas = 0
        this._data = data
        this._perfil = perfil
    }

    get id() : number{
        return this._id
    }
    
    get texto() : string{        
        return this._texto
    }
    
    get curtidas() : number{
        return this._curtidas
    }

    get descurtidas() : number{
        return this._descurtidas
    }

    get data() : Date{
        return this._data
    }

    get perfil() : Perfil{
        return this._perfil
    }


    // 2) Criar os métodos
    //a)
    curtir() : void{
        this._curtidas++
    }

    descurtir() : void{
        this._descurtidas++
    }

    ehPopular(): boolean {
        return this._curtidas >= 1.5 * this._descurtidas;
    }
    
}

export class PostagemAvancada extends Postagem {
    private _hashtags: string[];
    private _visualizacoesRestantes: number;

    constructor(id: number, texto: string, perfil: Perfil, data: Date, hashtags: string[], 
        visualizacoesRestantes: number) {
        super(id, texto, data, perfil);
        this._hashtags = hashtags;
        this._visualizacoesRestantes = visualizacoesRestantes;
    }

    get hashtags(): string[] {
        return this._hashtags;
    }

    get visualizacoesRestantes(): number{
        return this._visualizacoesRestantes
    }

    
    adicionarHashtag(hashtag: string): void {
        this._hashtags[this._hashtags.length] = hashtag;
    }

    existeHashtag(hashtag: string): boolean {
        for (const hashtagAtual of this._hashtags) {
            if (hashtagAtual === hashtag) {
                return true;
            }
        }
        return false;
    }
    
    decrementarVisualizacoes(): void {
        this._visualizacoesRestantes--;
    }
}

// 3) CLASSE REPOSITORIO DE PERFIS
export class RepositorioDePerfis {
    private _perfis: Perfil[] = [];

    incluir(perfil: Perfil): void {
        const perfilExistente = this.consultar(perfil.id, perfil.nome, perfil.email);
        if (perfilExistente) {
            console.log("Já existe um perfil com o mesmo ID, nome ou e-mail.");
            return;
        }
        this._perfis.push(perfil);
    }
    
  
    /* é usando o operador "?" por uma maneira de indicar que o parâmetro não é 
    obrigatório e pode ser omitido na chamada da função, ou seja, ele pode ser undefined.*/
    consultar(id?: number, nome?: string, email?: string): Perfil | null {
    /*verifica se pelo menos um dos parâmetros de busca foi fornecido e, em seguida, 
    verifica se há um perfil no array this._perfis que corresponde a todos os critérios 
    de busca. Se encontrar um perfil correspondente, ele é retornado; caso contrário, o
    método retorna null */
        if (id !== undefined || nome !== undefined || email !== undefined) {
            for (const perfil of this._perfis) {
                const idMatch = id === undefined || perfil.id === id;
                const nomeMatch = nome === undefined || perfil.nome === nome;
                const emailMatch = email === undefined || perfil.email === email;
    
                if (idMatch && nomeMatch && emailMatch) {
                    return perfil;
                }
            }
        }
        return null;
    }
    
}
  
// 4) criar a classe RepositorioDePostagens
export class RepositorioDePostagens {
    private _postagens: Postagem[] = [];

    incluir(postagem: Postagem): void {
        const postagemExistente = this.consultar(postagem.id);
        if (postagemExistente) {
            console.log("Já existe uma postagem com o mesmo ID.");
            return;
        }
        this._postagens.push(postagem);
    }
    

    /*filtra postagens com base em critérios como id, texto, hashtag e perfil. Se nenhum 
    critério for dado, retorna todas as postagens. Usa filter() para verificar 
    correspondências e retorna um array das postagens que atendem aos 
    critérios fornecidos. */
    consultar(id?: number, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[] {
        if (id === undefined && texto === undefined && hashtag === undefined && perfil === undefined) {
            return this._postagens; // Retorna todas as postagens se nenhum critério é fornecido.
        }
    
        return this._postagens.filter(postagem => {
            let atendeCriterios = true;
    
            if (id !== undefined && postagem.id !== id) {
                atendeCriterios = false;
            }
            if (texto !== undefined && !this.verificarSubstring(texto, postagem.texto)) {
                atendeCriterios = false;
            }
            if (hashtag !== undefined && postagem instanceof PostagemAvancada && !postagem.existeHashtag(hashtag)) {
                atendeCriterios = false;
            }
            if (perfil !== undefined && postagem.perfil.id !== perfil.id) {
                atendeCriterios = false;
            }
    
            return atendeCriterios;
        });
    }    
    
    /* filtrar postagens com base em um fragmento específico de texto 
    fornecido como critério de consulta. */
    verificarSubstring(substring: string, texto: string): boolean {
        for (let i = 0; i <= texto.length - substring.length; i++) {
            if (texto.substring(i, i + substring.length) === substring) {
                return true;
            }
        }
        return false;
    }
    
}


/*
//imprimir
// Criando perfis
const perfil1 = new Perfil(1, "Alice", "alice@example.com");
const perfil2 = new Perfil(2, "Bob", "bob@example.com");
const perfil3 = new Perfil(3, "Charlie", "charlie@example.com");

// Criando postagens
const postagem1 = new Postagem(1, 10, "Texto da postagem 1", 2, perfil1, new Date());
const postagem2 = new PostagemAvancada(2, 15, "Texto da postagem 2", 3, perfil2, new Date(), ["#hash1", "#hash2"], 100);
const postagem3 = new Postagem(3, 5, "Texto da postagem 3", 1, perfil3, new Date());

// Criando repositório de perfis e adicionando perfis
const repositorioPerfis = new RepositorioDePerfis();
repositorioPerfis.incluir(perfil1);
repositorioPerfis.incluir(perfil2);
repositorioPerfis.incluir(perfil3);

// Criando repositório de postagens e adicionando postagens
const repositorioPostagens = new RepositorioDePostagens();
repositorioPostagens.incluir(postagem1);
repositorioPostagens.incluir(postagem2);
repositorioPostagens.incluir(postagem3);

// Exemplos de consultas
console.log("Exemplo 1: Todas as postagens:");
const todasAsPostagens = repositorioPostagens.consultar();
imprimirPostagens(todasAsPostagens);

console.log("Exemplo 3: Consultar postagens por texto:");
const postagensPorTexto = repositorioPostagens.consultar(undefined, "Texto da postagem 1");
imprimirPostagens(postagensPorTexto);

console.log("Exemplo 4: Consultar postagens por hashtag:");
const postagensPorHashtag = repositorioPostagens.consultar(undefined, undefined, "#hash1");
imprimirPostagens(postagensPorHashtag);

console.log("Exemplo 5: Consultar postagens por perfil:");
const postagensPorPerfil = repositorioPostagens.consultar(undefined, undefined, undefined, perfil3);
imprimirPostagens(postagensPorPerfil);

function imprimirPostagens(postagens: Postagem[]): void {
    for (const postagem of postagens) {
        imprimirPostagem(postagem);
    }
}

function imprimirPostagem(postagem: Postagem): void {
    console.log(`ID: ${postagem.id}`);
    console.log(`Curtidas: ${postagem.curtidas}`);
    console.log(`Texto: ${postagem.texto}`);
    console.log(`Descurtidas: ${postagem.descurtidas}`);
    console.log(`Perfil: ID ${postagem.perfil.id}, Nome: ${postagem.perfil.nome}, Email: ${postagem.perfil.email}`);
    console.log(`Data: ${postagem.data}`);
    if (postagem instanceof PostagemAvancada) {
        console.log(`Hashtags: ${postagem.hashtags.join(', ')}`);
        console.log(`Visualizações Restantes: ${postagem.visualizacoesRestantes}`);
    }
    console.log("------");
}
*/
