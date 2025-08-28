import { useNavigate, useParams } from 'react-router-dom';
import { EmployeeForm } from '@/components/employees/EmployeeForm';
import { useEmployeeStore } from '@/store/useEmployeeStore';
import { EmployeeFormData } from '@/types';
import { toast } from 'sonner';

export default function EditEmployeePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { employees, updateEmployee, gradeLevels } = useEmployeeStore();

  const employee = employees.find(e => e.id === id);

  if (!employee) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Employee Not Found</h1>
        <p className="text-muted-foreground mb-4">
          The employee you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate('/employees')}
          className="text-primary hover:underline"
        >
          Back to Employees
        </button>
      </div>
    );
  }

  const handleSubmit = (data: EmployeeFormData) => {
    updateEmployee(employee.id, data);
    toast.success(`${data.name} has been updated successfully`);
    navigate('/employees');
  };

  const handleCancel = () => {
    navigate('/employees');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Edit Employee</h1>
        <p className="text-muted-foreground mt-2">
          Update {employee.name}'s profile information
        </p>
      </div>

      <EmployeeForm
        employee={employee}
        gradeLevels={gradeLevels}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}