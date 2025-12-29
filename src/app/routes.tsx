import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/layout/AppLayout'
import { Dashboard } from '@/pages/Dashboard'
import { MyLectures } from '@/pages/schedule/MyLectures'
import { MyLecturesDetail } from '@/pages/schedule/MyLecturesDetail'
import { Confirmed } from '@/pages/schedule/Confirmed'
import { InProgress } from '@/pages/schedule/InProgress'
import { Completed } from '@/pages/schedule/Completed'
import { OpenTraining } from '@/pages/apply/OpenTraining'
import { RequestApply } from '@/pages/apply/RequestApply'
import { RequestApplyDetail } from '@/pages/apply/RequestApplyDetail'
import { MyApplications } from '@/pages/apply/MyApplications'
import { MyApplicationsDetail } from '@/pages/apply/MyApplicationsDetail'

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
        path: '/schedule/my-lectures/:id',
        element: <MyLecturesDetail />,
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
        path: '/apply/request/:id',
        element: <RequestApplyDetail />,
      },
      {
        path: '/my-applications',
        element: <MyApplications />,
      },
      {
        path: '/my-applications/:id',
        element: <MyApplicationsDetail />,
      },
      {
        path: '/',
        element: <Dashboard />,
      },
    ],
  },
])


