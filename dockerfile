# Use uma imagem base Node.js
FROM node:18

# Crie um diretório de trabalho dentro da imagem
WORKDIR /app

# Clone o repositório do GitHub para a imagem
RUN git clone https://github.com/samuel-alves-chagas/s107-backend .

# Instale as dependências
RUN npm install

# Exponha a porta que o aplicativo estará escutando
EXPOSE 5000

# Comando para iniciar o aplicativo
CMD ["npm", "start"]