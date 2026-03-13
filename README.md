"# Cafetín Central UCV

Sistema de Gestión Digital para Cafetín Universitario  
**Proyecto Académico - Fase II**

---

## Historial de Desarrollo

### Commit 1: `agregar datos iniciales de usuarios y productos`

**Archivo creado:** `js/data.js`

**¿Qué se implementó?**
Se creó la estructura de datos estáticos que simula la base de datos del sistema. Este archivo centraliza dos arrays principales:

1. **USERS**: Contiene las 3 cuentas predefinidas del sistema
   - `ClienteUCV` (rol: cliente) - Usuario final que realiza compras
   - `caja_01` (rol: cajero) - Personal de caja que procesa pedidos
   - `adminRoot` (rol: admin) - Administrador del sistema

2. **PRODUCTS**: Contiene 6 productos iniciales del cafetín
   - Cada producto tiene: id, nombre, precio, categoría e imagen
   - Categorías: 'bebidas' y 'comida'

**¿Por qué se hizo en este momento?**
Los datos son la base de toda la aplicación. Antes de construir interfaces o lógica, necesitamos definir qué información manejará el sistema. Este archivo será importado y consumido por todos los módulos posteriores.

**¿Cómo funciona?**
- Uso de `const` para declarar arrays inmutables que no deben ser reasignados
- Estructura de objetos JavaScript con propiedades descriptivas
- Los datos se mantienen en memoria durante la sesión del navegador

**¿Cómo se conecta al proyecto?**
Este archivo será importado mediante `<script src="js/data.js"></script>` en todas las páginas HTML que necesiten acceder a usuarios o productos. Los módulos de autenticación, clientela, caja y administración dependerán de estos datos.

**Decisión técnica:**
Centralizar los datos en un solo archivo facilita el mantenimiento. Si necesitamos agregar usuarios o productos durante el desarrollo, solo modificamos este archivo sin tocar la lógica de negocio.

---

### Commit 2: `agregar estilos base compartidos del sistema`

**Archivo creado:** `css/common.css`

**¿Qué se implementó?**
Se crearon los estilos CSS base que serán compartidos por todos los módulos del sistema. Este archivo incluye:

1. **Variables CSS (`:root`)**: Paleta de colores consistente para todo el proyecto
   - Colores primarios, secundarios, de éxito, peligro y advertencia
   - Colores de texto, fondos y bordes
   - Sombras predefinidas para efectos visuales

2. **Reset CSS**: Eliminación de márgenes y paddings por defecto del navegador
   - `* { margin: 0; padding: 0; box-sizing: border-box; }`

3. **Estilos base**: Configuración global de elementos HTML
   - Tipografía del sistema (fuentes nativas para mejor rendimiento)
   - Estilos para botones, inputs y elementos de código

**¿Por qué se hizo en este momento?**
Antes de crear interfaces específicas, necesitamos establecer las bases visuales del proyecto. Definir variables CSS ahora nos permite mantener consistencia de diseño en todos los módulos sin repetir código.

**¿Cómo funciona?**
- Las **variables CSS** (`--nombre-variable`) se definen en `:root` y pueden usarse en cualquier parte con `var(--nombre-variable)`
- El **reset CSS** elimina inconsistencias entre navegadores
- `box-sizing: border-box` hace que padding y border se incluyan en el ancho/alto total de los elementos

**¿Cómo se conecta al proyecto?**
Este archivo será el primero en importarse en todas las páginas HTML mediante `<link rel="stylesheet" href="css/common.css">`. Los estilos específicos de cada módulo (login.css, cliente.css, etc.) se cargarán después y heredarán estas variables y estilos base.

**Decisión técnica:**
Usar variables CSS nativas en lugar de preprocesadores (SASS/LESS) cumple con la restricción de "solo HTML5, CSS3 y JS puro". Las variables CSS tienen soporte completo en navegadores modernos y facilitan cambios globales de diseño.

---

### Commit 3: `crear estructura HTML del módulo de login`

**Archivo creado:** `index.html`

**¿Qué se implementó?**
Se creó la página de inicio del sistema (punto de entrada) con el formulario de autenticación. Elementos principales:

1. **Estructura semántica HTML5**:
   - `<!DOCTYPE html>` y configuración de idioma español
   - Meta viewport para diseño responsivo
   - Importación ordenada de hojas de estilo (common.css primero, luego login.css)

2. **Formulario de login**:
   - Campos de usuario y contraseña con atributos `required` para validación HTML5
   - Atributos `autocomplete` para mejorar la experiencia del usuario
   - Contenedor para mensajes de error (`errorMessage`)
   - Botón de envío tipo `submit`

3. **Sección informativa**:
   - Lista de credenciales de prueba para facilitar el acceso
   - Uso de etiqueta `<code>` para resaltar los nombres de usuario

4. **Scripts**:
   - Importación de `data.js` (datos estáticos)
   - Importación de `auth.js` (lógica de autenticación - pendiente)

