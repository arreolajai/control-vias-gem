# 🛤️ App de Inspección de Vías Férreas (PWA Offline-First)

Aplicación Web Progresiva (PWA) diseñada para registrar anomalías e inspecciones en infraestructuras ferroviarias. Está construida bajo una arquitectura *Offline-First*, lo que permite a los inspectores en campo capturar datos, coordenadas GPS y fotografías incluso en zonas sin cobertura celular.

## ✨ Características Principales

* **Funcionamiento 100% Offline:** Guarda reportes localmente usando IndexedDB cuando no hay internet.
* **Geolocalización Automática:** Captura latitud y longitud directamente desde el GPS del dispositivo.
* **Evidencia Fotográfica:** Integración con la cámara del dispositivo optimizada para uso en campo.
* **Instalable (PWA):** Se puede instalar en la pantalla de inicio de celulares y tablets (Android/iOS) sin pasar por tiendas de aplicaciones.
* **Diseño de Alto Contraste:** Interfaz oscura (Dark Mode) con botones grandes, ideal para uso en exteriores bajo luz solar directa y con equipo de protección.

## 📂 Estructura de Archivos

El proyecto se compone de los siguientes archivos estáticos (sin necesidad de frameworks complejos):

* `index.html`: Estructura de la interfaz de usuario.
* `style.css`: Estilos, modo oscuro y diseño responsivo.
* `app.js`: Lógica de la aplicación, control de cámara, GPS y base de datos local (IndexedDB).
* `manifest.json`: Archivo de configuración que define la identidad de la PWA (nombre, colores, íconos).
* `sw.js`: Service Worker encargado de cachear los archivos para permitir el arranque sin conexión a internet.
* `icon-192.png` y `icon-512.png`: Íconos de la aplicación para la pantalla de inicio *(debes agregarlos manualmente)*.

## 🚀 Instrucciones de Ejecución y Pruebas

Para que el Service Worker y el modo Offline funcionen correctamente, la aplicación **no debe abrirse haciendo doble clic en el archivo HTML** (protocolo `file://`), sino a través de un servidor local o remoto (protocolo `http://` o `https://`).

### Opción 1: Pruebas Locales (Computadora)
1. Abre la carpeta del proyecto en Visual Studio Code.
2. Instala la extensión **Live Server**.
3. Haz clic derecho sobre `index.html` y selecciona *Open with Live Server*.

### Opción 2: Despliegue y Uso en Celulares (Recomendado)
1. Sube los archivos a un repositorio de **GitHub**.
2. Despliega el repositorio usando **GitHub Pages**, **Vercel** o **Netlify** (son servicios gratuitos).
3. Abre la URL generada desde el navegador de tu celular (Chrome o Safari).
4. El navegador mostrará una notificación en la parte inferior: **"Añadir a la pantalla de inicio"**. Acéptala para instalar la app.

## 🛠️ Tecnologías Utilizadas
* HTML5, CSS3, Vanilla JavaScript.
* **IndexedDB** (Almacenamiento estructurado local).
* **Service Workers** & **Cache API**.
* **Geolocation API**.

---
*Desarrollado para la gestión eficiente y segura del mantenimiento de vías férreas.*