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

---

### Commit 6: `crear estructura HTML del módulo de clientela`

**Archivo creado:** `cliente.html`

**¿Qué se implementó?**
Se construyó la estructura base del módulo destinado a los clientes del cafetín. El HTML deja definidos todos los contenedores necesarios para la funcionalidad:

1. **Encabezado con datos del usuario**
   - Muestra nombre y rol del cliente
   - Botón de “Cerrar sesión” para volver al login

2. **Catálogo de productos**
   - Selector de categorías (`select`) para filtrar entre bebidas/comida
   - Grid (`#productGrid`) donde se renderizarán las tarjetas de productos via JS

3. **Barra lateral con tres bloques**
   - **Carrito:** contador, lista de ítems y subtotal
   - **Historial:** lista para compras previas
   - **Lealtad:** texto con puntos acumulados

4. **Scripts**
   - `data.js` para reutilizar los productos
   - `cliente.js` (próximo paso) para agregar interacción

**¿Por qué se hizo en este momento?**
Continuamos con la metodología vertical: cada módulo debe quedar listo primero en estructura antes de añadir estilos y comportamiento.

**¿Cómo funciona?**
- Cada bloque tiene `id` y clases específicas para que el JS pueda inyectar información dinámica.
- Secciones `<section>` resaltan la semántica: catálogo vs. barra lateral.
- El formulario de filtro y los botones del carrito se agregarán en pasos posteriores.

**¿Cómo se conecta al proyecto?**
Este archivo será la vista que reciben los usuarios con rol “cliente” después del login. `auth.js` redirige a `cliente.html` y, una vez aquí, `cliente.js` validará la sesión y poblará la interfaz.

**Decisión técnica:**
Separar la estructura HTML del módulo permite trabajar posteriormente los estilos (`cliente.css`) y la lógica (`cliente.js`) sin mezclar responsabilidades, manteniendo el patrón vertical exigido.

---

### Commit 7: `agregar estilos visuales del módulo de clientela`

**Archivo creado:** `css/cliente.css`

**¿Qué se implementó?**
Se diseñó la primera versión de la experiencia visual para los clientes:

1. **Encabezado fijo del usuario**
   - Fondo en color primario y texto claro
   - Botón de cierre de sesión con borde blanco semitransparente

2. **Layout principal con grid**
   - `.client-layout` divide la vista en catálogo (2fr) y barra lateral (1fr)
   - Media query para apilar secciones en pantallas pequeñas

3. **Tarjetas de producto**
   - `product-card` con borde sutil y padding
   - Imágenes responsivas (`object-fit: cover`)
   - Botón primario para “Agregar al carrito” reutilizando la paleta global

4. **Componentes de barra lateral**
   - Carrito e historial con `overflow-y: auto` para mantener tamaños controlados
   - Mensajes “empty” estilizados en color gris
   - Sección de puntos de lealtad centrada

**¿Por qué se hizo en este momento?**
Después de tener la estructura, tocaba darle identidad visual coherente con el resto del sistema antes de implementar la lógica interactiva.

**¿Cómo funciona?**
- Las tarjetas se organizan con `grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))` para adaptarse a diversos anchos.
- Los botones reutilizan las variables `--secondary-color` y `--success-color` definidas en `common.css`.
- Flexbox y Grid facilitan el alineamiento y distribución de elementos sin cálculos manuales de tamaño.

**¿Cómo se conecta al proyecto?**
`cliente.css` se importa únicamente en `cliente.html`. Comparte la paleta y tipografía de `common.css`, pero define las clases específicas que el HTML ya expone.

**Decisión técnica:**
Separar estilos por módulo nos permite mantener el límite de 150 líneas y facilita el mantenimiento. Además, usar CSS nativo mantiene el cumplimiento de la restricción “sin frameworks”.

---

### Commit 8: `implementar lógica interactiva del módulo de clientela`

**Archivo creado:** `js/cliente.js`

**¿Qué se implementó?**
Toda la lógica que vuelve funcional la vista del cliente:

1. **Control de sesión y datos del usuario**
   - Lee `sessionStorage` para validar que sea un cliente
   - Muestra nombre y rol en el encabezado

