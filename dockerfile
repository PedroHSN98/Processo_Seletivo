# Etapa 1: Construção da imagem
FROM node:16 AS build

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos do projeto para o diretório de trabalho
COPY package.json package-lock.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . ./

# Criar o build da aplicação React
RUN npm run build

# Etapa 2: Servindo a aplicação
FROM nginx:alpine

# Copiar o build da etapa anterior para o diretório do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Comando para iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
