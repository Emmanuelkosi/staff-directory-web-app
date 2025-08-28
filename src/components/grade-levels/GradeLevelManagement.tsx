import { useState } from 'react';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { GradeLevelForm } from './GradeLevelForm';
import { GradeLevel, Employee } from '@/types';

interface GradeLevelManagementProps {
  gradeLevels: GradeLevel[];
  employees: Employee[];
  onAdd: (data: { name: string; description?: string }) => void;
  onEdit: (id: string, data: { name: string; description?: string }) => void;
  onDelete: (id: string) => void;
}

export function GradeLevelManagement({ 
  gradeLevels, 
  employees, 
  onAdd, 
  onEdit, 
  onDelete 
}: GradeLevelManagementProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingLevel, setEditingLevel] = useState<GradeLevel | null>(null);

  const getEmployeeCount = (gradeLevelId: string) => {
    return employees.filter(emp => emp.gradeLevel?.id === gradeLevelId).length;
  };

  const handleEdit = (level: GradeLevel) => {
    setEditingLevel(level);
    setShowForm(true);
  };

  const handleFormSubmit = (data: { name: string; description?: string }) => {
    if (editingLevel) {
      onEdit(editingLevel.id, data);
    } else {
      onAdd(data);
    }
    setShowForm(false);
    setEditingLevel(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingLevel(null);
  };

  if (showForm) {
    return (
      <GradeLevelForm
        gradeLevel={editingLevel}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Grade Levels</h1>
          <p className="text-muted-foreground mt-2">
            Manage employee grade levels and hierarchies
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Grade Level
        </Button>
      </div>

      {gradeLevels.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              No grade levels created yet
            </div>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create First Grade Level
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gradeLevels.map(level => {
            const employeeCount = getEmployeeCount(level.id);
            
            return (
              <Card key={level.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{level.name}</CardTitle>
                      {level.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {level.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(level)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Grade Level</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{level.name}"? 
                              {employeeCount > 0 && (
                                <>
                                  <br />
                                  <br />
                                  This will remove the grade level assignment from {employeeCount} employee{employeeCount > 1 ? 's' : ''}.
                                </>
                              )}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onDelete(level.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>
                        {employeeCount} employee{employeeCount !== 1 ? 's' : ''}
                      </span>
                    </div>
                    
                    <Badge variant="secondary">
                      {level.name}
                    </Badge>
                  </div>
                  
                  <div className="mt-3 text-xs text-muted-foreground">
                    Created on {level.createdAt.toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}