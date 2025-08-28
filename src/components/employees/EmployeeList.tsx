import { useState } from 'react';
import { EmployeeCard } from './EmployeeCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Employee, GradeLevel } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, Filter } from 'lucide-react';

interface EmployeeListProps {
  employees: Employee[];
  gradeLevels: GradeLevel[];
  searchQuery: string;
  onView: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export function EmployeeList({ 
  employees, 
  gradeLevels, 
  searchQuery, 
  onView, 
  onEdit, 
  onDelete 
}: EmployeeListProps) {
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<string>('all');

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGradeLevel = selectedGradeLevel === 'all' || 
                             (selectedGradeLevel === 'unassigned' && !employee.gradeLevel) ||
                             employee.gradeLevel?.id === selectedGradeLevel;
    
    return matchesSearch && matchesGradeLevel;
  });

  const clearFilters = () => {
    setSelectedGradeLevel('all');
  };

  const hasActiveFilters = selectedGradeLevel !== 'all';

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filters:</span>
        </div>
        
        <Select value={selectedGradeLevel} onValueChange={setSelectedGradeLevel}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by grade level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Grade Levels</SelectItem>
            <SelectItem value="unassigned">Unassigned</SelectItem>
            {gradeLevels.map(level => (
              <SelectItem key={level.id} value={level.id}>
                {level.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </Button>
        )}

        <div className="ml-auto">
          <Badge variant="secondary">
            {filteredEmployees.length} of {employees.length} employees
          </Badge>
        </div>
      </div>

      {/* Employee Grid */}
      {filteredEmployees.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-2">
            {searchQuery || hasActiveFilters ? 'No employees found matching your criteria' : 'No employees yet'}
          </div>
          {(searchQuery || hasActiveFilters) && (
            <Button variant="outline" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map(employee => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}