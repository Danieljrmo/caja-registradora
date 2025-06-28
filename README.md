# caja-registradora
Software que hace la función de caja registradora en minimarket con la intención de guardar los datos de venta para futuros y análisis.

Ejecucion
1. Abre una terminal en la carpeta /backend.
2. Instala las dependencias (si es la primera vez después de clonar o limpiar el entorno)
comando: npm install
3. Ejecuta el servidor
comando: node index.js
4. Ejecuta frontend: Open live server

Flujo general:
El usuario interactúa con el index.html (frontend).
El JS (api.js) envía datos al backend (por ejemplo, /ventas).
El backend (Express) recibe la solicitud, se conecta a MySQL y guarda/consulta.
El frontend actualiza la interfaz (ui.js) y puede exportar los resultados (exportar.js).


La idea general es primero ejecutar el backend, como este esta conectado a la db hace el proceso
y para eso se debe tener la db creada en workbench y la conexion con los datos reales el cual esta en el
archivo .env una vez logrado eso, el server correra conectado a la base de datos, esto significa que el backend esta listo para recibir y procesar ventas.
Luego viene la ejecucion del frontend la cual es sencilla, se necesita de la extension Live server y con click derecho se puede ejecutar.