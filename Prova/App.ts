import prompt from 'prompt-sync';
let input = prompt();
import { RedeSocial } from './rede_social'
import { Perfil, PostagemAvancada, RepositorioDePostagens } from './Funcao_Perfil'

class App {
    private _redeSocial: RedeSocial;

    constructor() {
        this._redeSocial = new RedeSocial();
    }

    exibirMenu(): void {
        let escolha: number;

        while (true) {
            console.log("Menu:");
            console.log("1. Incluir Perfil");
            console.log("2. Consultar Perfil");
            console.log("3. Incluir Postagem");
            console.log("4. Consultar Postagens");
            console.log("5. Consultar Postagens por Hashtag");
            console.log("6. Curtir Postagem");
            console.log("7. Descurtir Postagem");
            console.log("8. Decrementar Visualizações");
            console.log("9. Exibir Postagens Por Hashtag")
            console.log("0. Sair");

            escolha = parseInt(input("Escolha uma opção: "));

            if (escolha === 1) 
            {
                const id = parseInt(input("Digite o ID do perfil: "));
                const nome = input("Digite o nome do perfil: ");
                const email = input("Digite o email do perfil: ");

                const perfil = new Perfil(id, nome, email);
                this._redeSocial.incluirPerfil(perfil);
                console.log("Perfil incluído com sucesso.");
            } else if (escolha === 2) 
            {
                // Lógica para consultar perfil
                const id = parseInt(input("Digite o ID do perfil: "))
                const perfilConsultado = this._redeSocial.consultarPerfil(id, '', '')
                if (perfilConsultado) {
                    console.log(`ID: ${perfilConsultado.id}, Nome: ${perfilConsultado.nome}, Email: ${perfilConsultado.email}`)
                } else {
                    console.log("Perfil não encontrado.")
                }
            } else if (escolha === 3) 
            {
                const idPostagem = parseInt(input("Digite o ID da postagem: "))
                const texto = input("Digite o texto da postagem: ")
                const idPerfil = parseInt(input("Digite o ID do perfil da postagem: "))
                const hashtags = input("Digite as hashtags da postagem separadas por vírgula: ").split(",")
                const visualizacoesRestantes = parseInt(input("Digite o número de visualizações restantes da postagem: "))
                const perfilPostagem = this._redeSocial.consultarPerfil(idPerfil, "", "")
                if (perfilPostagem) {
                    const data = new Date() // Obtém a data e hora atual
                    const postagem = new PostagemAvancada(idPostagem, texto, perfilPostagem,hashtags, visualizacoesRestantes, data)
                    this._redeSocial.incluirPostagem(postagem)
                    console.log("Postagem incluída com sucesso.")
                } else {
                    console.log("Perfil não encontrado. Não foi possível incluir a postagem.")
                }
            } else if (escolha === 4) 
            {
                const postagens = this._redeSocial.consultarPostagens();
                this._redeSocial.exibirPostagens(postagens);
            } else if (escolha === 5) 
            {
                const idPostagem = parseInt(input("Digite o ID da postagem a ser curtida: "));
                this._redeSocial.curtir(idPostagem);
                console.log("Postagem curtida com sucesso.");
            } else if (escolha === 6) 
            {
                const idPostagem = parseInt(input("Digite o ID da postagem para descurtir: "));
                this._redeSocial.descurtir(idPostagem);
                console.log("Postagem descurtida com sucesso.");
            } else if (escolha === 7) 
            {
                const idPostagem = parseInt(input("Digite o ID da postagem para decrementar visualizações: "));
                const postagens = this._redeSocial.consultarPostagens(idPostagem);
                
                if (postagens.length > 0 && postagens[0] instanceof PostagemAvancada) {
                    const postagemAvancada = postagens[0] as PostagemAvancada;
                    this._redeSocial.decrementarVisualizacoes(postagemAvancada);
                    console.log("Visualizações decrementadas com sucesso.");
                } else {
                    console.log("Postagem não encontrada ou não é uma postagem avançada.");
                }
            } else if (escolha === 8) 
            {
                const idPerfil = parseInt(input("Digite o ID do perfil para exibir postagens: "));
                this._redeSocial.exibirPostagensPorPerfil(idPerfil);
            } else if (escolha === 9) 
            {
                const hashtagExibir = input("Digite a hashtag para exibir postagens: ");
                const postagensPorHashtag = this._redeSocial.exibirPostagensPorHashtag(hashtagExibir);
                postagensPorHashtag.forEach(p => {
                    console.log(`ID: ${p.id}, Texto: ${p.texto}, Curtidas: ${p.curtidas}, Descurtidas: ${p.descurtidas}, Hashtags: ${p.hashtags.join(", ")}, 
                    Visualizações Restantes: ${p.visualizacoesRestantes}`);
                });
            } else if (escolha === 0) 
            {
                console.log("Saindo do menu...");
                break;
            } else 
            {
                console.log("Opção inválida. Tente novamente.");
            }
        }
    }
}

const app = new App();
app.exibirMenu();
