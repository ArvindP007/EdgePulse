import { Routes, Route } from "react-router-dom";

import LoginPage from "@/features/auth/pages/LoginPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../layouts/AppLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        element={
            <ProtectedRoute>
                <AppLayout />
            </ProtectedRoute>
        }
    >
        <Route index element={<DashboardPage />} />

        {/* <Route path="customers" element={<CustomerPage />} />

        <Route path="users" element={<UsersPage />} /> */}
    </Route>
    </Routes>
  );
}