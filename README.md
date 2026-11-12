# Laboratorio 3: Integración de N8N con Agentes de Inteligencia Artificial (IA)
## Sistema CRM Comercial B2B para Aerolínea Virtual

Este repositorio contiene la solución completa e integral correspondiente al **Laboratorio 3 de Fundamentos de Sistemas de Información (FSI)**. El proyecto aborda el diseño, modelado e implementación de un **Dashboard CRM SaaS B2B** para la gestión comercial de una aerolínea internacional de pasajeros y carga, integrando capacidades conversacionales avanzadas mediante un agente inteligente impulsado por **n8n**, **LangChain** y **Google Gemini**.

---

## 📋 Contenido del Repositorio

| Archivo / Carpeta | Descripción |
| :--- | :--- |

| `n8n_workflow_crm_aerolinea.json` | **Exportación oficial del flujo de trabajo de n8n** (Webhook + LangChain AI Agent + Google Gemini Chat Model + Window Buffer Memory + Respond to Webhook). |
| `schema.json` | Esquema formal JSON Schema del modelo relacional del CRM (`Deal`, `Customer`, `User`, `PipelineStage`). |
| `estructura_datos.md` | Documentación técnica exhaustiva del modelo de entidades, tipos de datos y relaciones de negocio. |
| `mockData.js` | Dataset representativo en formato JavaScript con 25 tratos comerciales realistas del sector aeronáutico. |
| `src/` | Código fuente de la aplicación frontend (React 18, TypeScript, TailwindCSS, Lucide Icons, Recharts). |
| `imagenes_informe_lab3/` | Carpeta con las 11 capturas de pantalla de alta resolución que evidencian el funcionamiento en tiempo real. |

---

## 🚀 Arquitectura de la Solución

```
+-------------------------------------------------------------------------+
|                       FRONTEND: REACT + VITE + TAILWIND                 |
|                                                                         |
|  +--------------------+  +--------------------+  +-------------------+  |
|  |   KPI Cards        |  |  Recharts Analytics|  |  Filtros Dinámicos|  |
|  | Revenue, Win Rate..|  |  Bar & Area Charts |  |  Vendedor, Etapa  |  |
|  +--------------------+  +--------------------+  +-------------------+  |
|  +-------------------------------------------------------------------+  |
|  |           Tabla Interactiva de Tratos (Edición en Vivo)           |  |
|  +-------------------------------------------------------------------+  |
|  +-------------------------------------------------------------------+  |
|  |         Widget Chat Flotante IA (Conector n8n + Fallback)         |  |
|  +-------------------------------------------------------------------+  |
+-----------------------------------+-------------------------------------+
                                    |
                           HTTP POST (JSON)
                      { "chatInput", "context" }
                                    |
                                    v
+-----------------------------------+-------------------------------------+
|                          ORQUESTADOR n8n                                |
|                                                                         |
|  [ Webhook Trigger ]  --->  [ LangChain AI Agent ]                      |
|                                     |                                   |
|                         +-----------+-----------+                       |
|                         |                       |                       |
|                         v                       v                       |
|             [ Google Gemini Chat ]      [ Window Buffer Memory ]        |
|             (gemini-1.5-flash / pro)    (Contexto de 10 turnos)         |
|                         |                                               |
|                         +-----------+                                   |
|                                     v                                   |
|                           [ Respond to Webhook ]                        |
+-------------------------------------------------------------------------+
```

---

## 🎯 Características Principales del Dashboard

1. **Tarjetas de KPIs Dinámicas:**
   - **Ingresos Totales Ganados:** Suma en tiempo real de todos los tratos en estado `Won`.
   - **Tratos Activos:** Recuento y valor proyectado del pipeline en etapas abiertas (`Discovery`, `Proposal`, `Negotiation`).
   - **Tasa de Cierre (Win Rate):** Porcentaje matemático entre tratos ganados y tratos concluidos (`Won / (Won + Lost)`).
   - **Ticket Promedio:** Valor medio monetario por oportunidad comercial.

2. **Visualizaciones Analíticas (Recharts):**
   - **Distribución por Etapa del Embudo:** Gráfico de barras horizontales con el volumen económico acumulado por cada fase. Al hacer clic en una barra se filtra la vista automáticamente.
   - **Evolución Temporal de Ventas:** Gráfico de áreas sombreadas con la curva cronológica de facturación mensual.
   - **Ranking de Ejecutivos de Cuenta:** Barras de progreso de cumplimiento respecto a la cuota individual de ventas.

3. **Tabla Interactiva de Tratos B2B:**
   - Filtros instantáneos por vendedor, estado (`Open`, `Won`, `Lost`) y búsqueda de texto por cliente o nombre de contrato.
   - Posibilidad de cambiar la etapa, el estado o el responsable directamente en la tabla, recalculando de inmediato los gráficos y KPIs.

4. **Asistente Inteligente n8n / Gemini:**
   - Panel de chat flotante accesible en cualquier pantalla.
   - Permite consultar métricas agregadas (*"¿Quién es el vendedor estrella?"*, *"¿Cuál es la tasa de cierre actual?"*, *"¿Qué contratos están en negociación?"*).
   - Selector configurable de URL de Webhook de n8n con motor inteligente de contingencia integrado.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React 18, TypeScript 5, Vite 5, TailwindCSS 3, Lucide React, Recharts.
- **Backend & Automatización:** n8n Workflow Automation Platform (versión 1.x / Community Edition).
- **Modelo de Lenguaje (LLM):** Google Gemini (gemini-1.5-flash / gemini-pro) conectado vía LangChain n8n node.
- **Memoria Conversacional:** Simple Window Buffer Memory (LangChain).

---

## 💻 Instalación y Ejecución Local

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Pasos
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Santiagox01/lab3.git
   cd lab3
   ```

2. Instalar dependencias del frontend:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   La aplicación quedará disponible en `http://localhost:3000` (o el puerto indicado en la consola).

4. Construir para producción:
   ```bash
   npm run build
   ```

---

## 🤖 Importación y Activación del Flujo en n8n

1. Abrir la interfaz web de n8n (`http://localhost:5678` o nube).
2. Crear un nuevo flujo o hacer clic en **Import from File**.
3. Seleccionar el archivo `n8n_workflow_crm_aerolinea.json` ubicado en este repositorio.
4. En el nodo **Google Gemini Chat Model**, asociar una credencial con una API Key válida de Google AI Studio.
5. Copiar la URL del nodo **Webhook** (modo *Production* o *Test*).
6. En el dashboard web, abrir el Asistente IA, hacer clic en el engranaje de configuración y pegar la URL del Webhook.

---

## 📄 Informe Formal del Laboratorio

El informe exhaustivo del laboratorio cumple estrictamente con el requerimiento de formato monocrómico académico (Times New Roman / Georgia, tipografía en negro `#000000`, sin saturaciones ni colores distractores) y se encuentra disponible en:
- `INFORME_LABORATORIO_3.pdf` (Documento listo para impresión y entrega).
- `INFORME_LABORATORIO_3.html` (Versión digital web).
- `INFORME_LABORATORIO_3.md` (Documento fuente).
