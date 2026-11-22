import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { AppLayout } from './layouts/AppLayout';

// Pages
import Overview from './pages/Overview';
import Customers from './pages/Customers';
import Categories from './pages/Categories';
import Products from './pages/Products';
import Inventory from './pages/Inventory';
import Discounts from './pages/Discounts';
import Orders from './pages/Orders';
import OrderItems from './pages/OrderItems';
import Payments from './pages/Payments';
import Deliveries from './pages/Deliveries';
import QueryLab from './pages/QueryLab';
import Analytics from './pages/Analytics';
import Views from './pages/Views';
import IndexManagement from './pages/IndexManagement';
import Transactions from './pages/Transactions';
import DatabaseTesting from './pages/DatabaseTesting';
import SqlConcepts from './pages/SqlConcepts';
import DatabaseSchema from './pages/DatabaseSchema';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Overview />} />
          <Route path="customers" element={<Customers />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<Products />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="discounts" element={<Discounts />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order-items" element={<OrderItems />} />
          <Route path="payments" element={<Payments />} />
          <Route path="deliveries" element={<Deliveries />} />
          <Route path="query-lab" element={<QueryLab />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="views" element={<Views />} />
          <Route path="indexes" element={<IndexManagement />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="testing" element={<DatabaseTesting />} />
          <Route path="concepts" element={<SqlConcepts />} />
          <Route path="schema" element={<DatabaseSchema />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <VercelAnalytics />
    </BrowserRouter>
  );
}