2. **Catálogo filtrable**
   - `renderProducts()` recorre `PRODUCTS` y pinta tarjetas según categoría
   - Usa `dataset` para vincular botones “Agregar” con el ID del producto

3. **Carrito de compras**
   - Arreglo `cart` en memoria con cantidades acumuladas
   - `updateCartUI()` recalcula contador, lista y subtotal

4. **Historial y puntos de lealtad**
   - Arreglo `history` que almacena fecha, cantidad y total de cada compra
   - `loyaltyPoints` se incrementa según el monto (5 puntos por unidad monetaria)

5. **Eventos principales**
   - Cambio de categoría, clic en “Agregar”, completar pedido y cerrar sesión

**¿Por qué se hizo en este momento?**
Luego de tener la estructura y los estilos listos, tocaba hacer el módulo completamente interactivo antes de pasar al siguiente rol, manteniendo el flujo vertical.

**¿Cómo funciona?**
- `Array.find` localiza productos, `Array.reduce` calcula totales
- `Date().toLocaleString('es-VE')` genera la marca de tiempo para el historial
- `sessionStorage.removeItem()` cierra sesión y redirige al login

**¿Cómo se conecta al proyecto?**
Este JS depende de `data.js` y se carga en `cliente.html`. El módulo de autenticación redirige aquí cuando el usuario es cliente, completando así el flujo de extremo a extremo.

**Decisión técnica:**
Mantener los estados (`cart`, `history`, `loyaltyPoints`) en memoria es suficiente para el prototipo. Se prioriza claridad sobre persistencia, ya que el requerimiento explícitamente indica datos simulados sin backend.

---

### Commit 9: `crear estructura HTML del módulo de cajero`

**Archivo creado:** `cajero.html`

**¿Qué se implementó?**
Se construyó la interfaz del punto de venta (POS) para el personal de caja:

1. **Encabezado del cajero**
   - Muestra nombre y rol del cajero autenticado
   - Botón de cierre de sesión

2. **Sección de captura de pedido**
   - Selector `<select>` para elegir productos del catálogo
   - Botón "Agregar al pedido" para construir la orden
   - Lista de productos agregados con total acumulado

3. **Sección de recibo**
   - Área de visualización donde se generará el recibo simulado
   - Botón "Generar Recibo" que procesa el pedido y muestra el comprobante

4. **Scripts vinculados**
   - `data.js` para acceder al catálogo de productos
   - `cajero.js` (próximo paso) para la lógica del POS

**¿Por qué se hizo en este momento?**
Completado el módulo de cliente, continuamos con el segundo rol (cajero) siguiendo la metodología vertical: primero la estructura HTML.

**¿Cómo funciona?**
- El `<select>` se poblará dinámicamente con los productos disponibles
- Cada producto agregado se acumulará en `#orderItems`
- Al generar el recibo, se mostrará un comprobante formateado con mensaje de agradecimiento

**¿Cómo se conecta al proyecto?**
`auth.js` redirige a `cajero.html` cuando el usuario tiene rol "cajero". Esta vista permite al personal de caja procesar pedidos de forma simulada.

**Decisión técnica:**
Separar la captura del pedido de la visualización del recibo facilita la comprensión del flujo: primero se construye la orden, luego se genera el comprobante. Esto refleja el proceso real de un punto de venta.

---

### Commit 10: `agregar estilos visuales del módulo de cajero`

**Archivo creado:** `css/cajero.css`

**¿Qué se implementó?**
Se diseñó la interfaz visual del punto de venta:

1. **Encabezado del cajero**
   - Mismo estilo que el módulo cliente (fondo primario, texto blanco)
   - Botón de logout con borde semitransparente

2. **Layout de dos columnas**
   - Grid 1fr 1fr para dividir captura de pedido y visualización de recibo
   - Media query para apilar en pantallas pequeñas

3. **Sección de captura**
   - Selector de productos con flexbox para alineación
   - Lista de pedido con scroll (`max-height: 300px; overflow-y: auto`)
   - Resumen con total destacado en color verde

4. **Sección de recibo**
   - Fondo gris claro simulando papel
   - Fuente monoespaciada (`Courier New`) para efecto de ticket impreso
   - `white-space: pre-line` para respetar saltos de línea

