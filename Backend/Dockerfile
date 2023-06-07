# syntax=docker/dockerfile:1.4

FROM node

# Create Hozla_App directory
WORKDIR /Hozla_App

COPY package.json .
COPY package-lock.json .
# RUN npm install

# Get all the code needed to run the Hozla_App not inatalltion of packages they are coppied
COPY . .

EXPOSE 5000

CMD [ "npm", "run", "devStart" ]

# FROM development as dev-envs
# RUN <<EOF
# apt-get update
# apt-get install -y --no-install-recommends git
# EOF

# RUN <<EOF
# useradd -s /bin/bash -m vscode
# groupadd docker
# usermod -aG docker vscode
# EOF
# # install Docker tools (cli, buildx, compose)
# COPY --from=gloursdocker/docker / /
# CMD [ "npm", "run", "dev" ]