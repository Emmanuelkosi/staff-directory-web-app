import { GradeLevelManagement } from '@/components/grade-levels/GradeLevelManagement';
import { useEmployeeStore } from '@/store/useEmployeeStore';
import { toast } from 'sonner';

export default function GradeLevelsPage() {
  const { 
    gradeLevels, 
    employees, 
    addGradeLevel, 
    updateGradeLevel, 
    deleteGradeLevel 
  } = useEmployeeStore();

  const handleAdd = (data: { name: string; description?: string }) => {
    addGradeLevel(data);
    toast.success(`Grade level "${data.name}" has been created`);
  };

  const handleEdit = (id: string, data: { name: string; description?: string }) => {
    updateGradeLevel(id, data);
    toast.success(`Grade level "${data.name}" has been updated`);
  };

  const handleDelete = (id: string) => {
    const gradeLevel = gradeLevels.find(g => g.id === id);
    deleteGradeLevel(id);
    toast.success(`Grade level "${gradeLevel?.name}" has been deleted`);
  };

  return (
    <GradeLevelManagement
      gradeLevels={gradeLevels}
      employees={employees}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}