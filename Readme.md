# Maintenance Request and Tracking System
- Difficulty: ★★★☆☆ (Intermediate)
- Description: An app that allows students to report maintenance issues in their hostel rooms or common areas (e.g., plumbing, electricity, cleaning) and track the resolution status.
`Key Features:`
- Maintenance request creation with issue description and photo upload
Status tracking for each request (e.g., pending, in-progress, resolved)
- Notifications for updates on request statuses.

## Project Structure
maintenance-tracking-system/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validators/
│   │   └── app.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── views/
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
├── README.md
## For Backend
src/
├── controllers/
│   ├── authController.ts
│   └── requestController.ts
├── middlewares/
│   ├── authMiddleware.ts
│   └── errorHandler.ts
├── routes/
│   ├── authRoutes.ts
│   └── requestRoutes.ts
├── services/
│   ├── authService.ts
│   └── requestService.ts
├── utils/
│   ├── hashUtils.ts
│   └── tokenUtils.ts
├── validators/
│   └── requestValidator.ts
└── app.ts
