
import React from 'react';
import { StudentRecord } from '@/services/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, FileDown, PencilIcon, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface StudentTableProps {
  students: StudentRecord[];
  isGovernment?: boolean;
  isInstitute?: boolean;
  onDelete?: (id: string) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  isGovernment = false,
  isInstitute = false,
  onDelete
}) => {
  const { toast } = useToast();

  const handleExport = (student: StudentRecord) => {
    toast({
      title: 'Export Started',
      description: `Exporting data for ${student.fullName}`,
    });
    
    // In a real app, this would trigger a CSV download
    setTimeout(() => {
      toast({
        title: 'Export Complete',
        description: 'Student data has been exported to CSV',
      });
    }, 1500);
  };

  if (students.length === 0) {
    return (
      <div className="text-center py-10 border rounded-md">
        <p className="text-lg text-muted-foreground">No students found</p>
        <p className="text-sm text-muted-foreground">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ABCid</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Institute</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Year</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.abcId}</TableCell>
                <TableCell>{student.fullName}</TableCell>
                <TableCell>{student.institute}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell>{student.currentYear}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    {isInstitute && (
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                        >
                          <Link to={`/institute/students/${student.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                        >
                          <Link to={`/institute/students/${student.id}/edit`}>
                            <PencilIcon className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        {onDelete && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onDelete(student.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        )}
                      </>
                    )}
                    
                    {isGovernment && (
                      <>
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                        >
                          <Link to={`/government/students/${student.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleExport(student)}
                        >
                          <FileDown className="h-4 w-4" />
                          <span className="sr-only">Export</span>
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StudentTable;
