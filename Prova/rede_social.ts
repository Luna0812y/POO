import {RepositorioDePostagens, RepositorioDePerfis} from './Funcao_Perfil'
import {Postagem, PostagemAvancada, Perfil} from './Funcao_Perfil'


export class RedeSocial {
    private _repositorioDePerfis: RepositorioDePerfis = new RepositorioDePerfis();
    private _repositorioDePostagens: RepositorioDePostagens = new RepositorioDePostagens();

    incluirPerfil(perfil: Perfil): void {
        if (!perfil.id || !perfil.nome || !perfil.email) {
            console.log("Todos os atributos do perfil devem estar preenchidos.");
            return;
        }

        const perfilExistente = this._repositorioDePerfis.consultar(perfil.id, perfil.nome, perfil.email);
        if (perfilExistente) {
            console.log("Já existe um perfil com o mesmo ID, nome ou e-mail.");
            return;
        }

        this._repositorioDePerfis.incluir(perfil);
        console.log("Perfil incluído com sucesso.");
    }

    consultarPerfil(id: number, nome: string, email: string): Perfil | null {
        return this._repositorioDePerfis.consultar(id, nome, email);
    }

    incluirPostagem(postagem: Postagem): void {
        if (!postagem.id || !postagem.texto || !postagem.perfil) {
            console.log("Todos os atributos da postagem devem estar preenchidos.");
            return;
        }

        if (postagem instanceof PostagemAvancada && (!postagem.hashtags || postagem.hashtags.length === 0)) {
            console.log("A postagem avançada deve ter pelo menos uma hashtag.");
            return;
        }

        const postagemExistente = this._repositorioDePostagens.consultar(postagem.id);
        if (postagemExistente) {
            console.log("Já existe uma postagem com o mesmo ID, texto e perfil.");
            return;
        }

        this._repositorioDePostagens.incluir(postagem);
        console.log("Postagem incluída com sucesso.");
    }

    consultarPostagens(id?: number, texto?: string, hashtag?: string, perfil?: Perfil): Postagem[] {
        return this._repositorioDePostagens.consultar(id, texto, hashtag, perfil);
    }

    curtir(idPostagem: number): void {
        const postagens = this._repositorioDePostagens.consultar(idPostagem);

        if (postagens.length > 0) {
            postagens[0].curtir();
            console.log(`Postagem com ID ${idPostagem} foi curtida.`);
        } else {
            console.log(`Postagem com ID ${idPostagem} não encontrada.`);
        }
    }

    descurtir(idPostagem: number): void {
        const postagens = this._repositorioDePostagens.consultar(idPostagem);

        if (postagens.length > 0) {
            postagens[0].descurtir();
            console.log(`Postagem com ID ${idPostagem} foi descurtida.`);
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
                this.decrementarVisualizacoes(postagem);
            }
        }

        const postagensExibiveis = postagensDoPerfil.filter(postagem => postagem.data <= new Date());
        return postagensExibiveis;
    }

    exibirPostagens(postagens: Postagem[]): void {
        if (postagens.length === 0) {
            console.log("Nenhuma postagem encontrada.");
        } else {
            console.log("Postagens encontradas:");
            for (const postagem of postagens) {
                console.log(`ID: ${postagem.id}`);
                console.log(`Texto: ${postagem.texto}`);
                console.log(`Curtidas: ${postagem.curtidas}`);
                console.log(`Descurtidas: ${postagem.descurtidas}`);
                console.log(`Data: ${postagem.data}`);
                if (postagem instanceof PostagemAvancada) {
                    console.log(`Hashtags: ${postagem.hashtags.join(", ")}`);
                    console.log(`Visualizações Restantes: ${postagem.visualizacoesRestantes}`);
                }
                console.log("------");
            }
        }
    }

    exibirPostagensPorHashtag(hashtag: string): PostagemAvancada[] {
        const postagensPorHashtag = this._repositorioDePostagens.consultar(undefined, undefined, hashtag);

        for (const postagem of postagensPorHashtag) {
            if (postagem instanceof PostagemAvancada) {
                this.decrementarVisualizacoes(postagem);
            }
        }

        const postagensExibiveis = postagensPorHashtag.filter(postagem => postagem.data <= new Date());
        return postagensExibiveis as PostagemAvancada[];
    }
}
