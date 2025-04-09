
import { UserRole } from "@/contexts/AuthContext";

// Mock Student Record Type
export interface StudentRecord {
  id: string;
  abcId: string;
  fullName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  institute: string;
  course: string;
  yearOfAdmission: number;
  currentYear: number;
  email: string;
  contactNumber: string;
}

// List of institutes for mock data
export const institutes = [
  'Delhi University',
  'Mumbai University',
  'Bangalore Institute of Technology',
  'IIT Madras',
  'Amity University'
];

// List of courses for mock data
export const courses = [
  'B.Tech. Computer Science',
  'B.Tech. Electrical Engineering',
  'B.Tech. Mechanical Engineering',
  'B.Com. Honors',
  'BBA',
  'M.Tech. Computer Science',
  'M.Tech. Electronics',
  'MBA',
  'M.Sc. Physics',
  'B.Sc. Mathematics'
];

// Generate a random ABCid
const generateABCId = (): string => {
  const prefix = 'ABC';
  const numbers = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('');
  return `${prefix}${numbers}`;
};

// Generate mock student data
const generateMockStudents = (count: number): StudentRecord[] => {
  const currentYear = new Date().getFullYear();
  
  return Array.from({ length: count }, (_, index) => {
    const yearOfAdmission = currentYear - Math.floor(Math.random() * 4);
    const instituteIndex = Math.floor(Math.random() * institutes.length);
    const courseIndex = Math.floor(Math.random() * courses.length);
    
    return {
      id: `student-${index + 1}`,
      abcId: generateABCId(),
      fullName: [
        ['Arjun', 'Aanya', 'Vikram', 'Neha', 'Rohan', 'Priya', 'Raj', 'Anjali'][Math.floor(Math.random() * 8)],
        ['Kumar', 'Singh', 'Sharma', 'Patel', 'Verma', 'Gupta', 'Joshi', 'Reddy'][Math.floor(Math.random() * 8)]
      ].join(' '),
      dob: `${1990 + Math.floor(Math.random() * 10)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      gender: ['Male', 'Female', 'Other'][Math.floor(Math.random() * 3)] as 'Male' | 'Female' | 'Other',
      institute: institutes[instituteIndex],
      course: courses[courseIndex],
      yearOfAdmission,
      currentYear: Math.min(currentYear - yearOfAdmission + 1, 4),
      email: `student${index + 1}@example.com`,
      contactNumber: `+91 ${Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')}`
    };
  });
};

// Mock database
const mockStudents: StudentRecord[] = generateMockStudents(100);

// API Functions
export const getStudentByABCId = (abcId: string): Promise<StudentRecord | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const student = mockStudents.find(s => s.abcId === abcId);
      resolve(student || null);
    }, 500);
  });
};

export const getStudentById = (id: string): Promise<StudentRecord | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const student = mockStudents.find(s => s.id === id);
      resolve(student || null);
    }, 500);
  });
};

export const getStudentsByInstitute = (institute: string): Promise<StudentRecord[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const students = mockStudents.filter(s => s.institute === institute);
      resolve(students);
    }, 500);
  });
};

export const getAllStudents = (
  page: number = 1,
  limit: number = 10,
  filters: Partial<StudentRecord> = {}
): Promise<{ students: StudentRecord[], total: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredStudents = [...mockStudents];
      
      // Apply filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          filteredStudents = filteredStudents.filter(student => 
            String(student[key as keyof StudentRecord]).toLowerCase().includes(String(value).toLowerCase())
          );
        }
      });
      
      const total = filteredStudents.length;
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedStudents = filteredStudents.slice(start, end);
      
      resolve({ students: paginatedStudents, total });
    }, 500);
  });
};

export const createStudent = (student: Omit<StudentRecord, 'id' | 'abcId'>): Promise<StudentRecord> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newStudent: StudentRecord = {
        ...student,
        id: `student-${mockStudents.length + 1}`,
        abcId: generateABCId(),
      };
      
      mockStudents.push(newStudent);
      resolve(newStudent);
    }, 500);
  });
};

export const updateStudent = (id: string, updates: Partial<StudentRecord>): Promise<StudentRecord | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockStudents.findIndex(s => s.id === id);
      if (index !== -1) {
        mockStudents[index] = { ...mockStudents[index], ...updates };
        resolve(mockStudents[index]);
      } else {
        resolve(null);
      }
    }, 500);
  });
};

export const deleteStudent = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockStudents.findIndex(s => s.id === id);
      if (index !== -1) {
        mockStudents.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 500);
  });
};
