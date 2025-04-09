
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LandmarkIcon } from 'lucide-react';
import LoginForm from '@/components/LoginForm';

const GovernmentLoginPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center">
            <LandmarkIcon className="h-12 w-12 text-edu-dark" />
          </div>
          <CardTitle className="text-2xl font-bold">Government Login</CardTitle>
          <CardDescription>
            Enter your credentials to access nationwide student records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm role="government" redirectTo="/government/dashboard" />
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

export default GovernmentLoginPage;
