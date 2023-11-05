import {RepositorioDePostagens, RepositorioDePerfis} from './Funcao_Perfil'
import {Postagem, PostagemAvancada, Perfil} from './Funcao_Perfil'


export class RedeSocial {
    private _repositorioDePostagens: RepositorioDePostagens
    private _repositorioDePerfis: RepositorioDePerfis

    constructor(){
        this._repositorioDePostagens = new RepositorioDePostagens();
        this._repositorioDePerfis = new RepositorioDePerfis();
    }

   incluirPerfil(perfil: Perfil): void {
        if (!perfil.id || !perfil.nome || !perfil.email) {
            console.log("Todos os atributos do perfil devem estar preenchidos.")
            return
        }

        const perfilExistente = this._repositorioDePerfis.consultar(perfil.id, perfil.nome, perfil.email)
        if (perfilExistente) {
            console.log("Já existe um perfil com o mesmo ID, nome ou e-mail.")
            return
        }

        this._repositorioDePerfis.incluir(perfil) 
        console.log("Perfil incluído com sucesso.")
    }

    consultarPerfil(id: number, nome: string, email: string): Perfil | null {
        return this._repositorioDePerfis.consultar(id, nome, email)
    }

    incluirPostagem(postagem: Postagem): void {
        if (!postagem.id || !postagem.texto || !postagem.perfil) {
            console.log("Todos os atributos da postagem devem estar preenchidos.")
            return
        }
    
        if (postagem instanceof PostagemAvancada && (!postagem.hashtags || postagem.hashtags.length === 0)) {
            console.log("A postagem avançada deve ter pelo menos uma hashtag.")
            return
        }
    
        const postagemExistente = this._repositorioDePostagens.consultar(postagem.id, postagem.texto)
        if (postagemExistente) {
            console.log("Já existe uma postagem com o mesmo ID, texto e perfil.")
            return
        }
    
        this._repositorioDePostagens.incluir(postagem)
        console.log("Postagem incluída com sucesso.")
    }
    
    consultarPostagens(id: number, texto: string, hashtag: string, perfil: Perfil): Postagem[] {
        return this._repositorioDePostagens.consultar(id, texto, hashtag, perfil)
    }

    curtir(idPostagem: number): void {
        // Pesquisa a postagem pelo ID no repositório de postagens
        const postagens = this._repositorioDePostagens.consultar(idPostagem);
    
        // Verifica se pelo menos uma postagem foi encontrada
        if (postagens.length > 0) {
            // Chama o método curtir() da primeira postagem encontrada
            postagens[0].curtir();
            console.log(`Postagem com ID ${idPostagem} foi curtida.`);
        } else {
            console.log(`Postagem com ID ${idPostagem} não encontrada.`);
        }
    }    

    descurtir(idPostagem: number): void {
        const postagens = this._repositorioDePostagens.consultar(idPostagem);
    
        // Verifica se pelo menos uma postagem foi encontrada
        if (postagens.length > 0) {
            // Chama o método descurtir() da primeira postagem encontrada
            postagens[0].descurtir();
            console.log(`Postagem com ID ${idPostagem} foi descurtido.`);
        } else {
            console.log(`Postagem com ID ${idPostagem} não encontrada.`);
        }
    }

    decrementarVisualizacoes(postagem: PostagemAvancada): void {
        if (postagem.visualizacoesRestantes <= 0) {
            console.log("A postagem já atingiu o número mínimo de visualizações.");
            return;
        }

        postagem.decrementarVisualizacoes();
        console.log("Visualização decrementada com sucesso.");
    }

    exibirPostagensPorPerfil(id: number): Postagem[] {
        const postagensDoPerfil = this._repositorioDePostagens.consultar(id);
    
        for (const postagem of postagensDoPerfil) {
            if (postagem instanceof PostagemAvancada) {
                this.decrementarPostagem(postagem);
            }
        }
    
        const postagensExibiveis = postagensDoPerfil.filter(postagem => postagem.data <= new Date());
        return postagensExibiveis;
    }
    
    exibirPostagensPorHashtag(hashtag: string): PostagemAvancada[] {
        const postagensPorHashtag = this._repositorioDePostagens.consultar(undefined, undefined, hashtag);
        for (const postagem of postagensPorHashtag) {
            if (postagem instanceof PostagemAvancada) {
                this.decrementarPostagem(postagem);
            }
        }

        const postagensExibiveis = postagensPorHashtag.filter(postagem => postagem.data <= new Date());
        return postagensExibiveis as PostagemAvancada[];
    }

    private decrementarPostagem(postagem: PostagemAvancada): void {
        if (postagem.visualizacoesRestantes <= 0) {
            console.log(`A postagem com ID ${postagem.id} já atingiu o número mínimo de visualizações.`);
            return;
        }

        postagem.decrementarVisualizacoes();
        console.log(`Visualizações da postagem com ID ${postagem.id} decrementadas com sucesso.`);
    }
    
}
