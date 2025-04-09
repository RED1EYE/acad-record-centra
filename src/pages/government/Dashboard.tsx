
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, School, BarChart, Search, FileDown } from 'lucide-react';
import { getAllStudents, institutes } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const GovernmentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data, isLoading } = useQuery({
    queryKey: ['allStudents'],
    queryFn: () => getAllStudents(1, 1000), // Get all students for the dashboard
  });
  
  const students = data?.students || [];
  
  // Calculate statistics
  const totalStudents = students.length;
  
  const studentsByInstitute = React.useMemo(() => {
    if (!students.length) return {};
    
    return students.reduce((acc, student) => {
      if (!acc[student.institute]) {
        acc[student.institute] = 0;
      }
      acc[student.institute]++;
      return acc;
    }, {} as Record<string, number>);
  }, [students]);
  
  const studentsByCourse = React.useMemo(() => {
    if (!students.length) return {};
    
    return students.reduce((acc, student) => {
      if (!acc[student.course]) {
        acc[student.course] = 0;
      }
      acc[student.course]++;
      return acc;
    }, {} as Record<string, number>);
  }, [students]);
  
  // Get top 5 courses
  const topCourses = React.useMemo(() => {
    return Object.entries(studentsByCourse)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [studentsByCourse]);
  
  return (
    <DashboardLayout title="Government Dashboard">
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
              <div className="text-2xl font-bold">{totalStudents}</div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Institutes</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-7 w-1/2" />
            ) : (
              <div className="text-2xl font-bold">{institutes.length}</div>
            )}
          </CardContent>
        </Card>
        
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Student Records</CardTitle>
            <CardDescription>Nationwide student database</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                className="w-full" 
                onClick={() => navigate('/government/students')}
              >
                <Search className="mr-2 h-4 w-4" />
                Search Students
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => {
                  // This would generate a CSV in a real application
                  toast({
                    title: 'Export Started',
                    description: 'Your data export is being prepared.',
                  });
                }}
              >
                <FileDown className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Institute Distribution</CardTitle>
            <CardDescription>Students enrolled by institute</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            ) : students.length ? (
              <div className="space-y-4">
                {Object.entries(studentsByInstitute).map(([institute, count]) => (
                  <div key={institute} className="flex items-center justify-between">
                    <div className="space-y-1 w-full mr-4">
                      <p className="text-sm font-medium truncate">{institute}</p>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-edu-primary"
                          style={{ width: `${(count / totalStudents) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium whitespace-nowrap">{count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No student data available.</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Courses</CardTitle>
            <CardDescription>Most popular courses nationwide</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            ) : students.length ? (
              <div className="space-y-4">
                {topCourses.map(([course, count]) => (
                  <div key={course} className="flex items-center justify-between">
                    <div className="space-y-1 w-full mr-4">
                      <p className="text-sm font-medium truncate">{course}</p>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-edu-dark"
                          style={{ width: `${(count / totalStudents) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium whitespace-nowrap">{count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No course data available.</p>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate('/government/students')}>
              View All Data
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default GovernmentDashboard;
