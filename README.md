# Gym Exercises API

[![Node.js CI](https://img.shields.io/badge/Node.js-API-green)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-Jest-ff69b4)](https://jestjs.io/)
[![Coverage](https://img.shields.io/badge/Coverage-ComingSoon-blue)]()

Este proyecto es una API para gestionar ejercicios de gimnasio. Permite filtrar por grupo muscular y realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los ejercicios.

---

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework web para construir la API.
- **MongoDB**: Base de datos NoSQL para almacenar los datos.
- **TypeScript**: Lenguaje de programación basado en JavaScript con tipado estático.
- **Jest**: Framework de pruebas para asegurar que la API funciona correctamente.

---

## Endpoints

### 1. Crear un nuevo ejercicio

**POST** `/exercises`

#### Request Body:
```json
{
  "name": "Press plano mancuernas",
  "description": "Ejercicio de empuje para el pecho.",
  "muscleGroup": ["pectoral", "triceps"]
}
```

---

### 2. Obtener todos los ejercicios

**GET** `/exercises`

#### Query Params:
- `muscleGroup` (opcional): Filtra los ejercicios por grupo muscular.

#### Ejemplo:
```
GET /exercises?muscleGroup=pectoral
```

---

### 3. Obtener ejercicio por ID

**GET** `/exercises/:id`

#### Ejemplo:
```
GET /exercises/654684fas4df6a
```

---

### 4. Actualizar un ejercicio

**PUT** `/exercises/:id`

Este endpoint actualiza un ejercicio existente por su ID. El `id` debe ser proporcionado en la URL.

---

### 5. Eliminar un ejercicio

**DELETE** `/exercises/:id`

Este endpoint elimina un ejercicio existente por su ID.

---

### 6. Obtener todos los grupos musculares disponibles

**GET** `/muscle-groups`

Devuelve todos los grupos musculares definidos en el sistema, provenientes del enum `MuscleGroup`.

#### Response:
```json
{
  "muscleGroups": [
    "chest",
    "back",
    "legs",
    "biceps",
    "triceps",
    "shoulders",
    "abs"
  ]
}
```

---

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto:

1. **Clona este repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/gym-exercises-api.git
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Levanta la base de datos**:

   Asegúrate de tener MongoDB instalado y ejecutándose en tu máquina local o en un servicio en la nube. Si estás usando una instancia local, puedes iniciarla con el siguiente comando:

   ```bash
   mongod
   ```

   Si estás utilizando una conexión remota, asegúrate de configurar correctamente la URI en el archivo `.env` (ver sección de Variables de Entorno).

4. **Inicia el servidor**:
   ```bash
   npm run dev
   ```

El servidor se ejecutará en: [http://localhost:3000](http://localhost:3000)

---

## Pruebas

Este proyecto utiliza **Jest** para realizar pruebas unitarias y de integración. Para ejecutar las pruebas, utiliza el siguiente comando:

```bash
npm run test
```

---

## Variables de Entorno

Asegúrate de configurar las siguientes variables de entorno en un archivo `.env`:

- `PORT`: Puerto en el que se ejecutará el servidor (por defecto: `3000`).
- `MONGO_URI`: URI de conexión a la base de datos MongoDB.

Ejemplo de archivo `.env`:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/gym-exercises
```

---

## Contribuciones

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Haz push a tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

---

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.