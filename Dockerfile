FROM jenkins/jenkins:lts

USER root

ARG DOCKER_GID=999

# Dodaj grupę docker i dodaj użytkownika jenkins do tej grupy
RUN groupadd -g ${DOCKER_GID} docker && \
    usermod -aG docker jenkins

# Zainstaluj Docker CLI i rsync
RUN apt-get update && \
    apt-get install -y docker.io rsync && \
    apt-get clean

USER jenkins



