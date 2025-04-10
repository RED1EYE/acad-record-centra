
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import StudentLoginPage from "./pages/auth/StudentLoginPage";
import InstituteLoginPage from "./pages/auth/InstituteLoginPage";
import GovernmentLoginPage from "./pages/auth/GovernmentLoginPage";
import StudentDashboard from "./pages/student/Dashboard";
import InstituteDashboard from "./pages/institute/Dashboard";
import GovernmentDashboard from "./pages/government/Dashboard";
import StudentDetails from "./pages/institute/StudentDetails";
import StudentProfile from "./pages/student/Profile";
import StudentsList from "./pages/institute/StudentsList";
import StudentsSearch from "./pages/government/StudentsSearch";
import CreateStudent from "./pages/institute/CreateStudent";
import EditStudent from "./pages/institute/EditStudent";
import StudentView from "./pages/government/StudentView";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login/student" element={<StudentLoginPage />} />
            <Route path="/login/institute" element={<InstituteLoginPage />} />
            <Route path="/login/government" element={<GovernmentLoginPage />} />
            
            {/* Student Routes */}
            <Route path="/student/dashboard" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/student/profile" element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentProfile />
              </ProtectedRoute>
            } />
            
            {/* Institute Routes */}
            <Route path="/institute/dashboard" element={
              <ProtectedRoute allowedRoles={['institute']}>
                <InstituteDashboard />
              </ProtectedRoute>
            } />
            <Route path="/institute/students" element={
              <ProtectedRoute allowedRoles={['institute']}>
                <StudentsList />
              </ProtectedRoute>
            } />
            <Route path="/institute/students/:id" element={
              <ProtectedRoute allowedRoles={['institute']}>
                <StudentDetails />
              </ProtectedRoute>
            } />
            <Route path="/institute/students/create" element={
              <ProtectedRoute allowedRoles={['institute']}>
                <CreateStudent />
              </ProtectedRoute>
            } />
            <Route path="/institute/students/:id/edit" element={
              <ProtectedRoute allowedRoles={['institute']}>
                <EditStudent />
              </ProtectedRoute>
            } />
            
            {/* Government Routes */}
            <Route path="/government/dashboard" element={
              <ProtectedRoute allowedRoles={['government']}>
                <GovernmentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/government/students" element={
              <ProtectedRoute allowedRoles={['government']}>
                <StudentsSearch />
              </ProtectedRoute>
            } />
            <Route path="/government/students/:id" element={
              <ProtectedRoute allowedRoles={['government']}>
                <StudentView />
              </ProtectedRoute>
            } />
            
            {/* Catch all - 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
