
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { courses, institutes } from '@/services/api';

const formSchema = z.object({
  abcId: z.string().optional(),
  fullName: z.string().optional(),
  institute: z.string().optional(),
  course: z.string().optional(),
  yearOfAdmission: z.string().optional(),
});

export type StudentSearchFilters = z.infer<typeof formSchema>;

interface StudentSearchFormProps {
  onSearch: (filters: StudentSearchFilters) => void;
  showInstitutes?: boolean;
  defaultInstitute?: string;
}

const StudentSearchForm: React.FC<StudentSearchFormProps> = ({ 
  onSearch, 
  showInstitutes = true,
  defaultInstitute 
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());
  
  const form = useForm<StudentSearchFilters>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      abcId: '',
      fullName: '',
      institute: defaultInstitute || '',
      course: '',
      yearOfAdmission: '',
    },
  });

  const resetForm = () => {
    form.reset({
      abcId: '',
      fullName: '',
      institute: defaultInstitute || '',
      course: '',
      yearOfAdmission: '',
    });
    onSearch({});
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Search Students</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSearch)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="abcId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ABCid</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter student name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {showInstitutes && (
                <FormField
                  control={form.control}
                  name="institute"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institute</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select institute" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">All Institutes</SelectItem>
                          {institutes.map(institute => (
                            <SelectItem key={institute} value={institute}>
                              {institute}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">All Courses</SelectItem>
                        {courses.map(course => (
                          <SelectItem key={course} value={course}>
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="yearOfAdmission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year of Admission</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">All Years</SelectItem>
                        {years.map(year => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex space-x-2 pt-2">
              <Button type="submit" className="flex-1">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                <X className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default StudentSearchForm;
