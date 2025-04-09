
import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { getStudentByABCId } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';

const ProfileItem: React.FC<{ label: string; value: string | number | null | undefined }> = ({ label, value }) => {
  return (
    <div className="grid grid-cols-3 gap-4 py-3">
      <dt className="font-medium text-muted-foreground">{label}</dt>
      <dd className="col-span-2 text-gray-900">{value || '—'}</dd>
    </div>
  );
};

const StudentProfile: React.FC = () => {
  const { user } = useAuth();
  
  const { data: student, isLoading } = useQuery({
    queryKey: ['student', user?.abcId],
    queryFn: () => getStudentByABCId(user?.abcId || ''),
    enabled: !!user?.abcId,
  });

  return (
    <DashboardLayout title="Academic Profile">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
            <CardDescription>Your personal and academic details</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : student ? (
              <div className="border rounded-md">
                <div className="px-4 py-5 sm:px-6 bg-muted/50">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                </div>
                <div className="border-t border-gray-200">
                  <dl className="divide-y divide-gray-200 px-4 sm:px-6">
                    <ProfileItem label="Full Name" value={student.fullName} />
                    <ProfileItem label="ABCid" value={student.abcId} />
                    <ProfileItem label="Date of Birth" value={new Date(student.dob).toLocaleDateString()} />
                    <ProfileItem label="Gender" value={student.gender} />
                    <ProfileItem label="Email" value={student.email} />
                    <ProfileItem label="Contact Number" value={student.contactNumber} />
                  </dl>
                </div>
                
                <div className="px-4 py-5 sm:px-6 bg-muted/50 border-t">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Academic Information</h3>
                </div>
                <div className="border-t border-gray-200">
                  <dl className="divide-y divide-gray-200 px-4 sm:px-6">
                    <ProfileItem label="Institute" value={student.institute} />
                    <ProfileItem label="Course" value={student.course} />
                    <ProfileItem label="Year of Admission" value={student.yearOfAdmission} />
                    <ProfileItem label="Current Year" value={student.currentYear} />
                  </dl>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">Profile Not Found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  No academic profile found for your ABCid. Please contact your institute administrator.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfile;
