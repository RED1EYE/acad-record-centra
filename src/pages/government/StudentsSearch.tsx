
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAllStudents, StudentRecord } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, ChevronRight, FileDown } from 'lucide-react';
import StudentSearchForm, { StudentSearchFilters } from '@/components/StudentSearchForm';
import StudentTable from '@/components/StudentTable';
import { useToast } from '@/hooks/use-toast';

const ITEMS_PER_PAGE = 10;

const StudentsSearch: React.FC = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<StudentSearchFilters>({});

  const { data, isLoading } = useQuery({
    queryKey: ['governmentStudents', currentPage, filters],
    queryFn: () => getAllStudents(currentPage, ITEMS_PER_PAGE, filters as any),
  });

  const students = data?.students || [];
  const totalPages = data ? Math.ceil(data.total / ITEMS_PER_PAGE) : 0;

  const handleSearch = (newFilters: StudentSearchFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleExportAll = () => {
    toast({
      title: 'Export Started',
      description: 'Preparing to export all student data',
    });
    
    // Simulate export process
    setTimeout(() => {
      toast({
        title: 'Export Complete',
        description: 'All student data has been exported to CSV',
      });
    }, 2000);
  };

  return (
    <DashboardLayout title="Student Records Search">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Search Student Records
          </h2>
          <Button onClick={handleExportAll}>
            <FileDown className="mr-2 h-4 w-4" />
            Export All Data
          </Button>
        </div>
        
        <StudentSearchForm onSearch={handleSearch} showInstitutes={true} />
        
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
          <>
            <StudentTable students={students} isGovernment={true} />
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentsSearch;
