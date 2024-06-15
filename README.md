# Gerenciador de Alunos UI
O Gerenciador de alunos é um projeto do **Edge Academy**, que visa facilitar a gestão do programa, mantendo uma base de dados dos alunos.

## Desenvolvimento
Para começar, clone o repositório e instale as dependências. Nesse projeto, utilizamos o `pnpm`, ao invés do `npm`, para gerir os pacotes.

```bash
pnpm install
```
Para facilitar o desenvolvimento em equipe, utilizamos um preset do ESlint. Para configurar seu ambiente de desenvolvimento e ter a formatação automática, siga o este [vídeo](https://www.youtube.com/watch?v=cbSHUVSUFgY).

É necessário também configurar o arquivo `.env`, que contém endereços de serviços do backend e configurações da biblioteca de autenticação. Para isso, faça uma cópia do arquivo `.env.example` e renomeie como `.env`.

Para iniciar a aplicação em modo de desenvolvimento, utilize o comando abaixo.
```bash
pnpm run dev
```
Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver os resultados.


Antes de submeter uma alteração é recomendado que utilize as ferramentas de lint e formatação automática do nextjs. Para isso, execute um dos comandos abaixo.

```bash
pnpm run build

# ou
pnpm lint --fix
```

## JSON server
```bash
pnpm json-server server.json -w -p 3333
```


