# Projeto de Aplicação de Desaparecidos - Polícia Judiciária Civil de Mato Grosso

Este é um projeto prático para o perfil de Desenvolvedor Front-end. O objetivo é implementar uma aplicação Single Page Application (SPA) para consultar e interagir com os dados de pessoas desaparecidas fornecidos pela Polícia Judiciária Civil de Mato Grosso.

## Dados de Inscrição
- **Nome:** PEDRO HENRIQUE SANTANA NASCIMENTO
- **E-mail:** pedrohenriquesn90@hotmail.com
- **Data de Inscrição:** 30/03/2025
- ** Inscrição: 8405 **

## Descrição do Projeto
A aplicação tem como objetivo possibilitar a consulta de dados de desaparecidos, bem como o envio de informações sobre esses casos.

A aplicação foi construída utilizando **React** e algumas bibliotecas e frameworks como **TailwindCSS** para o design e **Axios** para comunicação com a API. A aplicação também inclui funcionalidades de **Lazy Loading** e **Paginação**.

## Funcionalidades
- **Tela Inicial:** Exibe uma lista de desaparecidos ou localizados, com imagens e informações básicas. Inclui paginação para mostrar até 10 desaparecidos por vez.
- **Tela de Detalhamento:** Exibe detalhes de um desaparecido selecionado, incluindo informações adicionais e a possibilidade de destacar sua situação (desaparecido ou localizado).
- **Tela de Inclusão de Informações:** Permite que o cidadão envie informações sobre um desaparecido, incluindo máscaras de formatação para os dados e upload de fotografias.

## Tecnologias Utilizadas
- **React** (para o front-end)
- **Axios** (para requisições HTTP)
- **React Router** (para gerenciar as rotas e Lazy Loading)
- **TailwindCSS** (para estilização responsiva)
- **Formik** (para gerenciar formulários)
- **Docker** (para containerização da aplicação)

## Instalação e Execução
Para rodar o projeto localmente, siga as etapas abaixo:

### 1. Clonar o Repositório
```bash
git clone https://github.com/SEU_USUARIO/projeto-desaparecidos.git
cd projeto-desaparecidos
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Rodar o Projeto
```bash
npm start
```

O projeto será iniciado em `http://localhost:3000/`.

### 4. Rodar com Docker
```bash
docker build -t projeto-desaparecidos .
docker run -p 3000:3000 projeto-desaparecidos
```

## Contribuição
Contribuições são bem-vindas! Para sugerir melhorias, abra uma **Issue** ou envie um **Pull Request**.

## Licença
Este projeto está sob a licença MIT.

