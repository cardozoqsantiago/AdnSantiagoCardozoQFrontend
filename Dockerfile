#Primera Etapa
FROM node:10-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

#Segunda Etapa
FROM nginx:1.17.1-alpine
	#Si estas utilizando otra aplicacion cambia PokeApp por el nombre de tu app
COPY --from=build-step /app/dist/PokeApp /usr/share/nginx/html

#Primera Etapa:

#Utilizamos una imagen de Node
#Copiamos el código de la aplicación en una carpeta llamada app
#Instalamos las dependencias del archivo package.json
#Creamos los archivos de producción usando la imagen de Node

#Segunda Etapa:
#Utilizamos una imagen del servidor de Nginx para crear un servidor y poder desplegar la aplicación en este.
#Copiamos los archivos de producción de app/dist/PokeApp a la ruta /usr/share/nginx/html.
