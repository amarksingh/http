# @ostro/http — Antigravity AI Architecture & Knowledge Base

> **Package Name**: `@ostro/http`
> **Version**: `2.0.0-alpha.1`
> **Role in Ecosystem**: Modular Core Framework Library

---

## 1. Package Purpose & Overview
HTTP context, Request/Response wrappers, routing middlewares, multipart upload streaming, and JSON resources.

- **Primary Architectural Patterns**: Context wrapper around Node.js incoming request / server response, middleware chain.
- **Key Exported Entities**: `HttpContext`, `Request`, `Response`, `RedirectResponse`, `File`

---

## 2. Dependencies & Interoperability
- **Direct Dependencies**:
  - `@ostro/contracts`: `^1.0.3`
  - `accepts`: `^1.3.7`
  - `array-flatten`: `^3.0.0`
  - `body-parser`: `^1.20.2`
  - `busboy`: `^1.6.0`
  - `bytes`: `3.1.0`
  - `compressible`: `2.0.18`
  - `content-disposition`: `^0.5.3`
  - `content-type`: `^1.0.4`
  - `cors`: `^2.8.5`
  - `encodeurl`: `^1.0.2`
  - `escape-html`: `^1.0.3`
  - `etag`: `^1.8.1`
  - `fresh`: `^0.5.2`
  - `lodash`: `^4.17.21`
  - `methods`: `^1.1.2`
  - `on-finished`: `^2.3.0`
  - `on-headers`: `1.0.2`
  - `parseurl`: `^1.3.3`
  - `path-to-regexp`: `^6.2.0`
  - `proxy-addr`: `^2.0.7`
  - `qs`: `^6.10.0`
  - `range-parser`: `^1.2.1`
  - `safe-buffer`: `^5.2.0`
  - `send`: `^0.17.1`
  - `serve-static`: `^1.14.1`
  - `statuses`: `^1.5.0`
  - `type-is`: `^1.6.18`
  - `utils-merge`: `^1.0.1`
  - `uuid`: `8.3.2`
  - `vary`: `^1.1.2`
- **Framework Consumers**: Consumed across the OstroJS ecosystem via `@ostro/framework` and direct imports.

---

## 3. Directory & Source Layout
```text
origin/http/
├── exception/httpException.ts
├── exception/throttleRequestsException.ts
├── exception/tokenMismatchException.ts
├── file.ts
├── httpContext.ts
├── middleware/bodyParserJson.ts
├── middleware/bodyParserUrlEncoded.ts
├── middleware/compression.ts
├── middleware/crossOrigin.ts
├── middleware/formParser.ts
├── middleware/queryParser.ts
├── middleware/serveStatic.ts
├── redirectResponse.ts
├── request.ts
├── resources/json/invalidArrayException.ts
├── resources/json/invalidObjectException.ts
├── resources/json/jsonResources.ts
├── resources/json/resourceCollection.ts
├── response.ts
├── url.ts
└── ... (1 more files)
```

---

## 4. TypeScript Typing & Code Standards
1. **Access Modifiers**: All class properties and methods declare explicit visibility (`public`, `protected`, `private`).
2. **Inheritance & Overrides**: Classes overriding base class methods use the `override` keyword to safeguard contracts.
3. **Immutability**: Constant lookup tables and static registries use `readonly` and strict record types.
4. **No Implicit Any**: Public APIs avoid `any` in favor of generics (`<T = unknown>`) and typed contracts from `@ostro/contracts`.
5. **Contract Binding**: Core managers implement contracts from `@ostro/contracts/http/*`.

---

## 5. Development & Verification Guide
- **Compile / Build**: `npm run build` (runs `tsc -p tsconfig.build.json`)
- **Run Tests**: `npm test` (executes Jest with 100% coverage target via `c8`)
- **Published Artifacts**: Target output compiled to `./build` with accompanying `.d.ts` declarations and source maps.

---
*Generated for Antigravity AI high-speed codebase comprehension with minimal token consumption.*
