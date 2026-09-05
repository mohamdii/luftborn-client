# Product Management Client

A modern **Angular frontend application** built to consume the Product Management .NET Web API. The project follows a modular, scalable frontend architecture using **Core, Shared, and Feature modules**, reusable services, generic repository abstractions, reactive forms, and HTTP interceptors.

The application was designed with maintainability, separation of concerns, reusability, and scalability in mind.

---

# 🚀 Overview

The Angular application provides the client-side interface for the Product Management system.

It communicates with the .NET backend through RESTful APIs and implements:

* Feature-based architecture
* Core and Shared layers
* Generic Repository Pattern
* Reusable shared components and services
* Angular Reactive Forms
* Authentication integration
* HTTP interceptors
* Error handling interceptor
* Authentication/token interceptor
* Dependency Injection
* Separation of concerns
* Reusable abstractions

The frontend architecture is designed so that new features can be added without creating tightly coupled components and services.

---

# 🏗️ Project Architecture

The application follows a **Core / Shared / Features** architecture.

```text id="q8gk2m"
src
│
├── app
│   │
│   ├── core
│   │   ├── auth
│   │   ├── guards
│   │   ├── interceptors
│   │   ├── services
│   │   ├── models
│   │   └── core configuration
│   │
│   ├── shared
│   │   ├── components
│   │   ├── models
│   │
│   ├── features
│   │   └── products
│   │       ├── components
│   │       ├── pages
│   │       ├── services
│   │       ├── models
│   │       └── product routes
│   │
│   ├── app.routes.ts
│   ├── app.config.ts
│   └── app.component.ts
│
└── assets
```

This structure separates application-wide functionality from reusable functionality and individual business features.

---

# 🧱 Core Layer

The **Core** layer contains functionality that is fundamental to the application and is generally initialized or provided once.

Examples include:

* Authentication
* Authorization
* HTTP interceptors
* Global services
* Guards
* Application-wide models
* Core configuration

The Core layer prevents application-wide functionality from being duplicated across features.

```text id="4wq8kj"
Core
 │
 ├── Authentication
 ├── Authorization
 ├── HTTP Interceptors
 └── Configuration
```

---

# 🔄 Shared Layer

The **Shared** layer contains reusable functionality that can be consumed by multiple features.

Examples include:

* Reusable components
* Shared models
* Common UI functionality

The goal is to avoid duplicating common functionality throughout the application.

```text id="6w7c8m"
Shared
 │
 ├── Components
 ├── Directives
 ├── Pipes
 ├── Models
 └── Services
```

---

# 🧩 Feature-Based Architecture

Business functionality is organized into independent **features**.

For example:

```text id="8p5j5n"
Features
└── Products
    ├── Components
    ├── Pages
    ├── Services
    ├── Models
    └── Routes
```

This allows each feature to encapsulate its own:

* UI
* Business interaction
* API communication
* Models
* Routing

Adding another feature can therefore be done without significantly modifying existing features.

---

# 🗃️ Generic Repository Pattern

The application uses a **Generic Repository Pattern** to abstract communication with REST APIs.

Instead of implementing the same HTTP operations repeatedly for every entity, common CRUD functionality is centralized in a reusable repository abstraction.

Typical operations include:

```text id="z5q0yc"
getAll()
getById()
create()
update()
delete()
```

The feature-specific repositories/services can build on top of the generic abstraction when additional functionality is required.

```text id="v8t0i7"
             Generic Repository
                    │
       ┌────────────┼────────────┐
       ▼            ▼            ▼
 Product Repo   User Repo    Other Repos
       │
       ▼
    HTTP Client
       │
       ▼
    .NET API
```

This reduces duplicated HTTP code and provides a consistent API communication layer.

---

# 📝 Reactive Forms

Product forms are implemented using **Angular Reactive Forms**.

Reactive Forms provide a structured and strongly controlled approach to handling user input and validation.

The form manages:

* Form controls
* Form groups
* Validation
* Form state
* Submission
* Error states

Example structure:

```text id="m9g9x0"
Product Form
    │
    ├── Name
    ├── Description
    ├── Price
    └── Validation
```

Reactive Forms also make the form logic easier to test and maintain compared with placing form behavior directly inside templates.

---

# 🔐 Authentication

The application integrates authentication with **Microsoft Entra ID**.

The Angular client obtains an access token and uses it when communicating with protected backend endpoints.

```text id="n7f7t5"
Angular Application
       │
       ▼
Microsoft Entra ID
       │
       ▼
Access Token
       │
       ▼
HTTP Request
       │
       ▼
.NET Web API
```

