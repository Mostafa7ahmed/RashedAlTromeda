#  Rashed Angular — دليل المشروع الشامل


This repository contains a frontend project built with `Angular 20`, using modern architecture based on Standalone Components, dynamic routing, HTTP interceptors, and multilingual support (`i18n`) with Arabic as the default language.

**Highlights**
- Built with `Angular 20`, `TypeScript`, and `SCSS`.
- Standalone components (no `AppModule`), configured via `app.config.ts`.
- HTTP interceptors for auth, error handling, and token refresh (`JWT Refresh`).
- Internationalization with `@ngx-translate`, translation files under `public/assets/i18n`.
- UI integrations: `Bootstrap 5`, `FontAwesome`, `@ng-select/ng-select`, `ngx-owl-carousel-o`.
- Maps integration using `Leaflet` and `leaflet-control-geocoder`.
- International phone input via `ngx-intl-tel-input`.

**Requirements**
- `Node.js` `18.19+` or `20+`.
- `Angular CLI` `^20.1.6`.
- Package manager: `npm`.

**Core Scripts**
- Development: `npm start` or `ng serve`
- Production build: `npm run build` or `ng build`
- Watch build: `npm run watch`
- Tests: `npm test`

**Quick Start**
1) Install dependencies: `npm install`
2) Run the local dev server: `ng serve`
3) Open in browser: `http://localhost:4200`

**Configuration**
- App configuration: `src/app/app.config.ts`
  - Provides `provideRouter(routes)` and `provideHttpClient(withFetch(), withInterceptors([...]))`.
  - Enables `provideZonelessChangeDetection()` and `provideAnimations()`.
  - Configures `@ngx-translate` to load from `/assets/i18n/` with `fallbackLang: 'ar'` and `lang: 'ar'`.
- Environment: `src/environments/environment.ts`
  - `apiUrl`: API base (currently `https://rashed.runasp.net/api/v1/`).
  - `baseUrl`: Storage path (Supabase), useful for public images/files.

**Assets & Styles**
- Assets copied from `public/` to the build output, including:
  - `public/Icons`, `public/Image`, `public/Sound`, and `public/assets/i18n`.
- Global styles and libraries (declared in `angular.json`):
  - `ngx-owl-carousel-o` (prebuilt themes)
  - `intl-tel-input` (phone input styles)
  - `@ng-select/ng-select` (default theme)
  - `bootstrap` and `@fortawesome/fontawesome-free`
  - App global stylesheet: `src/styles.scss`
- Global scripts: `bootstrap.bundle.min.js`

**Project Structure**
```
public/
  ├── Icons/ , Image/ , Sound/
  └── assets/i18n/          ← translation JSON files
src/
  ├── app/
  │   ├── Core/             ← guards, interceptors, services...
  │   ├── Layout/           ← main layouts per user group
  │   ├── Pages/            ← feature pages & standalone components
  │   ├── Routes/           ← domain routing definitions
  │   ├── Shared/           ← shared components/services/utils
  │   ├── app.config.ts     ← application configuration (Standalone)
  │   ├── app.routes.ts     ← routes aggregation
  │   ├── app.html , app.scss , app.ts
  ├── environments/
  │   └── environment.ts    ← environment keys
  ├── index.html
  ├── main.ts               ← entry point
  └── styles.scss           ← global styles
```

**Routing & Pages**
- Aggregated routes: `src/app/app.routes.ts` including:
  - `customerRoutes`:
    - Pages: `home`, `category`, `service/:categoryId`, `about`, `contact`, `chooseworker/:serviceId`, `profile/:profileId`.
    - Profile area: `myporfile` with tabs: `personal-info`, `suggestions`, `complaints`, `bookings`, `location`, `change-password`.
    - Popup outlet pages: `addsuggest`, `addcomplaint`.
  - `engineerRoutes`:
    - Pages: `home`, `ordersNew`, `organizations`, `center/:id`, `centerDetails/:id`, and `myporfile` tabs like `newJob`, `Advertisement`, `Schedule`, `rates`, etc.
    - Popup outlet pages: `addsuggest`, `addschedule`, `addService`, `addcomplaint`.
  - `organizationRoutes`, `ceneterRoutes` — defined under `src/app/Routes/`.
  - `authRoutes`:
    - Pages: `selectType`, `login/:type`, `selectMap`, `otp`, `register/...`, `forgetpassword`.
  - Fallback route: redirect unknown paths to `home`.

**Guards & Interceptors**
- Guards:
  - `roleGuard([...])`: restrict access by role (`customer`, `engineer`, ...).
  - `isAuthGuard`: handle access to authentication pages.
- HTTP Interceptors (in `Core/interceptors`):
  - `authInterceptor`: inject `JWT` into request headers.
  - `errorInterceptor`: catch and handle common errors.
  - `refreshTokenInterceptor`: manage token refresh on expiration.

**Internationalization (i18n)**
- Path: `public/assets/i18n/`.
- Translation files are JSON, example:
  - `ar.json`, `en.json`.
- Defaults:
  - `fallbackLang: 'ar'`, `lang: 'ar'`.
- To add a new language:
  - Create `public/assets/i18n/<lang>.json` and provide translation keys. You may add a language switcher via a service or app state.

**Maps & Phone Input**
- Maps:
  - Using `leaflet` and `leaflet-control-geocoder`. Ensure Leaflet assets are available (`marker-icon.png`, `marker-shadow.png`).
- Phone input:
  - Using `ngx-intl-tel-input` with `intlTelInput.css`.

**Testing**
- Stack: `Karma` + `Jasmine`.
- Run: `npm test`.
- Config: `tsconfig.spec.json`.

**Build & Deploy**
- Production build: `ng build`.
- Output: `dist/structure-angular/`.
- Production config (`angular.json`):
  - `outputHashing: 'all'`, bundle budgets for initial and component styles.
- Development config: enable `sourceMap`, disable `optimization`.
- Deployment: upload `dist/structure-angular` to your server. Configure SPA routing rewrites for client-side navigation.

**Code Formatting**
- `Prettier` settings in `package.json`:
  - `printWidth: 100`, `singleQuote: true`.
  - HTML parser: `angular` for template files.

**Daily Tips**
- When adding new components, prefer `style: 'scss'` (default schematics).
- Components are standalone and can be lazy-loaded via `loadComponent` in route definitions.
- Place translation files under `public/assets/i18n` and verify the path.
- Use guards to enforce role-based access; interceptors to manage auth and error flows.

**Additional Notes**
- Key dependencies: `@ngx-translate`, `leaflet`, `jwt-decode`, `sweetalert2`, `@ng-select/ng-select`, `ngx-owl-carousel-o`.
- Ensure Node and CLI versions are compatible with Angular 20.

**License & Attribution**
- This project is structured for scalability. If no license is specified, assume internal use or as defined by the project owner.
