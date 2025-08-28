import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmployeeList } from '@/components/employees/EmployeeList';
import { EmployeeProfile } from '@/components/employees/EmployeeProfile';
import { useEmployeeStore } from '@/store/useEmployeeStore';
import { useSearch } from '@/components/layout/AppLayout';
import { Employee } from '@/types';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

export default function EmployeesPage() {
  const navigate = useNavigate();
  const { searchQuery } = useSearch();
  const { employees, gradeLevels, deleteEmployee, setSelectedEmployee, selectedEmployee } = useEmployeeStore();
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

  const handleView = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleEdit = (employee: Employee) => {
    navigate('/employees/edit/' + employee.id);
  };

  const handleDelete = (employee: Employee) => {
    setEmployeeToDelete(employee);
  };

  const confirmDelete = () => {
    if (employeeToDelete) {
      deleteEmployee(employeeToDelete.id);
      setEmployeeToDelete(null);
      setSelectedEmployee(null);
      toast.success(`${employeeToDelete.name} has been deleted`);
    }
  };

  const handleBack = () => {
    setSelectedEmployee(null);
  };

  if (selectedEmployee) {
    return (
      <EmployeeProfile
        employee={selectedEmployee}
        onBack={handleBack}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">All Employees</h1>
          <p className="text-muted-foreground mt-2">
            Manage your organization's staff directory
          </p>
        </div>
        <Button onClick={() => navigate('/employees/add')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      <EmployeeList
        employees={employees}
        gradeLevels={gradeLevels}
        searchQuery={searchQuery}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AlertDialog open={!!employeeToDelete} onOpenChange={(open) => !open && setEmployeeToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Employee</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {employeeToDelete?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}