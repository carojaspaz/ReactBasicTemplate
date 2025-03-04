# Usamos una imagen base de Node.js para construir la aplicación
FROM node:20 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios
COPY package.json package-lock.json ./
RUN npm install


# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Usamos una imagen ligera de Nginx para servir la aplicación
FROM nginx:alpine

# Copiamos los archivos compilados a la carpeta de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto
EXPOSE 8060

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
