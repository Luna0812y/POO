// 01 - Criar as export export classes
export class Perfil {
    private _id: number;
    private _nome: string;
    private _email: string;
    private _postagens: Postagem[] = [];

    constructor(id: number, nome: string, email: string) {
        this._id = id;
        this._nome = nome;
        this._email = email;
    }

    get id(): number {
        return this._id;
    }

    get nome(): string {
        return this._nome;
    }

    get email(): string {
        return this._email;
    }

    get postagens(): Postagem[] {
        return this._postagens;
    }

    adicionarPostagem(postagem: Postagem): void {
        this._postagens.push(postagem);
    }
}

export class Postagem {
    private _id: number;
    private _texto: string;
    private _curtidas: number;
    private _descurtidas: number;
    private _data: Date;
    private _perfil: Perfil;

    constructor(id: number, texto: string, perfil: Perfil, data: Date) {
        this._id = id;
        this._texto = texto;
        this._curtidas = 0;
        this._descurtidas = 0;
        this._perfil = perfil;
        this._data = data;
    }

    get id(): number {
        return this._id;
    }

    get texto(): string {
        return this._texto;
    }

    get curtidas(): number {
        return this._curtidas;
    }

    get descurtidas(): number {
        return this._descurtidas;
    }

    get data(): Date {
        return this._data;
    }

    get perfil(): Perfil {
        return this._perfil;
    }

    curtir(): void {
        this._curtidas++;
    }

    descurtir(): void {
        this._descurtidas++;
    }

    ehPopular(): boolean {
        return this._curtidas >= 1.5 * this._descurtidas;
    }
}

export class PostagemAvancada extends Postagem {
    private _hashtags: string[];
    private _visualizacoesRestantes: number;

    constructor(id: number, texto: string, perfil: Perfil, hashtags: string[], visualizacoesRestantes: number, data: Date) {
        super(id, texto, perfil, data);
        this._hashtags = hashtags;
        this._visualizacoesRestantes = visualizacoesRestantes;
    }

    get hashtags(): string[] {
        return this._hashtags;
    }

    get visualizacoesRestantes(): number {
        return this._visualizacoesRestantes;
    }

    adicionarHashtag(hashtag: string): void {
        this._hashtags.push(hashtag);
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

export class RepositorioDePerfis {
    private _perfis: Perfil[] = [];

    incluir(perfil: Perfil): void {
        this._perfis.push(perfil);
    }

    consultar(id?: number, nome?: string, email?: string): Perfil | null {
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


export class RepositorioDePostagens {
    private _postagens: Postagem[] = [];

    incluir(postagem: Postagem): void {
        this._postagens.push(postagem);
        const perfil = postagem.perfil;
        if (perfil) {
            perfil.adicionarPostagem(postagem);
        }
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
