import Dashboard from '../components/admin/Dashboard';
import Profile from '../components/admin/Profile';
import Club from '../components/admin/category/Club';
import ViewClub from '../components/admin/category/ViewClub';
import EditClub from '../components/admin/category/EditClub';
import AddProduct from '../components/admin/product/AddProduct';
import ViewProduct from '../components/admin/product/ViewProduct';
import EditProduct from '../components/admin/product/EditProduct';
import Order from '../components/admin/order/Order';
import OrderDetail from '../components/admin/order/OrderDetail';


const routes = [
    { path: '/admin', exact: true, name: 'Admin' },
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/admin/add-club', exact: true, name: 'Category', component: Club },
    { path: '/admin/view-club', exact: true, name: 'ViewCategory', component: ViewClub },
    { path: '/admin/edit-club/:id', exact: true, name: 'EditCategory', component: EditClub },
    { path: '/admin/add-product', exact: true, name: 'AddProduct', component: AddProduct },
    { path: '/admin/view-product', exact: true, name: 'ViewProduct', component: ViewProduct },
    { path: '/admin/edit-product/:id', exact: true, name: 'EditProduct', component: EditProduct },
    { path: '/admin/profile', exact: true, name: 'Profile', component: Profile },
    { path: '/admin/orders', exact: true, name: 'Order', component: Order },
    { path: '/admin/order/:id', exact: true, name: 'OrderDetail', component: OrderDetail },
];

export default routes;