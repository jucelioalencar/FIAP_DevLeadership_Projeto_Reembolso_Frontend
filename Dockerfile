# Dockerfile para Sistema de Reembolso - FIAP DevLeadership
# Multi-stage build para otimização

# Estágio 1: Build da aplicação
FROM node:18-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Estágio 2: Servidor de produção
FROM nginx:alpine AS production

# Instalar Node.js para servir a aplicação (alternativa ao nginx)
# FROM node:18-alpine AS production

# Copiar arquivos buildados
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração customizada do nginx (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expor porta
EXPOSE 80

# Comando para nginx
CMD ["nginx", "-g", "daemon off;"]

# Alternativa usando Node.js + serve (descomente se preferir):
# RUN npm install -g serve
# EXPOSE 3000
# CMD ["serve", "-s", "/usr/share/nginx/html", "-l", "3000"]

