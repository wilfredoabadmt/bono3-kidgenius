# 🦖 KidGenius Club — Bono #3: Calendario de Aventuras (30 Días)

Aplicación interactiva y generador de materiales imprimibles correspondiente al **Bono #3** de la oferta oficial de lanzamiento de **KidGenius Club**.

---

## 🌟 Características Principales

- **🎨 Identidad Visual Oficial**: Tipografías `Fredoka` y `Nunito`, paleta de colores oficial KidGenius (`#7AC943`, `#35206F`, `#FFC928`, etc.) y estética lúdica con la mascota guía **Geni**.
- **📅 Calendario Interactivo de 30 Días**:
  - **Semana 1**: Exploradores de Números
  - **Semana 2**: Maestros del Cálculo Rápido
  - **Semana 3**: Guardianes de la Geometría y Patrones
  - **Semana 4**: Campeones KidGenius y Gran Desafío Final
- **🔊 Motor de Audio Web Audio API**: Sonidos matemáticos dinámicos de victoria, fanfarria, pop y switch de volumen.
- **🖨️ Centro de Impresión Alta Resolución**:
  - Plantilla Póster de 30 días para pared/nevera en formato horizontal A4 / Carta con casillas de marcado.
  - Generador dinámico del **Diploma Oficial de Superación KidGenius** con nombre del niño/a y fecha de graduación.
- **💾 Persistencia**: Guardado en `localStorage` de rachas, días completados, estrellas y perfiles personalizados.
- **🚀 Listo para Producción**: Empaquetado con Docker Nginx alpine ultra-rápido.

---

## 💻 Ejecución Local

Puedes abrir `index.html` directamente en tu navegador o ejecutar un servidor estático:

```bash
npx serve .
```

O utilizando Docker:

```bash
docker build -t bono3-kidgenius .
docker run -p 8080:80 bono3-kidgenius
```
