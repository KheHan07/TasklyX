# Build stage: use a Maven image with JDK 17 (Eclipse Temurin)
FROM maven:3.9.2-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage: use a lightweight JDK 17 image
FROM eclipse-temurin:17-jdk-alpine
COPY --from=build /app/target/taskmanager-0.0.1-SNAPSHOT.jar /app/taskmanager.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/taskmanager.jar"]