**¿Por qué se hizo en este momento?**
Siguiendo la metodología vertical, primero definimos la estructura HTML antes de estilizarla o programar su lógica. El HTML es el esqueleto de la interfaz.

**¿Cómo funciona?**
- El atributo `required` en los inputs activa la validación nativa del navegador
- El `id` de cada elemento permite manipularlo desde JavaScript
- El evento `submit` del formulario será capturado por JavaScript para validar credenciales

**¿Cómo se conecta al proyecto?**
Esta es la página de entrada del sistema. Todos los usuarios (cliente, cajero, admin) acceden por aquí. Según las credenciales ingresadas, serán redirigidos a su módulo correspondiente (cliente.html, cajero.html o admin.html).

**Decisión técnica:**
Usar validación HTML5 nativa (`required`) reduce la necesidad de JavaScript para validaciones básicas. El formulario no se enviará si los campos están vacíos, mejorando la UX sin código adicional.

---

### Commit 4: `agregar estilos visuales del módulo de login`

**Archivo creado:** `css/login.css`

**¿Qué se implementó?**
Se crearon los estilos CSS específicos para la página de login. Incluye:

1. **Layout centrado con Flexbox**:
   - `.login-container` usa `display: flex` para centrar vertical y horizontalmente el formulario
   - `min-height: 100vh` asegura que ocupe toda la altura de la ventana

2. **Tarjeta de login (`.login-card`)**:
   - Fondo blanco con sombra para efecto de elevación
   - `border-radius` para esquinas redondeadas
   - `max-width: 400px` para mantener proporciones adecuadas

3. **Estilos de formulario**:
   - Inputs con borde sutil que cambia a color secundario en `:focus`
   - Transiciones suaves (`transition: border-color 0.3s ease`)
   - Botón de ancho completo con efecto hover

4. **Uso de variables CSS**:
   - `var(--white)`, `var(--shadow)`, `var(--secondary-color)`, etc.
   - Mantiene consistencia con la paleta definida en `common.css`

**¿Por qué se hizo en este momento?**
Siguiendo la metodología vertical, después de crear la estructura HTML, aplicamos los estilos visuales. Ahora el formulario tiene apariencia profesional y es completamente funcional visualmente.

**¿Cómo funciona?**
- **Flexbox** permite centrado perfecto sin cálculos matemáticos complejos
- **`:focus`** mejora la accesibilidad indicando visualmente qué campo está activo
- **`:hover`** en el botón proporciona feedback visual de interactividad

**¿Cómo se conecta al proyecto?**
Este archivo se importa en `index.html` después de `common.css`. Hereda las variables CSS y estilos base, aplicando estilos específicos solo para el módulo de login.

**Decisión técnica:**
Separar estilos específicos del módulo en archivos independientes facilita el mantenimiento. Si necesitamos modificar solo el login, editamos `login.css` sin afectar otros módulos.

---

### Commit 5: `implementar lógica de autenticación y redirección por roles`

**Archivo creado:** `js/auth.js`

**¿Qué se implementó?**
Se creó la lógica JavaScript que hace funcional el sistema de autenticación. Incluye:

1. **Captura del evento submit**:
   - `addEventListener('submit', ...)` intercepta el envío del formulario
   - `event.preventDefault()` evita que la página se recargue

2. **Validación de credenciales**:
   - Obtiene los valores de usuario y contraseña desde los inputs
   - `.trim()` elimina espacios en blanco accidentales
   - `USERS.find()` busca coincidencia exacta de usuario y contraseña

3. **Manejo de sesión**:
   - `sessionStorage.setItem()` guarda los datos del usuario autenticado
   - `JSON.stringify()` convierte el objeto usuario a texto para almacenarlo

4. **Redirección por roles**:
   - `switch(user.role)` redirige según el tipo de usuario
   - Cliente → `cliente.html`, Cajero → `cajero.html`, Admin → `admin.html`

5. **Manejo de errores**:
   - Muestra mensaje de error si las credenciales son incorrectas
   - `setTimeout()` oculta el mensaje automáticamente después de 3 segundos

**¿Por qué se hizo en este momento?**
Completando la metodología vertical: HTML (estructura) + CSS (estilos) + JS (lógica). El módulo de login ahora está 100% funcional antes de pasar al siguiente módulo.

**¿Cómo funciona?**
- **Array.find()** retorna el primer usuario que coincida con las credenciales, o `undefined` si no existe
- **sessionStorage** mantiene los datos solo durante la sesión del navegador (se borra al cerrar la pestaña)
- **window.location.href** redirige a la página correspondiente según el rol

**¿Cómo se conecta al proyecto?**
Este archivo es importado en `index.html` y depende de `data.js` (debe cargarse después). Los módulos de cliente, cajero y admin leerán `sessionStorage` para verificar que el usuario esté autenticado y mostrar su información.

**Decisión técnica:**
Usar `sessionStorage` en lugar de `localStorage` es más seguro para datos de sesión. Si el usuario cierra el navegador, debe volver a autenticarse. Esto simula el comportamiento de un sistema real sin backend.
" 
