# 🚀 Deploy Rápido - Sistema de Controle Financeiro

Este guia te ajudará a fazer o deploy do sistema em **5 minutos**!

## ⚡ Deploy Automático

### 1. Preparar o Projeto

```bash
# Clone o repositório (se ainda não fez)
git clone <seu-repositorio>
cd techsanca-landing

# Torne o script executável
chmod +x deploy.sh

# Execute o deploy local
./deploy.sh --auto
```

### 2. Deploy no Render.com (Backend)

1. **Acesse**: [render.com](https://render.com)
2. **Faça login** com GitHub
3. **Clique**: "New +" → "Web Service"
4. **Conecte** seu repositório
5. **Configure**:
   - **Name**: `techsanca-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Java`
   - **Build Command**: `./mvnw clean install -DskipTests`
   - **Start Command**: `java -jar target/backend-1.0-SNAPSHOT.jar`

6. **Variáveis de Ambiente**:
   ```
   MONGODB_URI=sua_uri_mongodb
   JWT_SECRET=sua_chave_secreta
   SERVER_PORT=8080
   ```

7. **Clique**: "Create Web Service"

### 3. Deploy no Vercel (Frontend)

1. **Acesse**: [vercel.com](https://vercel.com)
2. **Faça login** com GitHub
3. **Clique**: "New Project"
4. **Conecte** seu repositório
5. **Configure**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. **Variáveis de Ambiente**:
   ```
   VITE_API_URL=https://seu-backend.onrender.com/api
   ```

7. **Clique**: "Deploy"

## 🔧 Configuração do MongoDB

### Opção 1: MongoDB Atlas (Recomendado)

1. **Acesse**: [mongodb.com/atlas](https://mongodb.com/atlas)
2. **Crie conta gratuita**
3. **Crie cluster gratuito**
4. **Obtenha URI de conexão**
5. **Configure no Render.com**

### Opção 2: MongoDB Local

```bash
# Instale MongoDB
# Use URI: mongodb://localhost:27017/finance
```

## ✅ Verificar Deploy

### Backend
```bash
curl https://seu-backend.onrender.com/health
# Deve retornar: OK
```

### Frontend
- Acesse a URL do Vercel
- Teste login e funcionalidades

## 🚨 Problemas Comuns

### Backend não inicia
- Verifique variáveis de ambiente
- Confirme MongoDB está acessível
- Verifique logs no Render

### Frontend não conecta
- Verifique URL da API
- Confirme CORS está configurado
- Teste API diretamente

### Erro de build
- Verifique dependências
- Confirme Java 17+
- Verifique logs de build

## 📞 Suporte

Se encontrar problemas:

1. **Verifique logs** de deploy
2. **Teste localmente** primeiro
3. **Confirme configurações** de ambiente
4. **Verifique conectividade** com MongoDB

## 🎯 Próximos Passos

Após deploy bem-sucedido:

- [ ] Configure domínio personalizado
- [ ] Configure SSL/HTTPS
- [ ] Configure monitoramento
- [ ] Configure backup
- [ ] Configure analytics

---

**💡 Dica**: Use o script `deploy.sh` para automatizar o processo local! 