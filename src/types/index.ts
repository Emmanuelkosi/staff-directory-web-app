export interface GradeLevel {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  country: string;
  state: string;
  address: string;
  role: string;
  department: string;
  gradeLevel?: GradeLevel;
  avatar?: string;
  phone?: string;
  joinDate: Date;
  status: 'active' | 'inactive';
}

export interface EmployeeFormData {
  name: string;
  email: string;
  country: string;
  state: string;
  address: string;
  role: string;
  department: string;
  gradeLevelId?: string;
  phone?: string;
}

export interface GradeLevelFormData {
  name: string;
  description?: string;
}