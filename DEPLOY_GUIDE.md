# Guia de Deploy - Sistema de Controle Financeiro

Este guia te ajudará a fazer o deploy completo do sistema de controle financeiro, incluindo backend Spring Boot e frontend React.

## 📋 Pré-requisitos

- Java 17 ou superior
- Node.js 18 ou superior
- MongoDB (local ou na nuvem)
- Conta no GitHub
- Conta no Render.com (gratuita para deploy)

## 🚀 Deploy do Backend (Spring Boot)

### Passo 1: Preparar o Backend

1. **Configurar variáveis de ambiente**
   - Crie um arquivo `.env` na raiz do projeto backend
   - Configure as variáveis necessárias:

```bash
# Database
MONGODB_URI=sua_uri_do_mongodb

# JWT
JWT_SECRET=sua_chave_secreta_jwt

# Server
SERVER_PORT=8080
```

2. **Atualizar application.properties**
   - Certifique-se que o arquivo `backend/src/main/resources/application.properties` está configurado:

```properties
# MongoDB
spring.data.mongodb.uri=${MONGODB_URI:mongodb://localhost:27017/finance}

# JWT
jwt.secret=${JWT_SECRET:defaultSecretKey}

# Server
server.port=${SERVER_PORT:8080}

# CORS
spring.web.cors.allowed-origins=*
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
```

### Passo 2: Deploy no Render.com

1. **Criar conta no Render.com**
   - Acesse [render.com](https://render.com)
   - Faça login com sua conta GitHub

2. **Criar novo Web Service**
   - Clique em "New +" → "Web Service"
   - Conecte seu repositório GitHub
   - Selecione o repositório do projeto

3. **Configurar o serviço**
   - **Name**: `techsanca-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Java`
   - **Build Command**: `./mvnw clean install`
   - **Start Command**: `java -jar target/backend-1.0-SNAPSHOT.jar`

4. **Configurar variáveis de ambiente**
   - Vá em "Environment" → "Environment Variables"
   - Adicione as variáveis:
     - `MONGODB_URI`: sua URI do MongoDB
     - `JWT_SECRET`: sua chave JWT secreta
     - `SERVER_PORT`: 8080

5. **Deploy**
   - Clique em "Create Web Service"
   - Aguarde o build e deploy (pode levar alguns minutos)

### Passo 3: Configurar MongoDB

1. **Opção 1: MongoDB Atlas (Recomendado)**
   - Acesse [mongodb.com/atlas](https://mongodb.com/atlas)
   - Crie uma conta gratuita
   - Crie um cluster gratuito
   - Obtenha a URI de conexão
   - Configure no Render.com

2. **Opção 2: MongoDB Local**
   - Instale MongoDB localmente
   - Use a URI: `mongodb://localhost:27017/finance`

## 🌐 Deploy do Frontend (React)

### Passo 1: Preparar o Frontend

1. **Configurar API URL**
   - Edite o arquivo `frontend/src/api/api.js`
   - Atualize a URL base para o backend deployado:

```javascript
const API_BASE_URL = 'https://seu-backend.onrender.com/api';
```

2. **Configurar CORS**
   - Certifique-se que o backend permite requisições do frontend

### Passo 2: Deploy no Vercel

1. **Criar conta no Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub

2. **Importar projeto**
   - Clique em "New Project"
   - Conecte seu repositório GitHub
   - Selecione o repositório

3. **Configurar o projeto**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Configurar variáveis de ambiente**
   - Vá em "Settings" → "Environment Variables"
   - Adicione:
     - `VITE_API_URL`: URL do seu backend (ex: https://seu-backend.onrender.com/api)

5. **Deploy**
   - Clique em "Deploy"
   - Aguarde o build e deploy

### Passo 3: Configurar domínio personalizado (Opcional)

1. **No Vercel**
   - Vá em "Settings" → "Domains"
   - Adicione seu domínio personalizado
   - Configure os registros DNS conforme instruções

## 🔧 Configurações Adicionais

### Configurar CORS no Backend

Certifique-se que o `WebConfig.java` está configurado corretamente:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}
```

### Configurar Health Check

Adicione um endpoint de health check no backend:

```java
@RestController
public class HealthController {
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("OK");
    }
}
```

## 📱 Testando o Deploy

1. **Testar Backend**
   - Acesse: `https://seu-backend.onrender.com/health`
   - Deve retornar "OK"

2. **Testar Frontend**
   - Acesse a URL do Vercel
   - Teste login, cadastro e funcionalidades

3. **Testar Integração**
   - Faça login no frontend
   - Teste criar transações
   - Verifique se os dados aparecem no MongoDB

## 🚨 Troubleshooting

### Problemas Comuns

1. **Backend não inicia**
   - Verifique as variáveis de ambiente no Render
   - Confirme se o MongoDB está acessível
   - Verifique os logs no Render

2. **Frontend não conecta com backend**
   - Verifique a URL da API no frontend
   - Confirme se o CORS está configurado
   - Teste a API diretamente

3. **Erro de build**
   - Verifique se todas as dependências estão no package.json
   - Confirme se o Java 17 está sendo usado
   - Verifique os logs de build

### Logs e Debug

1. **Render.com**
   - Vá em "Logs" para ver logs do backend
   - Use "Manual Deploy" para forçar novo deploy

2. **Vercel**
   - Vá em "Functions" para ver logs do frontend
   - Use "Redeploy" para forçar novo deploy

## 🔄 Atualizações

Para atualizar o sistema:

1. **Backend**
   - Faça push para o GitHub
   - O Render fará deploy automático

2. **Frontend**
   - Faça push para o GitHub
   - O Vercel fará deploy automático

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs de deploy
2. Teste localmente primeiro
3. Confirme as configurações de ambiente
4. Verifique a conectividade com MongoDB

## 🎉 Próximos Passos

Após o deploy bem-sucedido:

1. Configure monitoramento
2. Configure backup do MongoDB
3. Configure SSL/HTTPS
4. Configure CDN para assets
5. Configure analytics

---

**Nota**: Este guia assume que você está usando Render.com para o backend e Vercel para o frontend. Outras plataformas como Heroku, Railway, ou Netlify também podem ser usadas com configurações similares. 