# ABANK
Este proyecto es una aplicación web ASP.NET Core que permite registrar, ver y gestionar datos de clientes. Ofrece seguridad y facilidad de uso al separar el frontend y backend, y proporciona documentación.
Indicaciones para Levantar el Proyecto:

1. Configuración del Entorno:

Asegúrese de tener instaladas todas las herramientas necesarias para el desarrollo del proyecto, incluyendo .NET 6 SDK, Node.js, Angular CLI y PostgreSQL.
2. Descargar Dependencias del Backend:

Abra una terminal y navegue hasta el directorio raíz del proyecto de ASP.NET Core Web API.
Ejecute el comando dotnet restore para restaurar las dependencias del proyecto.
3. Configuración de la Base de Datos:

Asegúrese de tener PostgreSQL instalado y en funcionamiento en su máquina.
Cree una base de datos en PostgreSQL para el proyecto y asegúrese de que tenga los permisos necesarios.
Actualice la cadena de conexión en la configuración de la aplicación para que apunte a su base de datos PostgreSQL.
4. Ejecución de Migraciones (si es necesario):

Si está utilizando Entity Framework Core u otro ORM, ejecute las migraciones para crear las tablas necesarias en la base de datos.
5. Inicio del Servidor Backend:

Navegue hasta el directorio del proyecto de ASP.NET Core Web API y ejecute el comando dotnet run para iniciar el servidor backend.
6. Descargar Dependencias del Frontend:

Abra otra terminal y navegue hasta el directorio raíz del proyecto Angular.
Ejecute el comando npm install para instalar las dependencias del frontend, incluyendo Angular Material 15.2.
7. Inicio del Servidor Frontend:

Ejecute el comando ng serve para iniciar el servidor de desarrollo de Angular.
8. Acceso a la Aplicación:

Una vez que los servidores estén en funcionamiento, abra un navegador web y acceda a la URL donde está alojada la aplicación frontend.
