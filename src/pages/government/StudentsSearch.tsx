
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Filter, Search, FileDown, Eye } from 'lucide-react';
import { getAllStudents, institutes, courses, StudentRecord } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const StudentsSearch: React.FC = () => {
  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInstitute, setSelectedInstitute] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  
  // Create filter object for API
  const filters = React.useMemo(() => {
    const filterObj: Partial<StudentRecord> = {};
    
    if (selectedInstitute) {
      filterObj.institute = selectedInstitute;
    }
    
    if (selectedCourse) {
      filterObj.course = selectedCourse;
    }
    
    if (searchTerm) {
      // This is handled client-side for simplicity in our mock implementation
    }
    
    return filterObj;
  }, [selectedInstitute, selectedCourse, searchTerm]);
  
  // Fetch student data
  const { data, isLoading } = useQuery({
    queryKey: ['allStudents', page, limit, filters],
    queryFn: () => getAllStudents(page, limit, filters),
  });
  
  const students = data?.students || [];
  const totalPages = data ? Math.ceil(data.total / limit) : 0;
  
  // Apply search filter client-side (in a real app, this would be done by the API)
  const filteredStudents = React.useMemo(() => {
    if (!searchTerm.trim()) return students;
    
    const term = searchTerm.toLowerCase();
    return students.filter((student) => 
      student.fullName.toLowerCase().includes(term) ||
      student.abcId.toLowerCase().includes(term) ||
      student.email.toLowerCase().includes(term)
    );
  }, [students, searchTerm]);
  
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  
  const handleExport = () => {
    // In a real app, this would generate a CSV file
    alert('This would download a CSV file in a real application.');
  };
  
  return (
    <DashboardLayout title="Student Search">
      <Card>
        <CardHeader>
          <CardTitle>Student Database</CardTitle>
          <CardDescription>
            Search and filter student records nationwide
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name, ABCid, or email..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 md:flex gap-4">
              <Select value={selectedInstitute} onValueChange={setSelectedInstitute}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Institutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Institutes</SelectItem>
                  {institutes.map((institute) => (
                    <SelectItem key={institute} value={institute}>{institute}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Courses</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>{course}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setSelectedInstitute('');
                setSelectedCourse('');
              }}>
                <Filter className="mr-2 h-4 w-4" />
                Reset
              </Button>
              
              <Button variant="secondary" onClick={handleExport}>
                <FileDown className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader className="h-8 w-8 animate-spin text-edu-dark" />
            </div>
          ) : (
            <>
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>ABCid</TableHead>
                      <TableHead className="hidden md:table-cell">Institute</TableHead>
                      <TableHead className="hidden md:table-cell">Course</TableHead>
                      <TableHead className="hidden md:table-cell">Year</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.fullName}</TableCell>
                          <TableCell>{student.abcId}</TableCell>
                          <TableCell className="hidden md:table-cell">{student.institute}</TableCell>
                          <TableCell className="hidden md:table-cell">{student.course}</TableCell>
                          <TableCell className="hidden md:table-cell">{student.currentYear}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setSelectedStudent(student);
                                setViewDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No students found matching your criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {totalPages > 1 && (
                <div className="mt-4 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
                      </PaginationItem>
                      
                      {[...Array(totalPages)].map((_, i) => {
                        const pageNumber = i + 1;
                        // Show first page, last page, and pages around current page
                        if (
                          pageNumber === 1 || 
                          pageNumber === totalPages || 
                          (pageNumber >= page - 1 && pageNumber <= page + 1)
                        ) {
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                isActive={pageNumber === page}
                                onClick={() => handlePageChange(pageNumber)}
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        } else if (
                          (pageNumber === 2 && page > 3) || 
                          (pageNumber === totalPages - 1 && page < totalPages - 2)
                        ) {
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                        return null;
                      })}
                      
                      <PaginationItem>
                        <PaginationNext onClick={() => handlePageChange(page + 1)} />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
              
              <div className="mt-4 text-sm text-muted-foreground">
                Showing {filteredStudents.length} of {data?.total || 0} students
              </div>
            </>
          )}
        </CardContent>
      </Card>
      
      {/* Student Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
            <DialogDescription>
              Complete information about the selected student
            </DialogDescription>
          </DialogHeader>
          
          {selectedStudent && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Personal Information</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm font-medium">Full Name:</span>
                      <p>{selectedStudent.fullName}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">ABCid:</span>
                      <p>{selectedStudent.abcId}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Date of Birth:</span>
                      <p>{new Date(selectedStudent.dob).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Gender:</span>
                      <p>{selectedStudent.gender}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm font-medium">Email:</span>
                      <p>{selectedStudent.email}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Phone Number:</span>
                      <p>{selectedStudent.contactNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Academic Information</h3>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="text-sm font-medium">Institute:</span>
                      <p>{selectedStudent.institute}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Course:</span>
                      <p>{selectedStudent.course}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Year of Admission:</span>
                      <p>{selectedStudent.yearOfAdmission}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Current Year:</span>
                      <p>{selectedStudent.currentYear}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default StudentsSearch;
