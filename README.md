# SWA 미래채움 - 교육 관리 시스템

Admin Dashboard for SWA 미래채움 Education Management System

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- react-router-dom
- lucide-react icons
- date-fns
- Sonner (toast notifications)

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── App.tsx
│   └── routes.tsx
├── components/
│   ├── ui/          # shadcn/ui components
│   ├── TabCards.tsx
│   ├── DataTable.tsx
│   ├── CalendarMonth.tsx
│   └── ScrollToTop.tsx
├── layout/
│   ├── AppLayout.tsx
│   └── Sidebar.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── schedule/
│   └── apply/
├── data/
│   └── mock.ts
├── lib/
│   └── utils.ts
└── styles/
    └── globals.css
```

## Features

- Clean, elegant UI matching the SWA 미래채움 design
- Dark sidebar with collapsible menu groups
- Light main content area
- Tab-based navigation
- Data tables with mock data
- Calendar view (monthly)
- Responsive design
- Route-based navigation with scroll-to-top

## Routes

- `/dashboard` - Dashboard
- `/schedule/my-lectures` - My Lecture List
- `/schedule/confirmed` - Confirmed Classes
- `/schedule/in-progress` - Education in Progress
- `/schedule/completed` - Completed Education
- `/apply/open` - Upcoming Open Education
- `/apply/request` - Apply for Lecture
- `/my-applications` - My Applied Education



