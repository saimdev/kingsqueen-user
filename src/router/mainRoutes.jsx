import { UserProvider } from '@/components/context/UserContext';
import { About, Account, Bag, Checkout, Contact, CustomerService, Home, Login, PaymentStatus, ProductDetail, ReturnOrder, ShippingAndReturns, Shop, TrackOrder, Wishlist } from '@/components/pages';
import AccountDetails from '@/components/pages/Account/AccountDetails';
import Orders from '@/components/pages/Account/orders';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';
import ChangePassword from '@/components/pages/Account/ChangePassword';


const userRoutes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: 'about',
        element: <About />
    },
    {
        path: 'shop/:category',
        element: <Shop />
    },
    {
        path: 'shop',
        element: <Shop />
    },
    {
        path: 'shopping/:slug',
        element: <ProductDetail />
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'bag',
        element: <Bag />
    },
    {
        path: 'wishlist',
        element: <Wishlist />
    },
    {
        path: 'payment-status/:status',
        element: <PaymentStatus />
    },
    {
        element: <ProtectedLayout />,
        children: [
            {
                path: 'account',
                element: <Account />,
                children: [
                    {
                        path: 'account-details',
                        element: <AccountDetails />,
                    },
                    {
                        path: 'orders',
                        element: <Orders />
                    },
                    {
                        path: 'change-password',
                        element: <ChangePassword />
                    },
                ]
            },
            {
                path: 'checkout',
                element: <Checkout />
            }
        ]
    },
    {
        path: 'customer-service',
        element: <CustomerService />,
        children: [
            {
                path: 'contact-us',
                element: <Contact />
            },
            {
                path: 'track-order',
                element: <TrackOrder />
            },
            {
                path: 'return-order',
                element: <ReturnOrder />
            },
            {
                path: 'shipping-returns',
                element: <ShippingAndReturns />
            }
        ]
    }
]


export default userRoutes;