This allows the frontend and backend to participate in the same authentication and authorization flow.

---

# 🛡️ HTTP Interceptors

The application uses Angular HTTP interceptors to handle cross-cutting HTTP concerns.

Interceptors allow common behavior to be applied to HTTP requests and responses without duplicating logic inside every service.

The project includes interceptors for:

* Authentication/token handling
* Global error handling

---

## 🔑 Authentication Interceptor

The authentication interceptor is responsible for handling authentication information when making requests to protected API endpoints.

```text id="w1q2v6"
Angular HTTP Request
        │
        ▼
Auth Interceptor
        │
        ▼
Attach Access Token
        │
        ▼
.NET API
```

This keeps authentication concerns outside individual API services.

---

# ❌ Error Interceptor

A dedicated **Error Interceptor** handles HTTP errors globally.

Instead of every component having to implement its own error-handling logic, errors can be intercepted centrally.

```text id="e4d9t1"
HTTP Request
     │
     ▼
.NET API
     │
     ▼
HTTP Error
     │
     ▼
Error Interceptor
     │
     ▼
Global Error Handling
```

This provides a consistent error-handling strategy throughout the application.

---

# 💉 Dependency Injection

Angular's built-in **Dependency Injection** system is used extensively throughout the application.

Services, repositories, authentication functionality, and other shared dependencies are injected rather than instantiated manually.

This improves:

* Testability
* Reusability
* Maintainability
* Separation of concerns
* Loose coupling

---

# 🌐 API Communication

The application communicates with the backend through Angular's `HttpClient`.

The communication flow is structured as:

```text id="g6t8j3"
Component
    │
    ▼
Feature Service / Repository
    │
    ▼
Generic Repository
    │
    ▼
HttpClient
    │
    ▼
HTTP Interceptors
    │
    ▼
.NET Web API
```

This prevents components from directly handling low-level HTTP communication.

---

# 📦 Reusability

A major goal of the frontend architecture is to maximize code reuse.

Reusable functionality is placed in the appropriate layer:

| Type                           | Location    |
| ------------------------------ | ----------- |
| Application-wide services      | Core        |
| Authentication                 | Core        |
| HTTP Interceptors              | Core        |
| Guards                         | Core        |
| Reusable UI components         | Shared      |
| Pipes                          | Shared      |
| Directives                     | Shared      |
| Generic API functionality      | Shared/Core |
| Product-specific functionality | Features    |

This makes the application easier to extend as new business features are introduced.

---

# 🛠️ Technologies

| Technology                    | Purpose                      |
| ----------------------------- | ---------------------------- |
| **Angular**                   | Frontend framework           |
| **TypeScript**                | Programming language         |
| **RxJS**                      | Reactive programming         |
| **Angular HttpClient**        | REST API communication       |
| **Reactive Forms**            | Form management & validation |
| **Microsoft Entra ID / MSAL** | Authentication & SSO         |
| **Dependency Injection**      | Dependency management        |
| **HTTP Interceptors**         | Cross-cutting HTTP concerns  |

---

# 🎯 Architectural Goals

The frontend was designed around the following principles:

* **Separation of Concerns**
* **Single Responsibility**
* **DRY (Don't Repeat Yourself)**
* **Reusability**
* **Low Coupling**
* **Feature Isolation**
* **Maintainability**
* **Scalability**
* **Testability**

The Core, Shared, and Feature separation ensures that application-wide functionality, reusable functionality, and business-specific functionality remain clearly separated.

---

# 🔄 Application Flow

A typical product operation follows this flow:

```text id="n0z5r2"
User
 │
 ▼
Angular Component
 │
 ▼
Product Feature Service
 │
 ▼
Generic Repository
 │
 ▼
HttpClient
 │
 ▼
Authentication Interceptor
 │
 ▼
Error Interceptor
 │
 ▼
.NET Web API
 │
 ▼
CQRS / MediatR
 │
 ▼
Repository / Unit of Work
 │
 ▼
Database
```

This creates a clear separation between the presentation layer and backend infrastructure.

---

# 📌 Summary

The Angular client was built using a **scalable feature-based architecture** with clear separation between application-wide functionality, reusable functionality, and business features.

The project combines:

**Angular + Feature-Based Architecture + Core/Shared Layers + Generic Repository Pattern + Reactive Forms + HTTP Interceptors + Microsoft Entra ID SSO + Dependency Injection**

The architecture is designed to make the application easier to maintain, test, extend, and scale as additional features are introduced.
