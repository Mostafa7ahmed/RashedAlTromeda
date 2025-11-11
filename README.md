# Structure Angular — دليل المشروع الشامل

هذا المستودع يحتوي على مشروع واجهات أمامية مبني باستخدام `Angular 20` بهيكل حديث يعتمد على المكونات المستقلة (Standalone Components)، التوجيه الديناميكي، اعتراضات HTTP، ودعم تعدد اللغات (`i18n`) مع اللغة العربية كلغة افتراضية.

**أهم ما يميز المشروع**
- يعتمد على `Angular 20` و`TypeScript` و`SCSS`.
- مكونات مستقلة بدون `AppModule`، مع إعداد عبر `app.config.ts`.
- اعتراضات HTTP للتوثيق، الأخطاء، وتحديث الرموز (`JWT Refresh`).
- تعدد اللغات باستخدام `@ngx-translate` مع ملفات ترجمة تحت `public/assets/i18n`.
- تكامل جاهز مع مكتبات الواجهة: `Bootstrap 5`, `FontAwesome`, `@ng-select/ng-select`, `ngx-owl-carousel-o`.
- دعم الخرائط عبر `Leaflet` و`leaflet-control-geocoder`.
- إدخال أرقام الهاتف الدولي عبر `ngx-intl-tel-input`.

**المتطلبات**
- `Node.js` إصدار `18.19+` أو `20+`.
- `Angular CLI` إصدار `^20.1.6`.
- مدير الحزم `npm`.

**الأوامر الأساسية**
- تشغيل التطوير: `npm start` أو `ng serve`
- البناء للإنتاج: `npm run build` أو `ng build`
- مراقبة البناء: `npm run watch`
- الاختبارات: `npm test`

**البدء السريع**
1) تثبيت الحزم: `npm install`
2) تشغيل الخادم المحلي: `ng serve`
3) افتح المتصفح على: `http://localhost:4200`

**الإعداد والتكوين**
- ملف إعداد التطبيق: `src/app/app.config.ts`
  - يوفّر `provideRouter(routes)` و`provideHttpClient(withFetch(), withInterceptors([...]))`.
  - يفعّل `provideZonelessChangeDetection()` و`provideAnimations()`.
  - يهيّئ `@ngx-translate` بملفات ترجمة من المسار: `/assets/i18n/` مع `fallbackLang: 'ar'` و`lang: 'ar'`.
- بيئة التشغيل: `src/environments/environment.ts`
  - `apiUrl`: عنوان واجهة الـ API (حاليًا `https://rashed.runasp.net/api/v1/`).
  - `baseUrl`: مسار التخزين للملفات (Supabase)، مفيد للصور والملفات العامة.

**إدارة الأصول والأنماط**
- الأصول تُنسخ من مجلد `public/` إلى ناتج البناء، بما في ذلك:
  - `public/Icons`, `public/Image`, `public/Sound`, و`public/assets/i18n`.
- الأنماط والمكتبات المضمنة (مُعلن عنها في `angular.json`):
  - `ngx-owl-carousel-o` (ثيمين جاهزين)
  - `intl-tel-input` (تنسيق إدخال الهاتف)
  - `@ng-select/ng-select` (ثيم افتراضي)
  - `bootstrap` و`@fortawesome/fontawesome-free`
  - ملف الأنماط العام: `src/styles.scss`
- السكربتات المضافة عالميًا: `bootstrap.bundle.min.js`

**بنية المشروع**
```
e2e/ (إن وجد)
public/
  ├── Icons/ , Image/ , Sound/
  └── assets/i18n/          ← ملفات الترجمة بصيغة JSON
src/
  ├── app/
  │   ├── Core/             ← حراس، اعتراضات، خدمات...
  │   ├── Layout/           ← قوالب التخطيط الرئيسية لكل نوع مستخدم
  │   ├── Pages/            ← الصفحات والمكونات المنفصلة لكل ميزة
  │   ├── Routes/           ← تعريف التجزئة والتوجيه للمجالات المختلفة
  │   ├── Shared/           ← عناصر مشتركة (مكونات، خدمات، utils)
  │   ├── app.config.ts     ← تكوين التطبيق (Standalone)
  │   ├── app.routes.ts     ← تجميع مسارات المجالات
  │   ├── app.html , app.scss , app.ts
  ├── environments/
  │   └── environment.ts    ← مفاتيح البيئة
  ├── index.html
  ├── main.ts               ← نقطة الدخول للتشغيل
  └── styles.scss           ← الأنماط العامة
```

