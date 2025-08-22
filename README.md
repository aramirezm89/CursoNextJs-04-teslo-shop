# Teslo Shop

Una aplicación de e-commerce moderna desarrollada con Next.js 15, que incluye autenticación, gestión de productos, carrito de compras y panel de administración.

## 🚀 Tecnologías Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **Estilos**: Tailwind CSS 4
- **Base de datos**: PostgreSQL con Prisma ORM
- **Autenticación**: NextAuth.js v5 (con Google OAuth)
- **Estado global**: Zustand
- **Formularios**: React Hook Form + Zod
- **UI Components**: React Icons, Swiper
- **Contenedores**: Docker & Docker Compose

## 📋 Características

- ✅ Autenticación con credenciales y Google OAuth
- ✅ Catálogo de productos con filtros y búsqueda
- ✅ Carrito de compras persistente
- ✅ Gestión de pedidos
- ✅ Panel de administración
- ✅ Responsive design
- ✅ Optimización de imágenes
- ✅ SEO optimizado

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js 18+ 
- Docker y Docker Compose
- Git

### Configuración para Desarrollo

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd teslo-shop
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp env.template .env
   ```
   Edita el archivo `.env` con tus valores:
   - `DB_USER`, `DB_PASSWORD`, `DB_NAME`: Credenciales de la base de datos
   - `DATABASE_URL`: URL de conexión a PostgreSQL (se genera automáticamente)
   - `AUTH_SECRET`: Clave secreta para NextAuth.js
   - `AUTH_GOOGLE_ID` y `AUTH_GOOGLE_SECRET`: Para OAuth con Google (opcional)

4. **Levantar la base de datos**
   ```bash
   docker-compose up -d
   ```

5. **Ejecutar migraciones de Prisma**
   ```bash
   npx prisma migrate dev
   ```

6. **Poblar la base de datos con datos de prueba**
   ```bash
   npm run prisma-seed
   ```

7. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

La aplicación estará disponible en `http://localhost:3000`

## 🐳 Base de Datos con Docker

El archivo `docker-compose.yml` está configurado para levantar únicamente la base de datos PostgreSQL:

```bash
# Levantar la base de datos PostgreSQL
docker-compose up -d

# Ver los logs de la base de datos
docker-compose logs postgres-db

# Detener la base de datos
docker-compose down
```

**Nota**: La aplicación Next.js se ejecuta directamente con `npm run dev`, no está containerizada.

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo con Turbopack
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter
- `npm run prisma-seed` - Pobla la base de datos con datos de prueba

## 🗄️ Base de Datos

El proyecto utiliza PostgreSQL con Prisma ORM. La base de datos incluye las siguientes entidades principales:

- **Users**: Usuarios del sistema
- **Products**: Productos del catálogo
- **Categories**: Categorías de productos
- **Orders**: Pedidos realizados
- **OrderItems**: Items de cada pedido

### Comandos útiles de Prisma

```bash
# Ver la base de datos en el navegador
npx prisma studio

# Resetear la base de datos
npx prisma migrate reset

# Generar el cliente de Prisma
npx prisma generate
```

## 🔐 Autenticación

El sistema soporta dos métodos de autenticación:

1. **Credenciales**: Email y contraseña
2. **Google OAuth**: Autenticación con cuenta de Google

Para configurar Google OAuth, necesitas:
- Crear un proyecto en Google Cloud Console
- Configurar las credenciales OAuth 2.0
- Agregar las variables `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` al archivo `.env`

## 🚀 Despliegue en Producción

### Variables de entorno para producción

Asegúrate de configurar las siguientes variables:

```bash
DATABASE_URL=postgresql://user:password@host:port/database
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://your-domain.com
NODE_ENV=production
```

### Comandos de producción

```bash
# Construir la aplicación
npm run build

# Iniciar en modo producción
npm start
```

## 📁 Estructura del Proyecto

```
src/
├── actions/          # Server actions
├── app/             # App Router (Next.js 13+)
├── components/      # Componentes reutilizables
├── config/          # Configuraciones
├── interfaces/      # Definiciones de tipos
├── seed/           # Scripts de semillas
└── utils/          # Utilidades
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

Desarrollado como parte del curso de Next.js de Fernando Herrera.

## 🐛 Reporte de Issues

Si encuentras algún problema, por favor abre un issue en el repositorio de GitHub.