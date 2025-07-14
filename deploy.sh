#!/bin/bash

# Script de Deploy Automatizado - Sistema de Controle Financeiro
# Este script automatiza o processo de deploy do backend e frontend

echo "🚀 Iniciando deploy do Sistema de Controle Financeiro..."
echo "=================================================="

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

# Verificar pré-requisitos
check_prerequisites() {
    print_status "Verificando pré-requisitos..."
    
    # Verificar Java
    if command -v java &> /dev/null; then
        JAVA_VERSION=$(java -version 2>&1 | head -n 1 | cut -d'"' -f2)
        print_success "Java encontrado: $JAVA_VERSION"
    else
        print_error "Java não encontrado. Instale Java 17 ou superior."
        exit 1
    fi
    
    # Verificar Node.js
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js encontrado: $NODE_VERSION"
    else
        print_error "Node.js não encontrado. Instale Node.js 18 ou superior."
        exit 1
    fi
    
    # Verificar npm
    if command -v npm &> /dev/null; then
        NPM_VERSION=$(npm --version)
        print_success "npm encontrado: $NPM_VERSION"
    else
        print_error "npm não encontrado."
        exit 1
    fi
    
    # Verificar Maven
    if command -v mvn &> /dev/null; then
        MVN_VERSION=$(mvn --version | head -n 1)
        print_success "Maven encontrado: $MVN_VERSION"
    else
        print_warning "Maven não encontrado. Usando Maven Wrapper."
    fi
}

# Deploy do Backend
deploy_backend() {
    print_status "Iniciando deploy do Backend..."
    
    cd backend
    
    # Verificar se o Maven Wrapper existe
    if [ ! -f "./mvnw" ]; then
        print_error "Maven Wrapper não encontrado. Execute 'mvn wrapper:wrapper' primeiro."
        exit 1
    fi
    
    # Limpar e compilar
    print_status "Compilando backend..."
    ./mvnw clean install -DskipTests
    
    if [ $? -eq 0 ]; then
        print_success "Backend compilado com sucesso!"
    else
        print_error "Erro na compilação do backend."
        exit 1
    fi
    
    # Verificar se o JAR foi gerado
    if [ -f "target/backend-1.0-SNAPSHOT.jar" ]; then
        print_success "JAR gerado: target/backend-1.0-SNAPSHOT.jar"
    else
        print_error "JAR não foi gerado."
        exit 1
    fi
    
    cd ..
}

# Deploy do Frontend
deploy_frontend() {
    print_status "Iniciando deploy do Frontend..."
    
    cd frontend
    
    # Instalar dependências
    print_status "Instalando dependências..."
    npm install
    
    if [ $? -eq 0 ]; then
        print_success "Dependências instaladas!"
    else
        print_error "Erro ao instalar dependências."
        exit 1
    fi
    
    # Build do projeto
    print_status "Fazendo build do frontend..."
    npm run build
    
    if [ $? -eq 0 ]; then
        print_success "Frontend buildado com sucesso!"
    else
        print_error "Erro no build do frontend."
        exit 1
    fi
    
    # Verificar se a pasta dist foi criada
    if [ -d "dist" ]; then
        print_success "Build gerado em: dist/"
    else
        print_error "Pasta dist não foi criada."
        exit 1
    fi
    
    cd ..
}

# Verificar configurações
check_configurations() {
    print_status "Verificando configurações..."
    
    # Verificar application.properties
    if [ -f "backend/src/main/resources/application.properties" ]; then
        print_success "application.properties encontrado"
    else
        print_warning "application.properties não encontrado"
    fi
    
    # Verificar package.json
    if [ -f "frontend/package.json" ]; then
        print_success "package.json encontrado"
    else
        print_error "package.json não encontrado"
        exit 1
    fi
    
    # Verificar api.js
    if [ -f "frontend/src/api/api.js" ]; then
        print_success "api.js encontrado"
    else
        print_warning "api.js não encontrado"
    fi
}

