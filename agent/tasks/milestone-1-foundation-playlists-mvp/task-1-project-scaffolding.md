# Task 1: Project Scaffolding

**Milestone**: [M1 - Foundation + Playlists (MVP)](../../milestones/milestone-1-foundation-playlists-mvp.md)
**Design Reference**: [Requirements](../../design/requirements.md)
**Estimated Time**: 2 hours
**Dependencies**: None
**Status**: Not Started

---

## Objective

Create the project structure with all configuration files, build system, and directory organization for a TypeScript MCP server targeting Node.js 20+.

---

## Context

This is the first task and establishes the foundation for all subsequent development. The project uses TypeScript with esbuild for building, Jest for testing, and follows MCP server conventions.

---

## Steps

### 1. Initialize npm project
```bash
npm init -y
```
Update package.json with proper metadata, scripts (build, dev, test, typecheck, start), and type: "module".

### 2. Install core dependencies
```bash
npm install @modelcontextprotocol/sdk googleapis zod
npm install -D typescript @types/node esbuild jest ts-jest @types/jest
```

### 3. Create TypeScript configuration
Create tsconfig.json targeting ES2022, Node16 module resolution, strict mode.

### 4. Create build configuration
Create esbuild.build.js for bundling the server.

### 5. Create directory structure
```bash
mkdir -p src/{auth,client,tools,types,transport}
mkdir -p tests/{unit,integration}
```

### 6. Create entry points
- `src/index.ts` — Main entry point
- `src/server.ts` — MCP server setup

### 7. Create configuration files
- `.gitignore` — node_modules, dist, .env, .tokens
- `.env.example` — Document required environment variables
- `jest.config.js` — Jest configuration for TypeScript

---

## Verification

- [ ] `npm install` succeeds
- [ ] `npm run build` completes without errors
- [ ] `npm run typecheck` passes
- [ ] Directory structure matches specification
- [ ] All config files are valid

---

**Next Task**: [Task 2: OAuth 2.0 Setup](task-2-oauth-setup.md)
