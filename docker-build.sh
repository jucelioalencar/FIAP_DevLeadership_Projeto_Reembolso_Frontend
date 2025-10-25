#!/bin/bash

# Script de build para Sistema de Reembolso - FIAP DevLeadership
# Autor: Jucelio Alencar

echo "🚀 Iniciando build do Sistema de Reembolso..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir mensagens coloridas
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    print_error "Docker não está instalado. Por favor, instale o Docker primeiro."
    exit 1
fi

# Verificar se Docker Compose está disponível
if ! command -v docker-compose &> /dev/null; then
    print_warning "Docker Compose não encontrado. Usando apenas Docker."
    USE_COMPOSE=false
else
    USE_COMPOSE=true
fi

# Função para build de produção
build_production() {
    print_status "Construindo imagem de produção..."
    
    if docker build -t sistema-reembolso:latest .; then
        print_success "Imagem de produção construída com sucesso!"
    else
        print_error "Falha ao construir imagem de produção"
        exit 1
    fi
}

# Função para build de desenvolvimento
build_development() {
    print_status "Construindo imagem de desenvolvimento..."
    
    if docker build -f Dockerfile.dev -t sistema-reembolso:dev .; then
        print_success "Imagem de desenvolvimento construída com sucesso!"
    else
        print_error "Falha ao construir imagem de desenvolvimento"
        exit 1
    fi
}

# Função para executar com Docker Compose
run_with_compose() {
    print_status "Executando com Docker Compose..."
    
    if [ "$1" = "dev" ]; then
        docker-compose --profile dev up --build
    else
        docker-compose up --build
    fi
}

# Função para executar com Docker simples
run_with_docker() {
    print_status "Executando com Docker..."
    
    if [ "$1" = "dev" ]; then
        build_development
        print_status "Iniciando container de desenvolvimento..."
        docker run -p 3001:3000 -v $(pwd):/app -v /app/node_modules sistema-reembolso:dev
    else
        build_production
        print_status "Iniciando container de produção..."
        docker run -p 3000:80 sistema-reembolso:latest
    fi
}

# Menu principal
case "${1:-prod}" in
    "prod"|"production")
        print_status "Modo: Produção"
        if [ "$USE_COMPOSE" = true ]; then
            run_with_compose
        else
            run_with_docker
        fi
        ;;
    "dev"|"development")
        print_status "Modo: Desenvolvimento"
        if [ "$USE_COMPOSE" = true ]; then
            run_with_compose dev
        else
            run_with_docker dev
        fi
        ;;
    "build")
        print_status "Apenas build (sem executar)"
        build_production
        build_development
        print_success "Builds concluídos!"
        ;;
    "clean")
        print_status "Limpando imagens Docker..."
        docker rmi sistema-reembolso:latest sistema-reembolso:dev 2>/dev/null || true
        docker system prune -f
        print_success "Limpeza concluída!"
        ;;
    *)
        echo "Uso: $0 [prod|dev|build|clean]"
        echo ""
        echo "Comandos disponíveis:"
        echo "  prod, production  - Executa em modo produção (padrão)"
        echo "  dev, development   - Executa em modo desenvolvimento"
        echo "  build             - Apenas constrói as imagens"
        echo "  clean             - Remove imagens e limpa cache"
        echo ""
        echo "Exemplos:"
        echo "  $0                # Executa em produção"
        echo "  $0 dev            # Executa em desenvolvimento"
        echo "  $0 build          # Apenas build"
        echo "  $0 clean          # Limpa imagens"
        exit 1
        ;;
esac

print_success "Sistema de Reembolso - FIAP DevLeadership"
print_status "Aplicação disponível em:"
if [ "${1:-prod}" = "dev" ] || [ "${1:-prod}" = "development" ]; then
    echo "  🌐 http://localhost:3001"
else
    echo "  🌐 http://localhost:3000"
fi

