
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";
import SalesPage from "./pages/SalesPage";
import InventoryPage from "./pages/InventoryPage";
import PurchasePage from "./pages/PurchasePage";
import PaymentPage from "./pages/PaymentPage";
import IssuesPage from "./pages/IssuesPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => {
  const [language, setLanguage] = React.useState<'en' | 'hi'>('en');
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              <Route element={<ProtectedRoute />}>
                <Route element={<Dashboard />}>
                  <Route path="/dashboard" element={<DashboardPage language={language} />} />
                  <Route path="/admin" element={<AdminPage language={language} />} />
                  <Route path="/sales" element={<SalesPage language={language} />} />
                  <Route path="/inventory" element={<InventoryPage language={language} />} />
                  <Route path="/purchase" element={<PurchasePage language={language} />} />
                  <Route path="/payment" element={<PaymentPage language={language} />} />
                  <Route path="/issues" element={<IssuesPage language={language} />} />
                </Route>
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
