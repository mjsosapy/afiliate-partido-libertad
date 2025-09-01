# Página de Afiliación - Partido Libertad Y República

Una página web moderna y responsive para el formulario de afiliación del Partido Libertad Y República, inspirada en el sitio original https://plyr.org.py/afiliate.

## 🚀 Características

### Diseño y UX
- **Diseño moderno y responsive** que se adapta a todos los dispositivos
- **Navegación fija** con menú hamburguesa para móviles
- **Animaciones suaves** y transiciones elegantes
- **Paleta de colores profesional** con gradientes azules y acentos dorados
- **Tipografía Inter** para mejor legibilidad

### Formulario de Afiliación
- **Validación en tiempo real** de todos los campos
- **Validaciones específicas** para Paraguay:
  - Cédula paraguaya (6-8 dígitos)
  - Teléfono paraguayo (+595 formato)
  - Email válido
  - Edad mínima de 18 años
- **Subida de archivos** con drag & drop
- **Formateo automático** de cédula y teléfono
- **Mensajes de error** claros y específicos

### Funcionalidades
- **Navegación suave** entre secciones
- **Menú móvil** responsive
- **Modal de confirmación** al enviar el formulario
- **Estados de carga** en el botón de envío
- **Validación de archivos** (solo imágenes, máximo 5MB)

## 📁 Estructura de Archivos

```
afiliate/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidad JavaScript
└── README.md           # Este archivo
```

## 🛠️ Cómo Usar

### Instalación Local
1. Descarga todos los archivos en una carpeta
2. Abre `index.html` en tu navegador web
3. ¡Listo! La página está lista para usar

### Servidor Local (Recomendado)
Para mejor experiencia, ejecuta un servidor local:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (si tienes http-server instalado)
npx http-server

# Con PHP
php -S localhost:8000
```

Luego visita `http://localhost:8000` en tu navegador.

## 🚀 Despliegue en Vercel

### Opción 1: Interfaz Web (Más Fácil)
1. Ve a [vercel.com](https://vercel.com) y crea una cuenta
2. Haz clic en "New Project"
3. Selecciona "Upload" y arrastra tu carpeta completa
4. Configura:
   - **Framework Preset:** Other
   - **Build Command:** (dejar vacío)
   - **Output Directory:** (dejar vacío)
5. Haz clic en "Deploy"

### Opción 2: Vercel CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Iniciar sesión
vercel login

# Desplegar
vercel

# Para producción
vercel --prod
```

### Opción 3: GitHub Integration
1. Sube tu código a GitHub
2. Conecta tu repositorio en Vercel
3. Configura el despliegue automático
4. ¡Cada push se desplegará automáticamente!

## 🎨 Personalización

### Colores
Los colores principales están definidos en `styles.css`:
- **Azul principal**: `#1e3a8a` y `#3b82f6`
- **Acento dorado**: `#fbbf24`
- **Texto**: `#333` y `#6b7280`

### Contenido
- Edita el texto en `index.html` para personalizar el contenido
- Modifica los campos del formulario según tus necesidades
- Ajusta las validaciones en `script.js`

## 📱 Responsive Design

La página está optimizada para:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🔧 Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con Flexbox y Grid
- **JavaScript ES6+** - Funcionalidad interactiva
- **Font Awesome** - Iconos
- **Google Fonts** - Tipografía Inter

## 📋 Campos del Formulario

1. **Nombre** - Texto obligatorio
2. **Apellido** - Texto obligatorio
3. **Nacionalidad** - Texto obligatorio
4. **Cédula** - Números (6-8 dígitos)
5. **Lugar de Nacimiento** - Texto obligatorio
6. **Fecha de Nacimiento** - Fecha (mayor de 18 años)
7. **Teléfono** - Formato paraguayo (+595)
8. **Email** - Email válido
9. **Estado Civil** - Selector con opciones
10. **Profesión** - Texto obligatorio
11. **Ciudad** - Texto obligatorio
12. **Barrio** - Texto obligatorio
13. **Dirección** - Texto obligatorio
14. **Foto de Cédula** - Imagen (máximo 5MB)

## 🚀 Próximas Mejoras

- [ ] Integración con backend para envío real
- [ ] Base de datos para almacenar afiliaciones
- [ ] Panel de administración
- [ ] Notificaciones por email
- [ ] Validación de cédula con API oficial
- [ ] Multiidioma (español/guaraní)

## 📞 Soporte

Si necesitas ayuda o quieres personalizar la página, puedes:
- Revisar el código comentado
- Modificar los estilos en `styles.css`
- Ajustar las validaciones en `script.js`

## 📄 Licencia

Este proyecto está basado en el diseño del sitio oficial del Partido Libertad Y República y se creó con fines educativos y de desarrollo.

---

**Desarrollado con ❤️ para el Partido Libertad Y República**
