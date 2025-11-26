# Proyecto para OTIC Vida Camara  
Backend desarrollado en **Node.js + Express**, Frontend en **React**, Base de Datos **PostgreSQL**, y ejecución completa con **Docker Compose**.

---

## Descripción General

Este proyecto está compuesto por:

- **Backend**: Node.js + Express  
- **Frontend**: React + Vite  
- **Base de Datos**: PostgreSQL  
- **Docker** y **Docker Compose** para levantar todo automáticamente

Incluye dos archivos `Dockerfile` (uno para backend y uno para frontend) y un `docker-compose.yml` que orquesta toda la aplicación.

---

## 🧰 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Docker Desktop**
- **Docker Compose**
- **pgAdmin** para crear las tablas de la DB

---

## 🐳 Levantar el Proyecto con Docker
1. Crear carpeta raiz llamada en este caso root
2. Abrir la terminal en esta carpeta
3. Clonar los repositorios publicos dentro de root:

```bash
git clone https://github.com/CMINGEL/backOticVidaCamara.git
git clone https://github.com/CMINGEL/frontOticVidaCamara.git
```
4. Cambiar de ubicacion el archivo docker-compose.yml que esta en el repo backOticVidaCamara.git, hacia la carpeta raiz de nombre root
5. Ejecutar ```docker-compose up --build ```

esto levantara el proyecto en:
| Servicio   | Puertos                                        | Descripción   |
| ---------- | ---------------------------------------------- | ------------- |
| Frontend   | [http://localhost:5173](http://localhost:5173) | App React     |
| Backend    | [http://localhost:3000](http://localhost:3000) | API Express   |
| PostgreSQL | 5432                                           | Base de datos |

6. Ahora para crear las tablas de la db abrir pgAdmin y conectarse a la base de datos con las siguientes credenciales:

| Campo         | Valor     |
|-------------- | --------- |
| Host          | localhost |
| Puerto        | 5432      |
| Usuario       | postgres  |
| Contraseña    | otic      |
| Base de datos | otic_db   |

7. En el query editor de pg admin ejecutar la siguiente query:

```bash
CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  category_id INTEGER REFERENCES category(id),
  image TEXT,
  rating_rate NUMERIC,
  rating_count INTEGER
);
```

7. El proyecto deberia ser accesible desde el navegador en el http://localhost:5173/
