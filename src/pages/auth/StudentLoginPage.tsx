
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';
import LoginForm from '@/components/LoginForm';

const StudentLoginPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center">
            <GraduationCap className="h-12 w-12 text-edu-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Student Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your academic profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm role="student" redirectTo="/student/dashboard" />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-muted-foreground text-center">
            <span>For demonstration purposes, any email and password with at least 6 characters will work.</span>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')} 
            className="w-full"
          >
            Back to Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StudentLoginPage;
