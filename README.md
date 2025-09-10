# 🧠 Angular Project Structure

This project is a modern Angular application that demonstrates a scalable and maintainable architecture. It leverages Bootstrap for responsive UI design, FontAwesome for a rich icon set, and JWT Decode for handling user authentication and session management.

---

## 🚀 Key Technologies

-   **Angular 20**: The core framework for building the single-page application.
-   **Bootstrap**: Used for creating responsive layouts and UI components, ensuring a consistent look and feel across devices.
-   **FontAwesome**: Provides a comprehensive library of icons used throughout the application to enhance user experience.
-   **JWT Decode**: A lightweight library used to decode JSON Web Tokens (JWTs) on the client-side for managing user authentication state and permissions.

---

## 📁 Project Structure

The project is organized to separate concerns, making it easy to navigate, scale, and maintain.

```
src/
├── app/
│   ├── core/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── services/
│   │   └── models/
│   │
│   ├── pages/ (or features/)
│   │   ├── home/
│   │   └── user-profile/
│   │
│   ├── shared/
│   │   ├── components/
│   │   ├── directives/
│   │   ├── pipes/
│   │   └── shared.module.ts
│   │
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   └── app.module.ts
│
├── assets/
│   ├── images/
│   └── fonts/
|
│
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
│
├── index.html
├── main.ts
└── styles.css
```


## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd structureAngular
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
ng serve
```

4. Navigate to `http://localhost:4200/`

## Development

- Run `ng generate component component-name` to generate a new component
- Run `ng build` to build the project
- Run `ng test` to execute unit tests

## 👨‍💻 Developed By

# ✨ Mostafa Hamed ✨

🚀 Frontend Developer | Angular • React • Next.js  
📧 Email: [mostafahamed3003@gmail.com](mailto:mostafahamed3003@gmail.com)  
🌐 Portfolio: [portfoliomostafa-hamed.vercel.app](https://portfoliomostafa-hamed.vercel.app/)  

