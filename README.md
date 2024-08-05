## Configurando o projeto
1 - Clone o repositório
```sh
git clone https://github.com/DarkMetaK/comunicare-backend.git
```

2 - Instale as dependências
```sh
npm i
```

## Rodando o projeto

1 - Configure as variáveis de ambiente
```sh
cp .env.example .env
```

2 - Rode o seguinte comando
```sh
npm run dev
```

## Rodando os testes

1 - Configure as variáveis de ambiente de testes
```sh
cp .env.test.example .env.test
```

2 - Para testes de integração rode o seguinte comando
```sh
npm run test
```

3 - Para testes e2e rode o seguinte comando
```sh
npm run test:e2e
```
