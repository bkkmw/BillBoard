FROM openjdk:11-jdk-slim
ARG JAR_FILE=build/libs/billboard-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENV JAVA_OPTS=""
ENTRYPOINT ["java","-jar","/app.jar"]