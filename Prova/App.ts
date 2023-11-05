import prompt from 'prompt-sync';
const input = prompt();
import { RedeSocial } from './rede_social'
import { Perfil, Postagem, PostagemAvancada } from './Funcao_Perfil'

class App {
    private _redeSocial: RedeSocial

    constructor() {
        this._redeSocial = new RedeSocial()
    }

    exibirMenu(): void {
        let escolha: number
        
        while (true) {
            console.log("Menu:")
            console.log("1. Incluir Perfil")
            console.log("2. Consultar Perfil")
            console.log("3. Incluir Postagem")
            console.log("4. Consultar Postagens")
            console.log("5. Curtir Postagem")
            console.log("6. Descurtir Postagem")
            console.log("7. Decrementar Vizualizações")
            console.log("8. Exibir Postagens Por Perfil")
            console.log("9. Exibir Postagens Por Hashtag")
            console.log("0. Sair")

            escolha = parseInt(input("Escolha uma opção: "))

            if (escolha === 1) 
            {
                const id = parseInt(input("Digite o ID do perfil: "))
                const nome = input("Digite o nome do perfil: ")
                const email = input("Digite o email do perfil: ")

                const perfil = new Perfil(id, nome, email)
                this._redeSocial.incluirPerfil(perfil)
                console.log("Perfil incluído com sucesso.")
            } 
            
            else if (escolha === 2) 
            {
                // Lógica para consultar perfil
                const id = parseInt(input("Digite o ID do perfil: "))
                const perfilConsultado = this._redeSocial.consultarPerfil(id, '', '')
                if (perfilConsultado) {
                    console.log(`ID: ${perfilConsultado.id}, Nome: ${perfilConsultado.nome}, Email: ${perfilConsultado.email}`)
                } else {
                    console.log("Perfil não encontrado.")
                }
            } 
            
            else if (escolha === 3) 
            {
                const idPostagem = parseInt(input("Digite o ID da postagem: "))
                const texto = input("Digite o texto da postagem: ")
                const idPerfil = parseInt(input("Digite o ID do perfil da postagem: "))
                const hashtags = input("Digite as hashtags da postagem separadas por vírgula: ").split(",")
                const visualizacoesRestantes = parseInt(input("Digite o número de visualizações restantes da postagem: "))
                const perfilPostagem = this._redeSocial.consultarPerfil(idPerfil, "", "")
                if (perfilPostagem) {
                    const data = new Date() // Obtém a data e hora atual
                    const postagem = new PostagemAvancada(idPostagem, texto, perfilPostagem, data,hashtags, visualizacoesRestantes)
                    this._redeSocial.incluirPostagem(postagem)
                    console.log("Postagem incluída com sucesso.")
                } else {
                    console.log("Perfil não encontrado. Não foi possível incluir a postagem.")
                }
            }  
            
            else if (escolha === 4) 
            {
                const idPostagemConsulta = parseInt(input("Digite o ID da postagem a ser consultada: "))
                const hashtagConsulta = input("Digite a hashtag da postagem a ser consultada: ")
                const idPerfil = parseInt(input("Digite o ID do perfil: "))
                const texto = input("Digite o texto da postagem: ")
                const postagensConsultadas = this._redeSocial.consultarPostagens(idPostagemConsulta, texto, hashtagConsulta, idPerfil)
                if (postagensConsultadas.length > 0) {
                    postagensConsultadas.forEach(p => {
                        console.log(`ID: ${p.id}, Texto: ${p.texto}, Hashtags: ${p.hashtags.join(", ")}, Visualizações Restantes: ${p.visualizacoesRestantes}, , 
                        Curtidas: ${p.curtidas}, Descurtidas: ${p.descurtidas}`)
                    })
                } else {
                    console.log("Nenhuma postagem encontrada.")
                }
            } 
            
            else if (escolha === 5) 
            {
                const idCurtir = parseInt(input("Digite o ID da postagem a ser curtida: "))
                this._redeSocial.curtir(idCurtir)
                console.log("Postagem curtida com sucesso.")
            } 
            
            else if (escolha === 6) 
            {
                const idDescurtir = parseInt(input("Digite o ID da postagem para descurtir: "))
                this._redeSocial.descurtir(idDescurtir)
                console.log("Postagem descurtida com sucesso.")
            } 
            
            else if (escolha === 7) 
            {
                const idDecrementarVisualizacoes = parseInt(input("Digite o ID da postagem para decrementar visualizações: "));
                const postagemDecrementarVisualizacoes = this._redeSocial.consultarPostagens(idDecrementarVisualizacoes, "", "", undefined)[0];
                if (postagemDecrementarVisualizacoes instanceof PostagemAvancada) {
                    this._redeSocial.decrementarVisualizacoes(postagemDecrementarVisualizacoes);
                } else {
                    console.log("Postagem não encontrada ou não é avançada.");
                }

            } 
            
            else if (escolha === 8) 
            {
                const idExibirPorPerfil = parseInt(input("Digite o ID do perfil para exibir postagens: "));
                const postagensPorPerfil = this._redeSocial.exibirPostagensPorPerfil(idExibirPorPerfil);
                postagensPorPerfil.forEach(p => {
                    console.log(`ID: ${p.id}, Texto: ${p.texto}, Curtidas: ${p.curtidas}, Descurtidas: ${p.descurtidas}, Hashtags: ${p.hashtags.join(", ")}, Visualizações Restantes: ${p.visualizacoesRestantes}`);
                });
            } 
            
            else if (escolha === 9) 
            {
                const hashtagExibir = input("Digite a hashtag para exibir postagens: ");
                const postagensPorHashtag = this._redeSocial.exibirPostagensPorHashtag(hashtagExibir);
                postagensPorHashtag.forEach(p => {
                    console.log(`ID: ${p.id}, Texto: ${p.texto}, Curtidas: ${p.curtidas}, Descurtidas: ${p.descurtidas}, Hashtags: ${p.hashtags.join(", ")}, Visualizações Restantes: ${p.visualizacoesRestantes}`);
                });
            } 
            
            else if (escolha === 0) 
            {
                console.log("Saindo do menu...")
                break
            } 
            
            else 
            {
                console.log("Opção inválida. Tente novamente.")
            }
        }
    }
}

const app = new App();
app.exibirMenu();

