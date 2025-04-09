
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Graduation, Building2, LandmarkIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  // Redirect authenticated users to their dashboard
  React.useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'student') {
        navigate('/student/dashboard');
      } else if (user.role === 'institute') {
        navigate('/institute/dashboard');
      } else if (user.role === 'government') {
        navigate('/government/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <header className="py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Graduation className="h-8 w-8 text-edu-primary" />
          <h1 className="text-2xl font-bold text-gray-900">
            ABC<span className="text-edu-primary">id</span> Portal
          </h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-3xl w-full text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Student Academic Profile Management
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            A centralized portal for academic records of students across India.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto bg-edu-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                <Graduation className="h-8 w-8 text-edu-primary" />
              </div>
              <CardTitle>Student Login</CardTitle>
              <CardDescription>
                Access your academic records with your ABCid
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button className="w-full bg-edu-primary hover:bg-edu-primary/90" onClick={() => navigate('/login/student')}>
                Login as Student
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto bg-edu-secondary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                <Building2 className="h-8 w-8 text-edu-secondary" />
              </div>
              <CardTitle>Institute Login</CardTitle>
              <CardDescription>
                Manage student records for your institute
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button 
                className="w-full bg-edu-secondary hover:bg-edu-secondary/90" 
                onClick={() => navigate('/login/institute')}
              >
                Login as Institute
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto bg-edu-dark/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                <LandmarkIcon className="h-8 w-8 text-edu-dark" />
              </div>
              <CardTitle>Government Login</CardTitle>
              <CardDescription>
                Access student records across all institutes
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button 
                className="w-full bg-edu-dark hover:bg-edu-dark/90" 
                onClick={() => navigate('/login/government')}
              >
                Login as Govt. Official
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="py-8 px-4 mt-auto">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>© 2023 ABCid Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
