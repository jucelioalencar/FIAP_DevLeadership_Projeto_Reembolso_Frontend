@echo off
REM Script de build para Sistema de Reembolso - FIAP DevLeadership
REM Autor: Jucelio Alencar

echo 🚀 Iniciando build do Sistema de Reembolso...

REM Verificar se Docker está instalado
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker não está instalado. Por favor, instale o Docker primeiro.
    exit /b 1
)

REM Verificar se Docker Compose está disponível
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Docker Compose não encontrado. Usando apenas Docker.
    set USE_COMPOSE=false
) else (
    set USE_COMPOSE=true
)

if "%1"=="prod" goto :production
if "%1"=="production" goto :production
if "%1"=="dev" goto :development
if "%1"=="development" goto :development
if "%1"=="build" goto :build_only
if "%1"=="clean" goto :clean
if "%1"=="" goto :production

echo Uso: %0 [prod^|dev^|build^|clean]
echo.
echo Comandos disponíveis:
echo   prod, production  - Executa em modo produção (padrão)
echo   dev, development   - Executa em modo desenvolvimento
echo   build             - Apenas constrói as imagens
echo   clean             - Remove imagens e limpa cache
echo.
echo Exemplos:
echo   %0                # Executa em produção
echo   %0 dev          # Executa em desenvolvimento
echo   %0 build           # Apenas build
echo   %0 clean           # Limpa imagens
exit /b 1

:production
echo [INFO] Modo: Produção
if "%USE_COMPOSE%"=="true" (
    echo [INFO] Executando com Docker Compose...
    docker-compose up --build
) else (
    echo [INFO] Construindo imagem de produção...
    docker build -t sistema-reembolso:latest .
    if %errorlevel% neq 0 (
        echo [ERROR] Falha ao construir imagem de produção
        exit /b 1
    )
    echo [SUCCESS] Imagem de produção construída com sucesso!
    echo [INFO] Iniciando container de produção...
    docker run -p 3000:80 sistema-reembolso:latest
)
goto :end

:development
echo [INFO] Modo: Desenvolvimento
if "%USE_COMPOSE%"=="true" (
    echo [INFO] Executando com Docker Compose...
    docker-compose --profile dev up --build
) else (
    echo [INFO] Construindo imagem de desenvolvimento...
    docker build -f Dockerfile.dev -t sistema-reembolso:dev .
    if %errorlevel% neq 0 (
        echo [ERROR] Falha ao construir imagem de desenvolvimento
        exit /b 1
    )
    echo [SUCCESS] Imagem de desenvolvimento construída com sucesso!
    echo [INFO] Iniciando container de desenvolvimento...
    docker run -p 3001:3000 -v "%cd%":/app -v /app/node_modules sistema-reembolso:dev
)
goto :end

:build_only
echo [INFO] Apenas build (sem executar)
echo [INFO] Construindo imagem de produção...
docker build -t sistema-reembolso:latest .
if %errorlevel% neq 0 (
    echo [ERROR] Falha ao construir imagem de produção
    exit /b 1
)
echo [SUCCESS] Imagem de produção construída com sucesso!

echo [INFO] Construindo imagem de desenvolvimento...
docker build -f Dockerfile.dev -t sistema-reembolso:dev .
if %errorlevel% neq 0 (
    echo [ERROR] Falha ao construir imagem de desenvolvimento
    exit /b 1
)
echo [SUCCESS] Imagem de desenvolvimento construída com sucesso!
echo [SUCCESS] Builds concluídos!
goto :end

:clean
echo [INFO] Limpando imagens Docker...
docker rmi sistema-reembolso:latest sistema-reembolso:dev 2>nul
docker system prune -f
echo [SUCCESS] Limpeza concluída!
goto :end

:end
echo.
echo [SUCCESS] Sistema de Reembolso - FIAP DevLeadership
echo [INFO] Aplicação disponível em:
if "%1"=="dev" (
    echo   🌐 http://localhost:3001
) else (
    echo   🌐 http://localhost:3000
)

