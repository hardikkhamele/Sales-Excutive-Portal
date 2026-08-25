import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { Companies } from "../pages/Companies";
import { AddCompany } from "../pages/AddCompany";
import { CompanyDetails } from "../pages/CompanyDetails";
import { EditCompany } from "../pages/EditCompany";
import { Activities } from "../pages/Activities";
import { Reports } from "../pages/Reports";
import { Profile } from "../pages/Profile";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Protected Main Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/add" element={<AddCompany />} />
        <Route path="/companies/:id" element={<CompanyDetails />} />
        <Route path="/companies/:id/edit" element={<EditCompany />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
