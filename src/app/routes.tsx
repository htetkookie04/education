import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/layout/AppLayout'
import { Dashboard } from '@/pages/Dashboard'
import { MyLectures } from '@/pages/schedule/MyLectures'
import { Confirmed } from '@/pages/schedule/Confirmed'
import { InProgress } from '@/pages/schedule/InProgress'
import { Completed } from '@/pages/schedule/Completed'
import { OpenTraining } from '@/pages/apply/OpenTraining'
import { RequestApply } from '@/pages/apply/RequestApply'
import { MyApplications } from '@/pages/apply/MyApplications'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/schedule/my-lectures',
        element: <MyLectures />,
      },
      {
        path: '/schedule/confirmed',
        element: <Confirmed />,
      },
      {
        path: '/schedule/in-progress',
        element: <InProgress />,
      },
      {
        path: '/schedule/completed',
        element: <Completed />,
      },
      {
        path: '/apply/open',
        element: <OpenTraining />,
      },
      {
        path: '/apply/request',
        element: <RequestApply />,
      },
      {
        path: '/my-applications',
        element: <MyApplications />,
      },
      {
        path: '/',
        element: <Dashboard />,
      },
    ],
  },
])


