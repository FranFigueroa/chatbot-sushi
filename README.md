# Chatbot de Sushi

¡Bienvenido al Chatbot de Sushi! Este proyecto permite a los usuarios:
- Mostrar un **menú de sushi**.
- **Tomar pedidos** básicos.
- Responder **preguntas frecuentes** como "¿Están abiertos?".

## Tecnologías Principales

- **Node.js + Express** (Backend con TypeScript)
- **MongoDB** (Almacena productos y pedidos)
- **React/Next.js** (Frontend con TypeScript) – Interfaz básica de prueba
- **Axios** y **React Query** (en el frontend) para llamadas a la API
- **Jest** / **Supertest** (para tests básicos)

---


## **Cómo instalar y correr el proyecto**

### **1. Clonar el repositorio**
Clona este repositorio en tu máquina local:

git clone https://github.com/tu-usuario/chatbot-sushi.git
cd chatbot-sushi/backend
npm install 

cd chatbot-sushi/frontend
npm install

### Configurar .env
MONGODB_URI=mongodb://localhost:27017/sushi-chatbot
PORT=5000

### Cargar datos iniciales
npm run seed

### Ejecuar servidor frontend y backend
npm run dev


## Mensajes que entiende el bot

"hola":
Respuesta: "¡Hola! ¿En qué puedo ayudarte?"

"menu":
Respuesta: "Nuestro menú incluye variedad de sushis como nigiri, sashimi, maki, etc. ¿Te gustaría ver el menú completo?"

"horarios":
Respuesta: "Nuestro restaurante está abierto de lunes a viernes de 12:00 PM a 10:00 PM y sábados y domingos de 1:00 PM a 11:00 PM."

"pedido":
Respuesta: "Claro, para hacer un pedido, por favor indícame los tipos de sushi y las cantidades que deseas."

## Endpoints

**Productos**
POST - Envía un mensaje al chatbot y recibe una respuesta.
GET - Obtiene una lista de todos los productos disponibles

**Pedidos**
GET - Obtiene una lista de todos los pedidos
POST - Crea un nuevo pedido







