import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardLayout } from './components/DashboardLayout';
import { Login } from './pages/Login';

// Lazy load admin pages for better performance
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Analytics = lazy(() => import('./pages/Analytics').then(m => ({ default: m.Analytics })));
const Newsletter = lazy(() => import('./pages/Newsletter').then(m => ({ default: m.Newsletter })));
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const BlogEditor = lazy(() => import('./pages/BlogEditor').then(m => ({ default: m.BlogEditor })));
const Quotations = lazy(() => import('./pages/Quotations').then(m => ({ default: m.Quotations })));
const QuotationDetail = lazy(() => import('./pages/QuotationDetail').then(m => ({ default: m.QuotationDetail })));
const PortfolioAdvanced = lazy(() => import('./pages/PortfolioAdvanced').then(m => ({ default: m.PortfolioAdvanced })));
const AdvancedAdminChat = lazy(() => import('./pages/AdvancedAdminChat'));
const QuotationGenerator = lazy(() => import('../../src/pages/QuotationGenerator'));
const Settings = lazy(() => import('./pages/Settings').then(m => ({ default: m.Settings })));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
      <p className="text-gray-600 font-medium">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public route */}
            <Route path="/login" element={<Login />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Analytics />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/newsletter"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Newsletter />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Blog />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog/new"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <BlogEditor />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog/edit/:id"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <BlogEditor />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/quotations"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Quotations />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/quotations/create"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <QuotationGenerator />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/quotations/:id"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <QuotationDetail />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/portfolio"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <PortfolioAdvanced />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <AdvancedAdminChat />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Settings />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Router>

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#333',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
