# ✅ Checklist de Deploy - Sistema de Controle Financeiro

Use este checklist para acompanhar o progresso do deploy e garantir que nada seja esquecido.

## 📋 Pré-requisitos

- [ ] Java 17+ instalado
- [ ] Node.js 18+ instalado
- [ ] npm instalado
- [ ] Git configurado
- [ ] Conta no GitHub
- [ ] Conta no Render.com
- [ ] Conta no Vercel
- [ ] Conta no MongoDB Atlas (opcional)

## 🔧 Preparação Local

- [ ] Projeto clonado do GitHub
- [ ] Script `deploy.sh` executável
- [ ] Deploy local testado
- [ ] Aplicação funcionando localmente
- [ ] Testes básicos passando

## 🚀 Deploy do Backend (Render.com)

### Configuração Inicial
- [ ] Conta criada no Render.com
- [ ] Repositório conectado
- [ ] Novo Web Service criado
- [ ] Configurações básicas definidas

### Configurações do Serviço
- [ ] **Name**: `techsanca-backend`
- [ ] **Root Directory**: `backend`
- [ ] **Runtime**: `Java`
- [ ] **Build Command**: `./mvnw clean install -DskipTests`
- [ ] **Start Command**: `java -jar target/backend-1.0-SNAPSHOT.jar`
- [ ] **Health Check Path**: `/health`

### Variáveis de Ambiente
- [ ] `MONGODB_URI` configurada
- [ ] `JWT_SECRET` configurada
- [ ] `SERVER_PORT` configurada (8080)

### Deploy
- [ ] Serviço criado
- [ ] Build iniciado
- [ ] Build concluído com sucesso
- [ ] Aplicação iniciada
- [ ] Health check passando

### Testes do Backend
- [ ] Endpoint `/health` retorna "OK"
- [ ] Endpoint `/status` retorna informações
- [ ] API acessível via HTTPS
- [ ] CORS configurado corretamente

## 🌐 Deploy do Frontend (Vercel)

### Configuração Inicial
- [ ] Conta criada no Vercel
- [ ] Repositório conectado
- [ ] Novo projeto criado

### Configurações do Projeto
- [ ] **Framework Preset**: Vite
- [ ] **Root Directory**: `frontend`
- [ ] **Build Command**: `npm run build`
- [ ] **Output Directory**: `dist`

### Variáveis de Ambiente
- [ ] `VITE_API_URL` configurada com URL do backend

### Deploy
- [ ] Projeto criado
- [ ] Build iniciado
- [ ] Build concluído com sucesso
- [ ] Aplicação acessível

### Testes do Frontend
- [ ] Página carrega corretamente
- [ ] Login funciona
- [ ] Cadastro funciona
- [ ] Dashboard carrega
- [ ] Transações funcionam
- [ ] Categorias funcionam

## 🔗 Integração

### Conexão Backend-Frontend
- [ ] Frontend conecta com backend
- [ ] Login retorna token JWT
- [ ] Requisições autenticadas funcionam
- [ ] CORS não bloqueia requisições

### Funcionalidades Principais
- [ ] Login/Cadastro de usuários
- [ ] Criação de transações
- [ ] Listagem de transações
- [ ] Categorização
- [ ] Dashboard com gráficos
- [ ] Página de doação

## 🗄️ Banco de Dados

### MongoDB Atlas
- [ ] Conta criada
- [ ] Cluster criado
- [ ] Database criado
- [ ] URI de conexão obtida
- [ ] IPs liberados (se necessário)
- [ ] Usuário criado (se necessário)

### Dados Iniciais
- [ ] Categorias padrão criadas
- [ ] Usuário de teste criado
- [ ] Transações de teste criadas

## 🔒 Segurança

### Configurações de Segurança
- [ ] JWT_SECRET forte configurada
- [ ] HTTPS habilitado
- [ ] CORS configurado adequadamente
- [ ] Headers de segurança configurados

### Testes de Segurança
- [ ] Endpoints protegidos funcionam
- [ ] Tokens JWT expiram corretamente
- [ ] Acesso não autorizado bloqueado

## 📊 Monitoramento

### Logs e Debug
- [ ] Logs do backend acessíveis
- [ ] Logs do frontend acessíveis
- [ ] Health checks funcionando
- [ ] Métricas básicas disponíveis

### Alertas
- [ ] Notificações de erro configuradas
- [ ] Monitoramento de uptime configurado

## 🎯 Otimizações

### Performance
- [ ] Build otimizado
- [ ] Assets comprimidos
- [ ] Cache configurado
- [ ] CDN configurado (se aplicável)

### SEO
- [ ] Meta tags configuradas
- [ ] Sitemap gerado (se aplicável)
- [ ] Robots.txt configurado

## 📱 Testes Finais

### Funcionalidades
- [ ] Login em diferentes navegadores
- [ ] Responsividade em mobile
- [ ] Todas as páginas funcionam
- [ ] Formulários validam corretamente

### Integração Completa
- [ ] Fluxo completo de usuário testado
- [ ] Dados persistem corretamente
- [ ] Relatórios geram corretamente
- [ ] Exportação funciona

## 🚀 Go Live

### Preparação Final
- [ ] Domínio personalizado configurado (opcional)
- [ ] SSL/HTTPS configurado
- [ ] Backup configurado
- [ ] Documentação atualizada

### Lançamento
- [ ] Sistema testado em produção
- [ ] Usuários podem acessar
- [ ] Funcionalidades principais operacionais
- [ ] Monitoramento ativo

## 📞 Suporte Pós-Deploy

### Documentação
- [ ] README atualizado
- [ ] Guias de uso criados
- [ ] Troubleshooting documentado

### Manutenção
- [ ] Processo de atualização definido
- [ ] Backup automatizado configurado
- [ ] Monitoramento contínuo ativo

---

## 🎉 Deploy Concluído!

Se você marcou todos os itens acima, seu sistema está pronto para produção!

### URLs Finais
- **Backend**: `https://seu-backend.onrender.com`
- **Frontend**: `https://seu-frontend.vercel.app`
- **Health Check**: `https://seu-backend.onrender.com/health`

### Próximos Passos
1. Compartilhe as URLs com usuários
2. Configure monitoramento contínuo
3. Planeje próximas atualizações
4. Documente lições aprendidas

---

**💡 Dica**: Mantenha este checklist atualizado para futuros deploys! 