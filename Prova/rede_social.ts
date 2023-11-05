class RedeSocial {
    private _repositorioDePerfis: RepositorioDePerfis = new RepositorioDePerfis();
    private _repositorioDePostagens: RepositorioDePostagens = new RepositorioDePostagens();

    incluirPerfil(perfil: Perfil): void {
        this._repositorioDePerfis.incluir(perfil);
    }

    consultarPerfil(id: number): Perfil | undefined {
        return this._repositorioDePerfis.consultar(id);
    }

    incluirPostagem(postagem: Postagem): void {
        this._repositorioDePostagens.incluir(postagem);
    }

    consultarPostagens(id?: number): Postagem[] {
        return this._repositorioDePostagens.consultar(id);
    }

    consultarPostagensPorHashtag(hashtag: string): Postagem[] {
        return this._repositorioDePostagens.consultarPorHashtag(hashtag);
    }

    curtirPostagem(idPostagem: number): void {
        const postagem = this._repositorioDePostagens.consultar(idPostagem)[0];
        if (postagem) {
            postagem.curtir();
        }
    }

    descurtirPostagem(idPostagem: number): void {
        const postagem = this._repositorioDePostagens.consultar(idPostagem)[0];
        if (postagem) {
            postagem.descurtir();
        }
    }

    decrementarVisualizacoes(idPostagem: number): void {
        const postagem = this._repositorioDePostagens.consultar(idPostagem)[0];
        if (postagem instanceof Postagem) {
            postagem.decrementarVisualizacoes();
        }
    }
}