# Gerar arquivos de configuração
generate_config_files() {
    print_status "Gerando arquivos de configuração..."
    
    # Criar .env para backend (se não existir)
    if [ ! -f "backend/.env" ]; then
        cat > backend/.env << EOF
# Configurações do Backend
MONGODB_URI=mongodb://localhost:27017/finance
JWT_SECRET=sua_chave_secreta_jwt_aqui
SERVER_PORT=8080
EOF
        print_success "Arquivo .env criado em backend/"
    fi
    
    # Criar .env para frontend (se não existir)
    if [ ! -f "frontend/.env" ]; then
        cat > frontend/.env << EOF
# Configurações do Frontend
VITE_API_URL=http://localhost:8080/api
EOF
        print_success "Arquivo .env criado em frontend/"
    fi
}

# Testar aplicação localmente
test_local() {
    print_status "Testando aplicação localmente..."
    
    # Testar backend
    print_status "Iniciando backend..."
    cd backend
    java -jar target/backend-1.0-SNAPSHOT.jar &
    BACKEND_PID=$!
    cd ..
    
    # Aguardar backend iniciar
    sleep 10
    
    # Testar health check
    if curl -s http://localhost:8080/health > /dev/null; then
        print_success "Backend está rodando!"
    else
        print_warning "Backend pode não estar rodando corretamente"
    fi
    
    # Parar backend
    kill $BACKEND_PID 2>/dev/null
    
    print_success "Testes locais concluídos!"
}

# Mostrar próximos passos
show_next_steps() {
    echo ""
    echo "🎉 Deploy local concluído com sucesso!"
    echo "=================================================="
    echo ""
    echo "📋 Próximos passos para deploy em produção:"
    echo ""
    echo "1. 🔧 Configure o MongoDB:"
    echo "   - Crie uma conta no MongoDB Atlas"
    echo "   - Obtenha a URI de conexão"
    echo "   - Atualize MONGODB_URI no .env"
    echo ""
    echo "2. 🚀 Deploy do Backend no Render.com:"
    echo "   - Acesse render.com"
    echo "   - Conecte seu repositório GitHub"
    echo "   - Configure as variáveis de ambiente"
    echo "   - Deploy automático"
    echo ""
    echo "3. 🌐 Deploy do Frontend no Vercel:"
    echo "   - Acesse vercel.com"
    echo "   - Conecte seu repositório GitHub"
    echo "   - Configure a URL da API"
    echo "   - Deploy automático"
    echo ""
    echo "4. 🔗 Configure a integração:"
    echo "   - Atualize VITE_API_URL no frontend"
    echo "   - Teste login e funcionalidades"
    echo ""
    echo "📖 Consulte o arquivo DEPLOY_GUIDE.md para instruções detalhadas"
    echo ""
}

# Menu principal
main() {
    echo "Escolha uma opção:"
    echo "1) Deploy completo (backend + frontend)"
    echo "2) Deploy apenas backend"
    echo "3) Deploy apenas frontend"
    echo "4) Verificar pré-requisitos"
    echo "5) Gerar arquivos de configuração"
    echo "6) Testar localmente"
    echo "7) Sair"
    echo ""
    read -p "Digite sua opção (1-7): " choice
    
    case $choice in
        1)
            check_prerequisites
            check_configurations
            generate_config_files
            deploy_backend
            deploy_frontend
            test_local
            show_next_steps
            ;;
        2)
            check_prerequisites
            deploy_backend
            ;;
        3)
            check_prerequisites
            deploy_frontend
            ;;
        4)
            check_prerequisites
            ;;
        5)
            generate_config_files
            ;;
        6)
            test_local
            ;;
        7)
            print_status "Saindo..."
            exit 0
            ;;
        *)
            print_error "Opção inválida!"
            main
            ;;
    esac
}

# Executar script
if [ "$1" = "--auto" ]; then
    # Modo automático
    check_prerequisites
    check_configurations
    generate_config_files
    deploy_backend
    deploy_frontend
    show_next_steps
else
    # Modo interativo
    main
fi 