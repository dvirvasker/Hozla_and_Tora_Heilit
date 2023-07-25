
# Create image based on the official Node image from dockerhub
FROM node:19.8.2

# Create Hozla_App directory
WORKDIR /Hozla_App

# Copy dependency definitions
COPY package.json .
COPY package-lock.json .
# RUN npm install


# Get all the code needed to run the Hozla_App not inatalltion of packages they are coppied
COPY . .

# Expose the port the Hozla_App runs in
EXPOSE 3000

# Serve the Hozla_App
CMD ["npm", "start"]

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
# install Docker tools (cli, buildx, compose)
# COPY --from=gloursdocker/docker / /
# CMD [ "npm", "start" ]