import { Routes, Route } from "react-router-dom";

import LoginPage from "@/features/auth/pages/LoginPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../layouts/AppLayout";
import CustomerPage from "@/features/customers/pages/CustomerPage";
import ServerErrorPage from "@/pages/ServerErrorPage";
import UnauthorizedPage from "@/pages/UnauthorizedPage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/403" element={<UnauthorizedPage />} />
      <Route path="/500" element={<ServerErrorPage />} />
      
      <Route
        element={
            <ProtectedRoute>
                <AppLayout />
            </ProtectedRoute>
        }
    >
        <Route index element={<DashboardPage />} />

        <Route path="customers" element={<CustomerPage />} />

        {/* <Route path="users" element={<UsersPage />} /> */}
    </Route>
    <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}