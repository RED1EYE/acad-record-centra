
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, User, GraduationCap, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getStudentByABCId, StudentRecord } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { data: student, isLoading } = useQuery({
    queryKey: ['student', user?.abcId],
    queryFn: () => getStudentByABCId(user?.abcId || ''),
    enabled: !!user?.abcId,
  });
  
  return (
    <DashboardLayout title="Student Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="col-span-full md:col-span-1">
          <CardHeader className="flex flex-row items-center space-y-0 gap-4">
            <div className="w-14 h-14 rounded-full bg-edu-primary/10 flex items-center justify-center">
              <User className="h-7 w-7 text-edu-primary" />
            </div>
            <div>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>View your academic profile</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : student ? (
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Name:</span> {student.fullName}</p>
                <p><span className="font-medium">ABCid:</span> {student.abcId}</p>
                <p><span className="font-medium">Institute:</span> {student.institute}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No profile information available. Please contact your institute.</p>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate('/student/profile')} className="w-full" variant="outline">
              View Complete Profile
            </Button>
          </CardFooter>
        </Card>
        
        {/* Quick Access Cards */}
        <Card>
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-full bg-edu-primary/10 flex items-center justify-center mb-2">
              <GraduationCap className="h-6 w-6 text-edu-primary" />
            </div>
            <CardTitle>Academic Details</CardTitle>
            <CardDescription>Your course information</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ) : student ? (
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Course:</span> {student.course}</p>
                <p><span className="font-medium">Current Year:</span> {student.currentYear}</p>
                <p><span className="font-medium">Admission Year:</span> {student.yearOfAdmission}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No academic information available.</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-full bg-edu-secondary/10 flex items-center justify-center mb-2">
              <FileText className="h-6 w-6 text-edu-secondary" />
            </div>
            <CardTitle>Documents</CardTitle>
            <CardDescription>Your academic records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              <p className="font-medium">No documents available yet.</p>
              <p className="text-muted-foreground">
                All official documents will appear here once issued by your institute.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-full bg-edu-dark/10 flex items-center justify-center mb-2">
              <Calendar className="h-6 w-6 text-edu-dark" />
            </div>
            <CardTitle>Academic Calendar</CardTitle>
            <CardDescription>Important dates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              <p className="font-medium">No upcoming events</p>
              <p className="text-muted-foreground">
                Check back later for exam schedules and important dates.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
