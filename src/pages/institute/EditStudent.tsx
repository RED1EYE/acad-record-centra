
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { getStudentById, updateStudent } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import StudentForm, { StudentFormValues } from '@/components/StudentForm';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const EditStudent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: student, isLoading } = useQuery({
    queryKey: ['student', id],
    queryFn: () => getStudentById(id || ''),
    enabled: !!id,
  });

  const handleSubmit = async (data: StudentFormValues) => {
    if (!id || !user?.institute) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Required information not found. Please try again.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Convert string values to appropriate types
      const studentData = {
        ...data,
        yearOfAdmission: parseInt(data.yearOfAdmission),
        currentYear: parseInt(data.currentYear),
      };

      await updateStudent(id, studentData);
      
      toast({
        title: 'Success',
        description: 'Student record updated successfully!',
      });
      
      navigate('/institute/students');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update student record. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout title="Edit Student">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-96 w-full" />
        </div>
      </DashboardLayout>
    );
  }

  if (!student) {
    return (
      <DashboardLayout title="Edit Student">
        <div className="max-w-3xl mx-auto text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Student Not Found</h3>
          <p className="mt-1 text-sm text-gray-500">
            The student record you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <Button 
            variant="outline" 
            className="mt-6"
            onClick={() => navigate('/institute/students')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Students List
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Edit Student">
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => navigate('/institute/students')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Students List
        </Button>
        
        <StudentForm 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting}
          instituteName={user?.institute || ''}
          student={student}
        />
      </div>
    </DashboardLayout>
  );
};

export default EditStudent;
