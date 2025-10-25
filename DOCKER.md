# 🐳 Docker - Sistema de Reembolso FIAP DevLeadership

Este documento explica como executar o Sistema de Reembolso usando Docker.

## 📋 Pré-requisitos

- **Docker** instalado (versão 20.10+)
- **Docker Compose** (opcional, mas recomendado)
- **Git** para clonar o repositório

## 🚀 Execução Rápida

### Opção 1: Script Automatizado (Recomendado)

#### Windows:
```bash
# Executar em produção
docker-build.bat

# Executar em desenvolvimento
docker-build.bat dev

# Apenas build
docker-build.bat build

# Limpar imagens
docker-build.bat clean
```

#### Linux/macOS:
```bash
# Executar em produção
./docker-build.sh

# Executar em desenvolvimento
./docker-build.sh dev

# Apenas build
./docker-build.sh build

# Limpar imagens
./docker-build.sh clean
```

### Opção 2: Docker Compose

```bash
# Produção
docker-compose up --build

# Desenvolvimento
docker-compose --profile dev up --build
```

### Opção 3: Docker Manual

```bash
# Build da imagem
docker build -t sistema-reembolso:latest .

# Executar container
docker run -p 3000:80 sistema-reembolso:latest
```

## 🏗️ Arquitetura Docker

### Multi-stage Build

O Dockerfile utiliza multi-stage build para otimização:

1. **Estágio Builder**: Instala dependências e faz build da aplicação
2. **Estágio Production**: Serve a aplicação com Nginx

### Estrutura de Arquivos

```
├── Dockerfile              # Build de produção
├── Dockerfile.dev          # Build de desenvolvimento
├── docker-compose.yml      # Orquestração de serviços
├── nginx.conf              # Configuração do Nginx
├── .dockerignore           # Arquivos ignorados no build
├── docker-build.sh         # Script Linux/macOS
└── docker-build.bat        # Script Windows
```

## 🔧 Configurações

### Portas

- **Produção**: `3000:80` (http://localhost:3000)
- **Desenvolvimento**: `3001:3000` (http://localhost:3001)

### Variáveis de Ambiente

```bash
# Produção
NODE_ENV=production

# Desenvolvimento
NODE_ENV=development
```

### Volumes (Desenvolvimento)

- Código fonte montado em `/app`
- `node_modules` como volume nomeado para performance

## 📊 Monitoramento

### Health Check

```bash
# Verificar se a aplicação está rodando
curl http://localhost:3000/health
```

### Logs

```bash
# Ver logs do container
docker logs sistema-reembolso-fiap

# Seguir logs em tempo real
docker logs -f sistema-reembolso-fiap
```

## 🛠️ Comandos Úteis

### Gerenciamento de Containers

```bash
# Listar containers rodando
docker ps

# Parar container
docker stop sistema-reembolso-fiap

# Remover container
docker rm sistema-reembolso-fiap

# Remover imagem
docker rmi sistema-reembolso:latest
```

### Desenvolvimento

```bash
# Entrar no container
docker exec -it sistema-reembolso-fiap sh

# Rebuild sem cache
docker build --no-cache -t sistema-reembolso:latest .
```

### Limpeza

```bash
# Limpar containers parados
docker container prune

# Limpar imagens não utilizadas
docker image prune

# Limpeza completa
docker system prune -a
```

## 🔍 Troubleshooting

### Problemas Comuns

#### Porta já em uso
```bash
# Verificar processos usando a porta
netstat -ano | findstr :3000

# Parar processo específico
taskkill /PID <PID> /F
```

#### Erro de permissão (Linux/macOS)
```bash
# Dar permissão de execução
chmod +x docker-build.sh
```

#### Build falha
```bash
# Limpar cache do Docker
docker builder prune

# Rebuild sem cache
docker build --no-cache -t sistema-reembolso:latest .
```

### Logs de Debug

```bash
# Build com logs verbosos
docker build --progress=plain -t sistema-reembolso:latest .

# Executar com debug
docker run -it --rm sistema-reembolso:latest sh
```

## 📈 Performance

### Otimizações Implementadas

- **Multi-stage build**: Reduz tamanho da imagem final
- **Nginx**: Servidor web otimizado para produção
- **Gzip**: Compressão de assets
- **Cache headers**: Cache de assets estáticos
- **Security headers**: Headers de segurança

### Métricas

- **Tamanho da imagem**: ~50MB (com Nginx)
- **Tempo de build**: ~2-3 minutos
- **Tempo de startup**: ~5 segundos

## 🔒 Segurança

### Headers de Segurança

- `X-Frame-Options`: SAMEORIGIN
- `X-XSS-Protection`: 1; mode=block
- `X-Content-Type-Options`: nosniff
- `Content-Security-Policy`: Configurado

### Boas Práticas

- Imagem base Alpine (menor superfície de ataque)
- Usuário não-root no container
- Dependências mínimas
- Arquivos sensíveis no .dockerignore

## 🚀 Deploy

### Produção

```bash
# Build otimizado
docker build -t sistema-reembolso:prod .

# Executar com configurações de produção
docker run -d \
  --name sistema-reembolso \
  -p 80:80 \
  --restart unless-stopped \
  sistema-reembolso:prod
```

### Docker Registry

```bash
# Tag para registry
docker tag sistema-reembolso:latest your-registry/sistema-reembolso:latest

# Push para registry
docker push your-registry/sistema-reembolso:latest
```

## 📚 Recursos Adicionais

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [React Production Build](https://create-react-app.dev/docs/production-build/)

---

**Autor**: Jucelio Alencar  
**Curso**: FIAP DevLeadership  
**Projeto**: Sistema de Reembolso com Análise Automática


