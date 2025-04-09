
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, School, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getStudentsByInstitute } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

const InstituteDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { data: students, isLoading } = useQuery({
    queryKey: ['students', user?.institute],
    queryFn: () => getStudentsByInstitute(user?.institute || ''),
    enabled: !!user?.institute,
  });
  
  const studentsByCourse = React.useMemo(() => {
    if (!students) return {};
    
    return students.reduce((acc, student) => {
      if (!acc[student.course]) {
        acc[student.course] = 0;
      }
      acc[student.course]++;
      return acc;
    }, {} as Record<string, number>);
  }, [students]);
  
  return (
    <DashboardLayout title="Institute Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Stats Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-7 w-1/2" />
            ) : (
              <div className="text-2xl font-bold">{students?.length || 0}</div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Courses Offered</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-7 w-1/2" />
            ) : (
              <div className="text-2xl font-bold">
                {Object.keys(studentsByCourse).length}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Student Management</CardTitle>
            <CardDescription>Manage students enrolled in your institute</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                className="w-full" 
                onClick={() => navigate('/institute/students')}
              >
                <Users className="mr-2 h-4 w-4" />
                View All Students
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => {
                  // This would open a create student form in a real app
                  navigate('/institute/students');
                }}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Student
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Distribution</CardTitle>
            <CardDescription>Students enrolled by course</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            ) : students?.length ? (
              <div className="space-y-4">
                {Object.entries(studentsByCourse).map(([course, count]) => (
                  <div key={course} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{course}</p>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-edu-secondary"
                          style={{ width: `${(count / students.length) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No student data available.</p>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate('/institute/students')}>
              View Detailed Breakdown
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InstituteDashboard;
