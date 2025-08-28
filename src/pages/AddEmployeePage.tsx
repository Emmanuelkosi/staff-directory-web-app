import { useNavigate } from 'react-router-dom';
import { EmployeeForm } from '@/components/employees/EmployeeForm';
import { useEmployeeStore } from '@/store/useEmployeeStore';
import { EmployeeFormData } from '@/types';
import { toast } from 'sonner';

export default function AddEmployeePage() {
  const navigate = useNavigate();
  const { addEmployee, gradeLevels } = useEmployeeStore();

  const handleSubmit = (data: EmployeeFormData) => {
    addEmployee(data);
    toast.success(`${data.name} has been added successfully`);
    navigate('/employees');
  };

  const handleCancel = () => {
    navigate('/employees');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Add New Employee</h1>
        <p className="text-muted-foreground mt-2">
          Create a new employee profile
        </p>
      </div>

      <EmployeeForm
        gradeLevels={gradeLevels}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}