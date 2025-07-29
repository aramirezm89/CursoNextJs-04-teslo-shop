# Descripción


## Correr en dev

1. Clonar el respositorio
2. Instalar dependencias ```npm install```
3. Copiar el archivo .env.template y renombrarlo a ```.env ```y setear las variables de entorno con los 
valores correspondientes
4. Levantar la base de datos  ```docker-compose up -d```
5. Correr las migraciones de prisma  ```npx prisma migrate dev```
6. Ejecutar seed de la base de datos  ```npm run prisma-seed```
7. correr el proyecto ```npm run dev```


## Correr en prod