**¿Por qué se hizo en este momento?**
Siguiendo el patrón vertical: estructura HTML lista, ahora aplicamos estilos antes de programar la lógica.

**¿Cómo funciona?**
- Grid divide el espacio equitativamente entre captura y recibo
- La fuente monoespaciada da apariencia de ticket térmico de caja registradora
- Variables CSS mantienen consistencia con el resto del sistema

**¿Cómo se conecta al proyecto?**
`cajero.css` se importa solo en `cajero.html`, heredando variables de `common.css` pero definiendo estilos específicos del POS.

**Decisión técnica:**
Usar fuente monoespaciada para el recibo simula la salida de una impresora térmica real, mejorando la experiencia visual sin necesidad de librerías externas.

---

### Commit 11: `implementar lógica interactiva del módulo de cajero`

**Archivo creado:** `js/cajero.js`

**¿Qué se implementó?**
Toda la funcionalidad del punto de venta:

1. **Control de sesión**
   - Valida que el usuario sea cajero, redirige al login si no
   - Muestra nombre y rol en el encabezado

2. **Población del selector de productos**
   - `populateProductSelect()` llena el `<select>` con todos los productos disponibles
   - Muestra nombre y precio de cada producto

3. **Gestión del pedido**
   - Arreglo `order` acumula productos con cantidades
   - `addProductToOrder()` agrega o incrementa productos
   - `updateOrderUI()` recalcula y muestra lista y total

4. **Generación de recibo**
   - `generateReceipt()` crea un ticket formateado con:
     - Encabezado con nombre del cafetín
     - Fecha, hora y nombre del cajero
     - Detalle de cada producto (cantidad, precio unitario, subtotal)
     - Total general
     - Mensaje de agradecimiento
   - Usa template literals para formatear el texto
   - Limpia el pedido después de generar el recibo

**¿Por qué se hizo en este momento?**
Completando el patrón vertical del módulo cajero: HTML + CSS + JS. Ahora el POS es completamente funcional.

**¿Cómo funciona?**
- `Array.find` localiza productos por ID
- `Array.reduce` calcula el total del pedido
- Template literals (`\n`) crean saltos de línea para el formato del recibo
- `<pre>` preserva el formato del texto en el HTML

**¿Cómo se conecta al proyecto?**
Este JS depende de `data.js` y se carga en `cajero.html`. El módulo de autenticación redirige aquí cuando el usuario es cajero.

**Decisión técnica:**
Usar texto plano formateado con espacios y líneas simula un ticket térmico real sin necesidad de librerías de impresión. El formato es legible y profesional para la defensa académica.

---

### Commit 12: `crear estructura HTML del módulo de administración`

**Archivo creado:** `admin.html`

**¿Qué se implementó?**
Se construyó la interfaz de administración del cafetín:

1. **Encabezado del administrador**
   - Muestra nombre y rol del administrador
   - Botón de cierre de sesión

2. **Formulario de agregar producto**
   - Campos para nombre, precio, categoría y URL de imagen
   - Validación HTML5 con `required` y tipos específicos (`number`, `url`)
   - Selector de categoría (bebidas/comida)

3. **Sección de gestión**
   - Contenedor `#productList` donde se mostrarán los productos existentes
   - Cada producto tendrá opción de eliminar

4. **Scripts vinculados**
   - `data.js` para acceder al catálogo
   - `admin.js` (próximo paso) para la lógica de gestión

**¿Por qué se hizo en este momento?**
Último módulo del sistema. Siguiendo el patrón vertical: primero la estructura HTML antes de estilos y lógica.

**¿Cómo funciona?**
- El formulario captura datos del nuevo producto
- La validación HTML5 asegura que todos los campos sean correctos antes de enviar
- La lista de productos se poblará dinámicamente con JavaScript

**¿Cómo se conecta al proyecto?**
`auth.js` redirige a `admin.html` cuando el usuario tiene rol "admin". Esta vista permite gestionar el catálogo de productos del cafetín.

**Decisión técnica:**
Usar validación HTML5 nativa reduce la necesidad de JavaScript para validaciones básicas. Los tipos de input (`number`, `url`) proporcionan teclados apropiados en móviles y validación automática.

---

