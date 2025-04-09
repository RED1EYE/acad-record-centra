
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { createStudent } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import StudentForm, { StudentFormValues } from '@/components/StudentForm';

const CreateStudent: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: StudentFormValues) => {
    if (!user?.institute) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Institute information not found. Please login again.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Convert string values to appropriate types and ensure all required fields are present
      const studentData = {
        fullName: data.fullName,
        dob: data.dob,
        gender: data.gender as 'Male' | 'Female' | 'Other',
        institute: user.institute,
        course: data.course,
        yearOfAdmission: parseInt(data.yearOfAdmission),
        currentYear: parseInt(data.currentYear),
        email: data.email,
        contactNumber: data.contactNumber
      };

      await createStudent(studentData);
      
      toast({
        title: 'Success',
        description: 'Student record created successfully!',
      });
      
      navigate('/institute/students');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create student record. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout title="Add New Student">
      <div className="max-w-3xl mx-auto">
        <StudentForm 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting}
          instituteName={user?.institute || ''}
        />
      </div>
    </DashboardLayout>
  );
};

export default CreateStudent;
