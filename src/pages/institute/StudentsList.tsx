import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { getStudentsByInstitute } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { UserPlus } from 'lucide-react';
import StudentSearchForm, { StudentSearchFilters } from '@/components/StudentSearchForm';
import StudentTable from '@/components/StudentTable';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';

const StudentsList: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [filters, setFilters] = useState<StudentSearchFilters>({});
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  
  const { data: allStudents, isLoading, refetch } = useQuery({
    queryKey: ['instituteStudents', user?.institute],
    queryFn: () => getStudentsByInstitute(user?.institute || ''),
    enabled: !!user?.institute,
  });
  
  const filteredStudents = React.useMemo(() => {
    if (!allStudents) return [];
    
    return allStudents.filter(student => {
      // Apply filters
      if (filters.abcId && !student.abcId.toLowerCase().includes(filters.abcId.toLowerCase())) {
        return false;
      }
      if (filters.fullName && !student.fullName.toLowerCase().includes(filters.fullName.toLowerCase())) {
        return false;
      }
      // Skip course filter if "All Courses" is selected
      if (filters.course && filters.course !== 'all_courses' && student.course !== filters.course) {
        return false;
      }
      // Skip year filter if "All Years" is selected
      if (filters.yearOfAdmission && filters.yearOfAdmission !== 'all_years' && 
          student.yearOfAdmission.toString() !== filters.yearOfAdmission) {
        return false;
      }
      return true;
    });
  }, [allStudents, filters]);
  
  const handleSearch = (newFilters: StudentSearchFilters) => {
    setFilters(newFilters);
  };
  
  const handleDelete = async (id: string) => {
    // This would be an actual API call in a real app
    setStudentToDelete(id);
  };
  
  const confirmDelete = async () => {
    if (!studentToDelete) return;
    
    try {
      // This would be an actual API call in a real app
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Student deleted",
        description: "The student record has been deleted successfully.",
      });
      
      // Refresh the list
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete student. Please try again.",
      });
    } finally {
      setStudentToDelete(null);
    }
  };
  
  return (
    <DashboardLayout title="Students Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Students of {user?.institute}
          </h2>
          <Button onClick={() => navigate('/institute/students/create')}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Student
          </Button>
        </div>
        
        <StudentSearchForm 
          onSearch={handleSearch} 
          showInstitutes={false} 
        />
        
        {isLoading ? (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
          </Card>
        ) : (
          <StudentTable 
            students={filteredStudents} 
            isInstitute={true} 
            onDelete={handleDelete}
          />
        )}
      </div>
      
      <AlertDialog open={!!studentToDelete} onOpenChange={(open) => !open && setStudentToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the student record. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default StudentsList;
