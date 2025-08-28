import { Mail, MapPin, Phone, Building, Award, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Employee } from '@/types';

interface EmployeeCardProps {
  employee: Employee;
  onView: (employee: Employee) => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export function EmployeeCard({ employee, onView, onEdit, onDelete }: EmployeeCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground';
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-border hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                {getInitials(employee.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {employee.name}
              </h3>
              <p className="text-sm text-muted-foreground">{employee.role}</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(employee)}>
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(employee)}>
                Edit Employee
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onDelete(employee)}
                className="text-destructive focus:text-destructive"
              >
                Delete Employee
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span className="truncate">{employee.email}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="truncate">{employee.state}, {employee.country}</span>
        </div>
        
        {employee.phone && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{employee.phone}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building className="h-4 w-4" />
          <span>{employee.department}</span>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            {employee.gradeLevel && (
              <Badge variant="secondary" className="text-xs">
                <Award className="h-3 w-3 mr-1" />
                {employee.gradeLevel.name}
              </Badge>
            )}
            <Badge className={`text-xs ${getStatusColor(employee.status)}`}>
              {employee.status}
            </Badge>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onView(employee)}
            className="text-primary hover:text-primary/80"
          >
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}