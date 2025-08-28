import { create } from 'zustand';
import { Employee, GradeLevel, EmployeeFormData, GradeLevelFormData } from '@/types';

interface EmployeeStore {
  employees: Employee[];
  gradeLevels: GradeLevel[];
  selectedEmployee: Employee | null;
  
  // Employee actions
  addEmployee: (data: EmployeeFormData) => void;
  updateEmployee: (id: string, data: EmployeeFormData) => void;
  deleteEmployee: (id: string) => void;
  setSelectedEmployee: (employee: Employee | null) => void;
  
  // Grade level actions
  addGradeLevel: (data: GradeLevelFormData) => void;
  updateGradeLevel: (id: string, data: GradeLevelFormData) => void;
  deleteGradeLevel: (id: string) => void;
  
  // Utility actions
  assignGradeLevel: (employeeId: string, gradeLevelId: string) => void;
}

// Mock data
const mockGradeLevels: GradeLevel[] = [
  { id: '1', name: 'LVL1', description: 'Entry Level', createdAt: new Date() },
  { id: '2', name: 'LVL2', description: 'Mid Level', createdAt: new Date() },
  { id: '3', name: 'LVL3', description: 'Senior Level', createdAt: new Date() },
  { id: '4', name: 'LVL4', description: 'Lead Level', createdAt: new Date() },
];

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    country: 'United States',
    state: 'California',
    address: '123 Tech Street, San Francisco, CA 94105',
    role: 'Software Engineer',
    department: 'Engineering',
    gradeLevel: mockGradeLevels[1],
    phone: '+1 (555) 123-4567',
    joinDate: new Date('2022-03-15'),
    status: 'active',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    country: 'Canada',
    state: 'Ontario',
    address: '456 Innovation Ave, Toronto, ON M5V 2H1',
    role: 'Product Manager',
    department: 'Product',
    gradeLevel: mockGradeLevels[2],
    phone: '+1 (416) 555-7890',
    joinDate: new Date('2021-11-08'),
    status: 'active',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    country: 'United States',
    state: 'New York',
    address: '789 Business Blvd, New York, NY 10001',
    role: 'UX Designer',
    department: 'Design',
    gradeLevel: mockGradeLevels[1],
    phone: '+1 (212) 555-2468',
    joinDate: new Date('2023-01-22'),
    status: 'active',
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@company.com',
    country: 'United Kingdom',
    state: 'England',
    address: '321 Corporate Lane, London, SW1A 1AA',
    role: 'Engineering Manager',
    department: 'Engineering',
    gradeLevel: mockGradeLevels[3],
    phone: '+44 20 7946 0958',
    joinDate: new Date('2020-07-14'),
    status: 'active',
  },
];

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
  employees: mockEmployees,
  gradeLevels: mockGradeLevels,
  selectedEmployee: null,

  addEmployee: (data: EmployeeFormData) => {
    const newEmployee: Employee = {
      id: Date.now().toString(),
      ...data,
      gradeLevel: data.gradeLevelId && data.gradeLevelId !== 'none'
        ? get().gradeLevels.find(g => g.id === data.gradeLevelId)
        : undefined,
      joinDate: new Date(),
      status: 'active',
    };
    
    set(state => ({
      employees: [...state.employees, newEmployee]
    }));
  },

  updateEmployee: (id: string, data: EmployeeFormData) => {
    set(state => ({
      employees: state.employees.map(employee =>
        employee.id === id
          ? {
              ...employee,
              ...data,
              gradeLevel: data.gradeLevelId && data.gradeLevelId !== 'none'
                ? state.gradeLevels.find(g => g.id === data.gradeLevelId)
                : undefined,
            }
          : employee
      )
    }));
  },

  deleteEmployee: (id: string) => {
    set(state => ({
      employees: state.employees.filter(employee => employee.id !== id),
      selectedEmployee: state.selectedEmployee?.id === id ? null : state.selectedEmployee
    }));
  },

  setSelectedEmployee: (employee: Employee | null) => {
    set({ selectedEmployee: employee });
  },

  addGradeLevel: (data: GradeLevelFormData) => {
    const newGradeLevel: GradeLevel = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date(),
    };
    
    set(state => ({
      gradeLevels: [...state.gradeLevels, newGradeLevel]
    }));
  },

  updateGradeLevel: (id: string, data: GradeLevelFormData) => {
    set(state => ({
      gradeLevels: state.gradeLevels.map(gradeLevel =>
        gradeLevel.id === id ? { ...gradeLevel, ...data } : gradeLevel
      )
    }));
  },

  deleteGradeLevel: (id: string) => {
    set(state => ({
      gradeLevels: state.gradeLevels.filter(gradeLevel => gradeLevel.id !== id),
      employees: state.employees.map(employee =>
        employee.gradeLevel?.id === id 
          ? { ...employee, gradeLevel: undefined }
          : employee
      )
    }));
  },

  assignGradeLevel: (employeeId: string, gradeLevelId: string) => {
    const gradeLevel = get().gradeLevels.find(g => g.id === gradeLevelId);
    
    set(state => ({
      employees: state.employees.map(employee =>
        employee.id === employeeId
          ? { ...employee, gradeLevel }
          : employee
      )
    }));
  },
}));