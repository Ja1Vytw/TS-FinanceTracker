# Usar Java 17
FROM openjdk:17-jdk-slim

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivo pom.xml da pasta backend
COPY backend/pom.xml .

# Copiar código fonte da pasta backend
COPY backend/src ./src

# Instalar Maven e compilar
RUN apt-get update && apt-get install -y maven
RUN mvn clean package -DskipTests

# Expor porta 8080
EXPOSE 8080

# Comando para executar a aplicação
CMD ["java", "-jar", "target/backend-1.0-SNAPSHOT.jar"] 