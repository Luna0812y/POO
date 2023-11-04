import prompt from 'prompt-sync'
const input = prompt()
import { RedeSocial } from './rede_social';
import { Perfil, Postagem, PostagemAvancada } from './Funcao_Perfil';
import { RepositorioDePerfis, RepositorioDePostagens } from './Funcao_Perfil';

class App {
    private _redeSocial: RedeSocial;

    exibirMenu(): void {
        let escolha: number;
        
        while (true) {
            console.log("Menu:");
            console.log("1. Incluir Um Novo Perfil");
            console.log("2. Consultar Perfil");
            console.log("3. Incluir Postagem");
            console.log("4. Consultar Postagem");
            console.log("5. Curtir");
            console.log("6. Descurtir");
            console.log("7. Decrementar Vizualizações");
            console.log("8. Exibir Postagens Por Perfil");
            console.log("9. Exibir Postagens Por Hashtag");
            console.log("0. Sair");

            escolha = parseInt(input("Escolha uma opção: "));

            if (escolha === 1) 
            {
                const id: number = parseInt(input("Digite o ID do perfil: "));
                const nome: string = input("Digite o nome do perfil: ");
                const email: string = input("Digite o email do perfil: ");

                const novoPerfil: Perfil = new Perfil(id, nome, email)
                this._redeSocial.incluirPerfil(novoPerfil);
            } 
            
            else if (escolha === 2) 
            {
                // Lógica para consultar perfil
                const id: number = parseInt(input("Digite o ID do perfil: "));
                const perfilConsultado = this._redeSocial.consultarPerfil(id, '', '');
                console.log(perfilConsultado);
            } 
            
            else if (escolha === 3) 
            {
                const id: number = parseInt(input("Digite o ID do perfil: "));
                const texto: string = input("Digite o texto que deseja: ");
                const perfil: string = input("Digite um perfil: ");
                const dataString: string = input("Digite uma data (formato YYYY-MM-DD): ");
                const data: Date = new Date(dataString);

                if (isNaN(data.getTime())) {
                    console.log("Data inválida. Por favor, digite uma data válida no formato YYYY-MM-DD.");
                } else {
                    console.log("Data válida: ", data);
                }
                const hashtag: string = input("Digite uma/umas hashtag: ");

                const postagem: PostagemAvancada = new PostagemAvancada(id, 0, texto, 0, perfil, data, hashtag, 0)
                this._redeSocial.incluirPostagem(postagem);
            }  
            
            else if (escolha === 4) 
            {

                const id: number = parseInt(input("Digite o ID da postagem: "));
                const texto: string = input("Digite o texto da postagem: ");
                const hashtag: string = input("Digite a hashtag da postagem: ");
                const perfil: string = input("Digite o perfil da postagem: ");

                const postagemConsultada = this._redeSocial.consultarPostagens(id, texto, hashtag, perfil);
                console.log(postagemConsultada);
            } 
            
            else if (escolha === 5) 
            {
                // Lógica para curtir
                const idPostagem: number = parseInt(input("Digite o ID da postagem para curtir: "));
                this._redeSocial.curtir(idPostagem);
            } 
            
            else if (escolha === 6) 
            {
                // Lógica para descurtir
                const idPostagem: number = parseInt(input("Digite o ID da postagem para descurtir: "));
                this._redeSocial.descurtir(idPostagem);
            } 
            
            else if (escolha === 7) 
            {
                const postagem: PostagemAvancada = input("Digite o ID do perfil onde está a postagem: ")
                const postagemDecremetada =  this._redeSocial.decrementarVisualizacoes(postagem)
                console.log(postagemDecremetada)
            } 
            
            else if (escolha === 8) 
            {
                // Lógica para exibir postagens por perfil
                const idPerfil: number = parseInt(input("Digite o ID do perfil: "));
                const postagens = this._redeSocial.exibirPostagensPorPerfil(idPerfil);
                console.log(postagens);
            } 
            
            else if (escolha === 9) 
            {
                // Lógica para exibir postagens por hashtag
                const hashtag: string = input("Digite a hashtag: ");
                const postagens = this._redeSocial.exibirPostagensPorHashtag(hashtag);
                console.log(postagens);
            } 
            
            else if (escolha === 0) 
            {
                console.log("Saindo do menu. Adeus!");
                break;
            } 
            
            else 
            {
                console.log("Opção inválida. Tente novamente.");
            }
        }
    }
}

// Exemplo de uso:
const repositorioDePerfis = new RepositorioDePerfis(); // Substitua pelo construtor real
const repositorioDePostagens = new RepositorioDePostagens(); // Substitua pelo construtor real
const redeSocial = new RedeSocial(repositorioDePerfis, repositorioDePostagens);
const app = new App(redeSocial);
app.exibirMenu();
