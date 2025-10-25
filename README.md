# Sistema de Reembolso - FIAP DevLeadership

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/jucelioalencar/FIAP_DevLeadership_Projeto_Reembolso_Frontend)
[![Demo](https://img.shields.io/badge/Demo-Online-green?style=for-the-badge&logo=vercel)](https://fiap.jucelio.work/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=for-the-badge&logo=docker)](https://github.com/jucelioalencar/FIAP_DevLeadership_Projeto_Reembolso_Frontend)

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como parte do curso **FIAP DevLeadership** e tem como objetivo demonstrar uma aplicação completa de sistema de reembolso com análise automática de documentos. O sistema simula um ambiente real de processamento de solicitações de reembolso de passagens aéreas, utilizando tecnologias modernas de frontend e integração com serviços de IA.

## 🎥 Apresentação do Projeto

**📺 Link APP: **: [https://fiap.jucelio.work/](https://fiap.jucelio.work/)

**🎬 Apresentação Completa no Vimeo**: [https://vimeo.com/1130565390](https://vimeo.com/1130565390)

> 🎬 **Assista à apresentação completa** do Sistema de Reembolso FIAP DevLeadership, incluindo demonstração das funcionalidades, arquitetura e conceitos aplicados.


## 🎯 Objetivo

O sistema foi criado para mostrar a aplicação prática de conceitos de **DevLeadership**, incluindo:

- **Automação de Processos**: Implementação de OCR (Reconhecimento Óptico de Caracteres) para extração automática de dados
- **Análise Inteligente**: Sistema de recomendação baseado em regras de negócio
- **Interface Moderna**: Dashboard interativo com métricas e KPIs em tempo real
- **Gestão de Workflow**: Processo completo de aprovação/reprovação de solicitações

## 🚀 Funcionalidades Principais

### 📊 Dashboard de Performance
- **KPIs em Tempo Real**: Tempo Médio de Análise (TMA), Taxa de Automação, Taxa de Erros
- **Gráficos Interativos**: Evolução do TMA, distribuição de status, processamento por dia
- **Monitoramento de Serviços**: Status dos microserviços (API Gateway, OCR, Validação, Análise)

### 📄 Gestão de Reembolsos
- **Listagem Completa**: Visualização de todas as solicitações com filtros e busca
- **Upload de Documentos**: Interface para envio de bilhetes aéreos (PDF, JPG, PNG)
- **Processamento Automático**: OCR com Azure AI Vision para extração de dados
- **Validação Externa**: Integração com APIs de companhias aéreas

### 🔍 Análise Detalhada
- **Visualização de Documentos**: Preview dos bilhetes aéreos submetidos
- **Dados Extraídos**: Informações estruturadas via OCR (passageiro, voo, rota, valores)
- **Validação Externa**: Confirmação de atrasos via APIs externas
- **Recomendações Automáticas**: Sistema de aprovação baseado em regras de negócio

### ⚙️ Processo de Aprovação
- **Workflow Inteligente**: Recomendações automáticas baseadas em critérios (atraso ≥ 4h)
- **Aprovação/Reprovação**: Interface para análise manual com comentários
- **Notificações**: Sistema de alertas para solicitantes

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** com TypeScript
- **Tailwind CSS** para estilização
- **Shadcn/ui** para componentes
- **Recharts** para gráficos e visualizações
- **Lucide React** para ícones

### Integração e Processamento
- **Azure AI Vision** para OCR
- **Azure Blob Storage** para armazenamento de documentos
- **Azure SQL Database** para persistência de dados
- **APIs Externas** para validação de voos (FlightAware)

### Arquitetura
- **Microserviços**: API Gateway, Serviço OCR, Serviço Validação, Serviço Análise
- **Processamento Assíncrono**: Upload e processamento em background
- **Monitoramento**: Status de serviços em tempo real

## 📈 Métricas e KPIs

O sistema demonstra melhorias significativas nos processos:

- **Tempo Médio de Análise (TMA)**: Redução de 8.5h para 3.4h (60% de melhoria)
- **Taxa de Automação**: 52% dos processos automatizados
- **Taxa de Erros**: Apenas 3.2% com redução de 22%
- **Processamento**: 228 reembolsos processados com distribuição equilibrada

## 🎨 Interface e UX

### Design System
- **Interface Moderna**: Design limpo e profissional
- **Responsividade**: Adaptável a diferentes tamanhos de tela
- **Acessibilidade**: Componentes acessíveis e intuitivos
- **Feedback Visual**: Indicadores de progresso e status claros

### Componentes Principais
- **Dashboard**: Métricas e gráficos interativos
- **Lista de Reembolsos**: Tabela com filtros e busca
- **Detalhes**: Visualização completa de cada solicitação
- **Upload**: Interface drag-and-drop para documentos

## 🔄 Fluxo de Processamento

1. **Upload**: Cliente envia bilhete aéreo via interface web
2. **Armazenamento**: Documento salvo no Azure Blob Storage
3. **OCR**: Azure AI Vision extrai dados estruturados
4. **Validação**: APIs externas confirmam informações do voo
5. **Análise**: Sistema aplica regras de negócio e gera recomendação
6. **Aprovação**: Analista revisa e aprova/reprova baseado na recomendação
7. **Notificação**: Cliente recebe resultado por e-mail

## 📱 Recursos de Demonstração

### Dados Mock
O sistema inclui dados de demonstração que simulam cenários reais:
- **5 Solicitações de Exemplo**: Diferentes status e cenários
- **Dados Realistas**: Informações de voos, passageiros e valores
- **Processamento Simulado**: Fluxo completo de upload e análise

### Cenários Cobertos
- ✅ **Aprovação Automática**: Atrasos ≥ 4 horas
- ⚠️ **Análise Manual**: Casos que requerem revisão humana
- ❌ **Reprovação**: Atrasos < 4 horas ou dados inconsistentes


## 🚀 Como Executar

### Opção 1: Git Clone + Docker (Recomendado)

```bash
# Clonar o repositório
git clone https://github.com/jucelioalencar/FIAP_DevLeadership_Projeto_Reembolso_Frontend.git
cd FIAP_DevLeadership_Projeto_Reembolso_Frontend

# Executar com Docker (produção)
docker-compose up --build -d

# Acessar a aplicação
# http://localhost:3000
```

### Opção 2: Instalação Local

```bash
# Clonar o repositório
git clone https://github.com/jucelioalencar/FIAP_DevLeadership_Projeto_Reembolso_Frontend.git
cd FIAP_DevLeadership_Projeto_Reembolso_Frontend

# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build
```

### 🌐 Acesso Online

**🔗 Demonstração Online**: [https://fiap.jucelio.work/](https://fiap.jucelio.work/)

> 📖 **Documentação Docker**: Para instruções detalhadas sobre Docker, consulte [DOCKER.md](./DOCKER.md)

## 📊 Estrutura do Projeto

```
├── components/
│   ├── Dashboard.tsx          # Dashboard com métricas
│   ├── ReembolsosList.tsx     # Lista de reembolsos
│   ├── ReembolsoDetail.tsx    # Detalhes de cada reembolso
│   ├── NovoReembolso.tsx      # Upload de novos documentos
│   └── ui/                    # Componentes de interface
├── styles/
│   └── globals.css           # Estilos globais
├── App.tsx                    # Componente principal
├── main.tsx                   # Ponto de entrada React
├── index.html                 # HTML base
├── package.json               # Dependências e scripts
├── tsconfig.json              # Configuração TypeScript
├── vite.config.ts             # Configuração Vite
├── tailwind.config.js         # Configuração Tailwind
├── postcss.config.js          # Configuração PostCSS
├── Dockerfile                 # Build de produção
├── Dockerfile.dev             # Build de desenvolvimento
├── docker-compose.yml         # Orquestração Docker
├── nginx.conf                 # Configuração Nginx
├── docker-build.bat           # Script Windows
├── docker-build.sh            # Script Linux/macOS
├── .dockerignore              # Arquivos ignorados no Docker
└── DOCKER.md                  # Documentação Docker
```

## 🎯 Conclusão

Este projeto representa uma aplicação completa em um cenário real de automação de processos. Demonstra como a tecnologia pode ser utilizada para:

- **Otimizar Processos**: Redução significativa de tempo e erros
- **Melhorar Experiência**: Interface intuitiva para usuários
- **Automatizar Decisões**: IA aplicada a regras de negócio
- **Monitorar Performance**: Métricas e KPIs em tempo real

O sistema serve como exemplo prático de como liderar transformações digitais, aplicando tecnologia para resolver problemas reais de negócio e criar valor para usuários e organizações.

## 🎬 Apresentação em Vídeo

**📺 Demonstração Completa**: [https://fiap.jucelio.work/](https://fiap.jucelio.work/)

A apresentação em vídeo demonstra:
- ✅ **Funcionalidades do Sistema**: Dashboard, gestão de reembolsos, análise automática
- ✅ **Arquitetura Técnica**: Microserviços, Docker, integração com Azure
- ✅ **Conceitos de DevLeadership**: Automação, métricas, liderança técnica
- ✅ **Demonstração Prática**: Upload de documentos, processamento OCR, aprovação/reprovação

## 🔗 Links Importantes

- **📺 Apresentação em Vídeo**: [https://fiap.jucelio.work/](https://fiap.jucelio.work/)
- **🎬 Apresentação Completa**: [Vimeo - Sistema de Reembolso FIAP](https://vimeo.com/1130565390)
- **🎬 Demonstração Visual**: <a href="https://imgcdn.dev/i/Yy0yND"><img src="https://s6.imgcdn.dev/Yy0yND.gif" alt="Demo GIF" width="200" border="0"></a>
- **💻 Código Fonte**: [GitHub Repository](https://github.com/jucelioalencar/FIAP_DevLeadership_Projeto_Reembolso_Frontend)
- **🐳 Docker Hub**: [Container Image](https://hub.docker.com/layers/devjucelio/reembolso/frontend_latest/)
- **📚 Documentação Docker**: [DOCKER.md](./DOCKER.md)

---

**Autor**: Jucelio Alencar  
**Curso**: FIAP DevLeadership  
**Instituição**: FIAP - Faculdade de Informática e Administração Paulista