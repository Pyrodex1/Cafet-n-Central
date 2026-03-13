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

