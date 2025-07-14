# 💰 Sistema de Controle Financeiro - TechSanca

Um sistema completo de controle financeiro pessoal desenvolvido com **React** (frontend) e **Spring Boot** (backend), oferecendo uma solução gratuita e de código aberto para gerenciar suas finanças pessoais.

![TechSanca Finance](https://img.shields.io/badge/TechSanca-Finance-blue)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Funcionalidades

### ✨ Principais Recursos
- **Dashboard Interativo**: Visualização completa das suas finanças com gráficos e métricas
- **Gestão de Transações**: Adicione, edite e exclua receitas e despesas
- **Categorização Inteligente**: Organize suas transações por categorias personalizáveis
- **Relatórios e Exportação**: Exporte seus dados em CSV para análise externa
- **Filtros Avançados**: Filtre transações por período, categoria, tipo e busca textual
- **Interface Responsiva**: Funciona perfeitamente em desktop, tablet e mobile
- **Autenticação Segura**: Sistema de login e cadastro com JWT
- **Categorias Padrão**: Novos usuários recebem categorias pré-configuradas automaticamente

### 📊 Dashboard
- **Resumo Financeiro**: Saldo atual, receitas e despesas do mês
- **Gráfico de Pizza**: Distribuição de gastos por categoria
- **Gráfico de Barras**: Evolução de receitas vs despesas (últimos 6 meses)
- **Últimas Transações**: Lista das transações mais recentes

### 💳 Transações
- **CRUD Completo**: Criar, visualizar, editar e excluir transações
- **Validação de Dados**: Formulários com validação em tempo real
- **Paginação**: Navegação por páginas para melhor performance
- **Ordenação**: Transações ordenadas por data (mais recentes primeiro)
- **Filtros Múltiplos**: Busca, categoria, tipo e período
- **Exportação CSV**: Exporte suas transações para análise externa

### 🏷️ Categorias
- **Gestão Personalizada**: Crie suas próprias categorias
- **Tipos Separados**: Categorias para receitas e despesas
- **Ícones Visuais**: Cada categoria tem seu ícone representativo
- **Categorias Padrão**: Novos usuários recebem categorias comuns automaticamente

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19.1.0**: Biblioteca JavaScript para interfaces
- **Vite**: Build tool e dev server
- **Lucide React**: Ícones modernos
- **Recharts**: Biblioteca de gráficos
- **Axios**: Cliente HTTP
- **CSS Custom Properties**: Sistema de design consistente

### Backend
- **Spring Boot 3.x**: Framework Java para APIs REST
- **Spring Security**: Autenticação e autorização
- **Spring Data MongoDB**: Integração com MongoDB
- **JWT**: Autenticação baseada em tokens
- **MongoDB Atlas**: Banco de dados na nuvem
- **Maven**: Gerenciamento de dependências

### Infraestrutura
- **MongoDB Atlas**: Banco de dados na nuvem
- **Vercel**: Deploy do frontend
- **Railway/Heroku**: Deploy do backend (recomendado)

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **Java JDK** (versão 17 ou superior)
- **Maven** (versão 3.6 ou superior)
- **Git**

## 🚀 Como Executar o Projeto

### 1. Clone o Repositório

```bash
git clone https://github.com/Ja1Vytw/TS-FinanceTracker.git
```

### 2. Configuração do Backend

#### 2.1. Configure o MongoDB
1. Crie uma conta no [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crie um novo cluster
3. Configure o acesso de rede (IP 0.0.0.0/0 para desenvolvimento)
4. Crie um usuário de banco de dados
5. Obtenha a string de conexão

#### 2.2. Configure as Variáveis de Ambiente
Edite o arquivo `backend/src/main/resources/application.properties`:

```properties
# Substitua pela sua string de conexão do MongoDB Atlas
spring.data.mongodb.uri=mongodb+srv://seu-usuario:sua-senha@seu-cluster.mongodb.net/finance?retryWrites=true&w=majority

# Configurações do banco
spring.data.mongodb.database=finance

# Configurações da aplicação
spring.main.allow-bean-definition-overriding=true

# Documentação da API
springdoc.api-docs.enabled=true
springdoc.swagger-ui.enabled=true
springdoc.swagger-ui.path=/swagger-ui.html

# CORS para integração com frontend
spring.web.cors.allowed-origins=*
spring.web.cors.allowed-methods=*
spring.web.cors.allowed-headers=*
```

#### 2.3. Execute o Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

O backend estará disponível em: `http://localhost:8080`

**Documentação da API**: `http://localhost:8080/swagger-ui.html`

### 3. Configuração do Frontend

#### 3.1. Instale as Dependências

```bash
cd frontend
npm install
```

#### 3.2. Configure a URL da API
Edite o arquivo `frontend/src/services/api.js` e atualize a URL da API:

```javascript
const API_BASE_URL = 'http://localhost:8080/api' // para desenvolimento local
// const API_BASE_URL = 'https://seu-backend.railway.app/api' // se for para produção
```

#### 3.3. Execute o Frontend

```bash
npm run dev
```

O frontend estará disponível em: `http://localhost:5173` // por padrão, mas pode ser alterado caso já esteja em uso

## 📱 Como Usar

### 1. Primeiro Acesso
1. Acesse a aplicação no navegador
2. Clique em "Criar Conta"
3. Preencha seus dados (nome, email e senha)
4. Faça login com suas credenciais

### 2. Categorias Padrão
Ao criar uma conta, você receberá automaticamente categorias comuns:
- **Despesas**: Alimentação, Transporte, Moradia, Saúde, Educação, Lazer, Cartão de Crédito, Contas, Vestuário, Outros
- **Receitas**: Salário, Freelance, Investimentos, Bônus, Outros

### 3. Adicionando Transações
1. Vá para a página "Transações"
2. Clique em "Nova Transação"
3. Preencha os dados (descrição, valor, categoria, data, tipo)
4. Clique em "Salvar"

### 4. Visualizando Relatórios
1. Acesse o "Dashboard" para ver o resumo geral
2. Use os filtros na página "Transações" para análises específicas
3. Exporte dados em CSV para análise externa

## 🏗️ Estrutura do Projeto

```
techsanca-finance/
├── backend/                          # Backend Spring Boot
│   ├── src/main/java/com/techsanca/finance/
│   │   ├── config/                   # Configurações (Security, JWT, CORS)
│   │   ├── controller/               # Controllers REST
│   │   ├── model/                    # Entidades (User, Transacao, Categoria)
│   │   ├── repository/               # Repositórios MongoDB
│   │   └── service/                  # Lógica de negócio
│   ├── src/main/resources/
│   │   └── application.properties    # Configurações da aplicação
│   └── pom.xml                       # Dependências Maven
├── frontend/                         # Frontend React
│   ├── src/
│   │   ├── components/               # Componentes React
│   │   │   ├── ui/                   # Componentes de UI
│   │   │   ├── layout/               # Layout (Header, Sidebar)
│   │   │   ├── charts/               # Gráficos
│   │   │   └── modals/               # Modais
│   │   ├── pages/                    # Páginas da aplicação
│   │   ├── contexts/                 # Contextos React
│   │   ├── services/                 # Serviços de API
│   │   ├── styles/                   # Arquivos CSS
│   │   └── hooks/                    # Hooks customizados
│   ├── package.json                  # Dependências Node.js
│   └── vite.config.js               # Configuração Vite
└── README.md                         # Este arquivo
```

## 🔧 Configuração para Produção

### Deploy do Backend

#### Railway (Recomendado)
1. Crie uma conta no [Railway](https://railway.app)
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente:
   - `MONGODB_URI`: Sua string de conexão MongoDB
4. Deploy automático a cada push

#### Heroku
1. Crie uma conta no [Heroku](https://heroku.com)
2. Instale o Heroku CLI
3. Execute:
```bash
heroku create seu-app-name
heroku config:set MONGODB_URI=sua-string-conexao
git push heroku main
```

### Deploy do Frontend

#### Vercel (Recomendado)
1. Crie uma conta no [Vercel](https://vercel.com)
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente:
   - `VITE_API_URL`: URL do seu backend
4. Deploy automático a cada push

#### Netlify
1. Crie uma conta no [Netlify](https://netlify.com)
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente
4. Deploy automático

## 🔒 Segurança

- **Autenticação JWT**: Tokens seguros para autenticação
- **Senhas Criptografadas**: BCrypt para hash de senhas
- **CORS Configurado**: Controle de acesso cross-origin
- **Validação de Dados**: Validação tanto no frontend quanto no backend
- **Filtros de Segurança**: Spring Security configurado

## 📊 API Endpoints

### Autenticação
- `POST /api/usuarios/cadastro` - Cadastrar usuário
- `POST /api/usuarios/login` - Fazer login

### Transações
- `GET /api/transacoes/usuario/{usuarioId}` - Listar transações
- `POST /api/transacoes` - Criar transação
- `PUT /api/transacoes/{id}` - Atualizar transação
- `DELETE /api/transacoes/{id}` - Excluir transação

### Categorias
- `GET /api/categorias/usuario/{usuarioId}` - Listar categorias
- `POST /api/categorias` - Criar categoria
- `PUT /api/categorias/{id}` - Atualizar categoria
- `DELETE /api/categorias/{id}` - Excluir categoria

### Dashboard
- `GET /api/dashboard/resumo/{usuarioId}` - Obter resumo financeiro

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- **MongoDB Atlas** pelo banco de dados gratuito
- **Vercel** pelo hosting gratuito do frontend
- **Railway** pelo hosting gratuito do backend
- **Lucide** pelos ícones incríveis
- **Recharts** pelos gráficos interativos

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. **Issues**: Abra uma issue no GitHub
2. **Email**: contato@techsanca.com.br

## 💝 Apoie o Projeto

Se este sistema te ajudou, considere fazer uma doação para ajudar a manter o projeto ativo e gratuito!

**Chave PIX:**
```
af72c238-0345-45e4-95c7-27471b999436
```

**Banco:** 0260 (Nubank)
**Agência:** 0001
**Conta:** 88555295-2

**QR Code PIX:**

![QR Code PIX](frontend/src/assets/qrcode_pix.png)

Você pode doar qualquer valor escaneando o QR Code acima ou copiando a chave PIX. Obrigado pelo apoio! 💜

---

**Desenvolvido com ❤️ por João Vitor**

⭐ Se este projeto te ajudou, deixe uma estrela no GitHub! 

## Configuração do MongoDB (Segurança)

Para proteger sua senha do banco de dados, **NÃO coloque a string de conexão real no arquivo `application.properties`**. Use a variável de ambiente `MONGODB_URI`.

1. Copie o arquivo `backend/src/main/resources/application-example.properties` para `application.properties`.
2. Não preencha a senha no arquivo, apenas use:
   ```
   spring.data.mongodb.uri=${MONGODB_URI}
   ```
3. Defina a variável de ambiente `MONGODB_URI` com sua string de conexão completa, por exemplo:
   ```
   export MONGODB_URI="mongodb+srv://usuario:senha@cluster.mongodb.net/nomeDoBanco"
   ```
4. No deploy (Render, Heroku, etc.), configure a variável de ambiente pelo painel da plataforma.

O arquivo `application.properties` já está no `.gitignore` para evitar subir informações sensíveis. 