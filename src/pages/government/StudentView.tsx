
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getStudentById } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, FileDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const StudentView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: student, isLoading } = useQuery({
    queryKey: ['student', id],
    queryFn: () => getStudentById(id || ''),
    enabled: !!id,
  });

  const handleExport = () => {
    toast({
      title: 'Export Started',
      description: 'Student data export in progress',
    });
    
    // Simulate export process
    setTimeout(() => {
      toast({
        title: 'Export Complete',
        description: 'Student data has been exported to CSV',
      });
    }, 1500);
  };

  if (isLoading) {
    return (
      <DashboardLayout title="Student Details">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-96 w-full" />
        </div>
      </DashboardLayout>
    );
  }

  if (!student) {
    return (
      <DashboardLayout title="Student Details">
        <div className="max-w-3xl mx-auto text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Student Not Found</h3>
          <p className="mt-1 text-sm text-gray-500">
            The student record you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <Button 
            variant="outline" 
            className="mt-6"
            onClick={() => navigate('/government/students')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Students Search
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Student Details">
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => navigate('/government/students')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Students Search
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle>Student Profile: {student.fullName}</CardTitle>
            <CardDescription>ABCid: {student.abcId}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Personal Information</h3>
              <Separator className="mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{student.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">{new Date(student.dob).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-medium">{student.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact Number</p>
                  <p className="font-medium">{student.contactNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{student.email}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Academic Information</h3>
              <Separator className="mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Institute</p>
                  <p className="font-medium">{student.institute}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Course</p>
                  <p className="font-medium">{student.course}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year of Admission</p>
                  <p className="font-medium">{student.yearOfAdmission}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Year</p>
                  <p className="font-medium">{student.currentYear}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleExport} className="w-full">
              <FileDown className="mr-2 h-4 w-4" />
              Export Student Data
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentView;
