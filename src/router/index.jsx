import {createBrowserRouter} from 'react-router-dom'
import MainLayout from '@/components/layouts/MainLayout';
import mainRoutes from './mainRoutes';
import Error from '@/components/pages/errorPages/Error';
import CommonLayout from '@/components/layouts/CommonLayout';
import { UserProvider } from '@/components/context/UserContext';


const router = createBrowserRouter([
    {
        path: '/',
        element: <UserProvider><CommonLayout /></UserProvider>,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <MainLayout />,
                children: mainRoutes,
            }
        ]
    }
])


export default router;