**التوجيه والصفحات**
- التجميع العام للمسارات: `src/app/app.routes.ts` ويشمل:
  - `customerRoutes` (العميل):
    - صفحات: `home`, `category`, `service/:categoryId`, `about`, `contact`, `chooseworker/:serviceId`, `profile/:profileId`.
    - منطقة الملف الشخصي: `myporfile` مع تبويبات فرعية مثل: `personal-info`, `suggestions`, `complaints`, `bookings`, `location`, `change-password`.
    - صفحات منبثقة عبر `outlet: 'popup'`: مثل `addsuggest`, `addcomplaint`.
  - `engineerRoutes` (المهندس):
    - صفحات: `home`, `ordersNew`, `organizations`, `center/:id`, `centerDetails/:id`، ومنطقة `myporfile` بتبويبات مثل: `newJob`, `Advertisement`, `Schedule`, `rates`, وغيرها.
    - صفحات منبثقة: `addsuggest`, `addschedule`, `addService`, `addcomplaint`.
  - `organizationRoutes`, `ceneterRoutes` (المركز) — معرفة في `src/app/Routes/`.
  - `authRoutes` (التوثيق):
    - صفحات: `selectType`, `login/:type`, `selectMap`, `otp`, `register/...`, `forgetpassword`.
  - مسار افتراضي: تحويل أي مسار غير معروف إلى `home`.

**الحراس والاعتراضات**
- الحراس:
  - `roleGuard([...])`: تقييد الوصول حسب الدور (`customer`, `engineer`, ...).
  - `isAuthGuard`: إدارة الوصول لصفحات التوثيق.
- اعتراضات HTTP (في `Core/interceptors`):
  - `authInterceptor`: حقن رمز التوثيق (`JWT`) في الرؤوس.
  - `errorInterceptor`: التقاط ومعالجة الأخطاء العامة.
  - `refreshTokenInterceptor`: إدارة تحديث الرموز عند انتهاء الصلاحية.

**الترجمة (i18n)**
- المسار: `public/assets/i18n/`.
- ملفات الترجمة بصيغة JSON، مثال:
  - `ar.json`, `en.json`.
- الإعداد الافتراضي:
  - `fallbackLang: 'ar'`, `lang: 'ar'`.
- لإضافة لغة جديدة:
  - أنشئ ملفًا مثل `public/assets/i18n/fr.json`، ثم وفّر مفاتيح الترجمة، ويمكن لاحقًا إضافة آلية لتبديل اللغة عبر خدمة أو حالة تطبيق.

**إعداد الخرائط وإدخال الهاتف**
- الخرائط:
  - باستخدام `leaflet` و`leaflet-control-geocoder`. تأكد من تحميل أنماط Leaflet (موجودة ضمن الأصول العامة: `marker-icon.png`, `marker-shadow.png`).
- إدخال الهاتف:
  - باستخدام `ngx-intl-tel-input` مع أنماطه `intlTelInput.css`.

**الاختبارات**
- إطار العمل: `Karma` + `Jasmine`.
- التشغيل: `npm test`.
- ملف إعداد الاختبار: `tsconfig.spec.json`.

**البناء والنشر**
- البناء للإنتاج: `ng build`.
- ناتج البناء: `dist/structure-angular/`.
- الضبط الإنتاجي (`angular.json`):
  - `outputHashing: 'all'`، حدود الميزانية للمجموعات الأولية وأنماط المكونات.
- الضبط التطويري: تفعيل `sourceMap` وتعطيل `optimization`.
- النشر: ارفع محتويات مجلد `dist/structure-angular` إلى الخادم، وتأكد من تهيئة إعادة كتابة المسارات لدعم SPA.

**تنسيق الكود**
- إعداد `Prettier` في `package.json`:
  - `printWidth: 100`, `singleQuote: true`.
  - محلل HTML: `angular` لملفات القوالب.

**نصائح العمل اليومي**
- عند إضافة مكونات جديدة؛ استخدم `style: 'scss'` (الإعداد الافتراضي في `schematics`).
- المكونات هنا مستقلة (Standalone)، ويمكن تحميلها كسولًا عبر `loadComponent` داخل تعريفات المسارات.
- ضع ملفات الترجمة داخل `public/assets/i18n`، وتحقق من المسار عند الجلب.
- استخدم الحراس لضبط الوصول بحسب الدور، والاعتراضات لإدارة التوثيق والأخطاء.

**معلومات إضافية**
- الاعتماديات الأساسية موجودة في `package.json` (مثل: `@ngx-translate`, `leaflet`, `jwt-decode`, `sweetalert2`, `@ng-select/ng-select`, `ngx-owl-carousel-o`).
- تأكد من توافق إصدارات Node وCLI مع Angular 20.

**حقوق ونسب**
- هذا المشروع مهيكل ومهيأ ليكون قابلًا للتوسع. إن لم تكن هناك رخصة محددة، يُفترض استخدامه داخليًا أو وفق ما يحدده صاحب المشروع.
