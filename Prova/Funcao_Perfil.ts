// 01 - Criar as classes
 class Perfil{ // a) Perfil
    private _id : number
    private _nome : string
    private _email : string

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

}

 class Postagem{ // b) Postagem
    private _id : number
    private _curtidas : number
    private _texto : string
    private _descurtidas : number
    private _perfil : Perfil
    private _data : Date

    constructor (id : number, curtidas : number, texto : string, descurtidas : number,
        perfil : Perfil, data : Date){
            //falta o super
        this._id = id
        this._curtidas = curtidas
        this._texto = texto
        this._descurtidas = descurtidas
        this._perfil = perfil
        this._data = data
    }

    get id() : number{
        return this._id
    }
    
    get curtidas() : number{
        return this._curtidas
    }
    get texto() : string{        
        return this._texto
    }
    get descurtidas() : number{
        return this._descurtidas
    }

    get perfil() : Perfil{
        return this._perfil
    }

    get data() : Date{
        return this._data
    }

    // 2) Criar os métodos
    //a)
    curtir() : void{
        this._curtidas++
    }

    descurtir() : void{
        this._descurtidas++
    }

    ehPopular() : boolean{
        return this._curtidas > 1.5 * this._descurtidas
    }
}

 class PostagemAvancada extends Postagem {
    private _hashtags: string[];
    private _visualizacoesRestantes: number;

    constructor(id: number, curtidas: number, texto: string, descurtidas: number, 
                perfil: Perfil, data: Date, hashtags: string[], visualizacoesRestantes: number) {
        super(id, curtidas, texto, descurtidas, perfil, data);
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
 class RepositorioDePerfis {
    private _perfis: Perfil[] = [];

    incluir(perfil: Perfil): void {
      this._perfis[this._perfis.length] = perfil;
    }
  
    consultar(id: number, nome: string, email: string): Perfil | undefined {
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
        return undefined;
    }
    
}
  
// 4) criar a classe RepositorioDePostagens
 class RepositorioDePostagens {
    private _postagens: Postagem[] = [];

    incluir(postagem: Postagem): void {
        this._postagens[this._postagens.length] = postagem;
    }

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
    
    
    verificarSubstring(substring: string, texto: string): boolean {
        for (let i = 0; i <= texto.length - substring.length; i++) {
            if (texto.substring(i, i + substring.length) === substring) {
                return true;
            }
        }
        return false;
    }
    
}




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
console.log(repositorioPostagens.consultar());

console.log("Exemplo 2: Consultar postagem por ID:");
console.log(repositorioPostagens.consultar(2));

console.log("Exemplo 3: Consultar postagens por texto:");
console.log(repositorioPostagens.consultar(undefined, "Texto da postagem 1"));

console.log("Exemplo 4: Consultar postagens por hashtag:");
console.log(repositorioPostagens.consultar(undefined, undefined, "#hash1"));

console.log("Exemplo 5: Consultar postagens por perfil:");
console.log(repositorioPostagens.consultar(undefined, undefined, undefined, perfil3));