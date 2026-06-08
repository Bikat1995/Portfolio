# E-Tebeka: Legal Research Platform - Project Overview

This document explains the architecture, technology stack, and core features of the E-Tebeka project to help you discuss it in interviews or write a detailed case study for your portfolio.

## 1. High-Level Architecture
E-Tebeka is built using a modern decoupled architecture:
*   **Frontend Client:** A Single Page Application (SPA) with Server-Side Rendering (SSR) capabilities built in Next.js.
*   **Backend API:** A fast, asynchronous RESTful API built in Python using FastAPI.
*   **Communication:** The frontend communicates with the backend via secure HTTP requests (using Axios and React Query). 

## 2. Technology Stack & How It Was Built

### Frontend (User Interface)
*   **Framework:** Next.js (React) - Chosen for its routing capabilities, server-side rendering for better SEO, and optimized performance.
*   **Styling:** Tailwind CSS - Used to rapidly build custom, responsive UI components (like the hero section, tier cards, and dashboards) without leaving the HTML/JSX.
*   **State Management & Data Fetching:** React Query (@tanstack/react-query) is used to cache, synchronize, and update server state seamlessly.
*   **Animations:** Framer Motion - Added to create smooth micro-animations, page transitions, and interactive hover states to make the platform feel premium.
*   **Forms & Validation:** React Hook Form combined with Zod for robust, type-safe client-side form validation (useful for login/registration).
*   **PDF Viewing:** `react-pdf` is integrated to allow lawyers and students to seamlessly read legal documents directly in the browser.

### Backend (API & Business Logic)
*   **Framework:** FastAPI (Python) - Chosen for its extremely high performance, asynchronous capabilities (`async`/`await`), and automatic Swagger documentation generation.
*   **Server:** Uvicorn - A lightning-fast ASGI server used to run the FastAPI application.
*   **Authentication & Security:** 
    *   **Firebase Admin & JWTs:** Uses `firebase-admin` and `python-jose` for secure JSON Web Token (JWT) handling and session management.
    *   **Password Hashing:** `passlib` with bcrypt for secure credential storage.
    *   **MFA (Multi-Factor Authentication):** Integrated `pyotp` and `qrcode` to provide an extra layer of security, particularly for high-tier users like Lawyers.
*   **Data Validation:** Pydantic is heavily used within FastAPI to ensure incoming data (like search queries or user registrations) is strictly typed and validated before hitting the database.

## 3. Core Features & Implementation Highlights

*   **Advanced Document Search:** The platform allows users to search through Ethiopian federal laws. The backend is optimized to handle complex queries, filter by document type, and return paginated results quickly.
*   **Tiered Role-Based Access Control (RBAC):**
    *   The system uses middleware/route-guards to check user permissions.
    *   **Public Tier:** Limited searches and views.
    *   **Student Tier:** Requires verification, grants access to a custom dashboard and document saving/bookmarking.
    *   **Lawyer Tier:** A subscription-based tier granting unlimited access, full PDF downloads, and advanced security (MFA).
*   **Personalized User Dashboards:** Based on the JWT token payload, the Next.js frontend routes users to specific dashboards (`/dashboard/student`, `/dashboard/lawyer`, etc.) where they can manage their saved documents and account settings.

## 4. Summary for Interviews
If asked "How did you build this?", you can summarize it like this:
> *"I built E-Tebeka using a decoupled architecture. I used Next.js and Tailwind CSS for a fast, responsive frontend, managing state with React Query. For the backend, I built a high-performance REST API using Python's FastAPI, implementing secure JWT authentication, role-based access control, and optimized search endpoints to serve legal documents efficiently."*
