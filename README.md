# Staff Directory- Web application

A professional staff directory and employee management system built with React, TypeScript, and modern web technologies.

## Overview

Staff Hub helps organizations manage employees and grade levels with a clean, responsive UI.

### Features
- Employee profiles: add, edit, delete, and view
- Grade level management and assignment
- Search and filtering by name, role, department, and level
- Dashboard and detailed profile views

## Getting Started

### Prerequisites
- Node.js (LTS) and npm

### Setup
```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
```

By default, the dev server runs on http://localhost:8080

## Tech Stack
- React 18, TypeScript, Vite, Redux
- Tailwind CSS, shadcn/ui
- Zustand, React Hook Form, Zod

## Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── employees/       # Employee-specific components
│   ├── grade-levels/    # Grade level management
│   ├── layout/          # App layout and navigation
│   └── ui/              # Base UI components (shadcn/ui)
├── pages/               # Application pages/routes
├── store/               # State management (Zustand)
├── types/               # TypeScript type definitions
└── lib/                 # Utility functions
```

## Build
```sh
npm run build
```
live hosted site link-https://68b05b80155a0433074d6342--gentle-lily-2ca9ae.netlify.app/
The optimized production build will be output to `dist/`.
created by Ugwumgbo Emmanuel
