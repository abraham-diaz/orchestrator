# Orchestrator

Dashboard unificado para Raspberry Pi que consume las APIs de **Calendario** y **Todo** en una sola interfaz.

## Arquitectura

```
┌─────────────────────────────────────────────┐
│              Docker: pi-network             │
│                                             │
│  ┌─────────────┐  ┌──────────┐  ┌────────┐ │
│  │ Orchestrator │  │Calendario│  │Todo App│ │
│  │   :4000      │──│  :3000   │  │ :3001  │ │
│  │ (BFF+React)  │──│          │  │        │ │
│  └─────────────┘  └──────────┘  └────────┘ │
└─────────────────────────────────────────────┘
```

Monorepo con npm workspaces:

- **`packages/api`** — Backend Express 5 que actúa como BFF, agregando datos de ambas APIs
- **`packages/web`** — Frontend React 19 + Vite + Tailwind CSS v4

En desarrollo, Vite corre como middleware de Express. Todo se sirve desde el puerto 4000.

## Stack

- Node.js 20+
- TypeScript
- Express 5
- React 19
- Vite
- Tailwind CSS v4
- Docker

## Desarrollo

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Iniciar (API + frontend en :4000)
npm run dev
```

Las variables de entorno apuntan a las APIs de Calendario y Todo:

| Variable | Default | Descripción |
|---|---|---|
| `CALENDAR_API_URL` | `http://localhost:3000` | URL del API de Calendario |
| `TODO_API_URL` | `http://localhost:3001` | URL del API de Todo |
| `PORT` | `4000` | Puerto del orchestrator |

## Build y producción

```bash
# Build (frontend + backend)
npm run build

# Iniciar en producción
npm run start
```

## Docker

```bash
# Crear la red compartida (solo la primera vez)
docker network create pi-network

# Levantar el orchestrator
docker compose up -d --build
```

Los contenedores de Calendario y Todo deben estar en la misma red `pi-network`. Agregar en sus `docker-compose.yml`:

```yaml
networks:
  default:
    name: pi-network
    external: true
```
