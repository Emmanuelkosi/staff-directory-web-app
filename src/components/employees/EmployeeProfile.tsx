import { ArrowLeft, Mail, Phone, MapPin, Building, Calendar, Award, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Employee } from '@/types';

interface EmployeeProfileProps {
  employee: Employee;
  onBack: () => void;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export function EmployeeProfile({ employee, onBack, onEdit, onDelete }: EmployeeProfileProps) {
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Employees
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onEdit(employee)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" onClick={() => onDelete(employee)}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Main Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                {getInitials(employee.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{employee.name}</h1>
                  <p className="text-xl text-muted-foreground mt-1">{employee.role}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <Badge className={`${getStatusColor(employee.status)}`}>
                      {employee.status}
                    </Badge>
                    {employee.gradeLevel && (
                      <Badge variant="secondary" className="gap-1">
                        <Award className="h-3 w-3" />
                        {employee.gradeLevel.name}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-muted-foreground">{employee.email}</p>
              </div>
            </div>
            
            {employee.phone && (
              <>
                <Separator />
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">{employee.phone}</p>
                  </div>
                </div>
              </>
            )}
            
            <Separator />
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Address</p>
                <div className="text-muted-foreground">
                  <p>{employee.address}</p>
                  <p>{employee.state}, {employee.country}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Work Information */}
        <Card>
          <CardHeader>
            <CardTitle>Work Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Building className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Department</p>
                <p className="text-muted-foreground">{employee.department}</p>
              </div>
            </div>
            
            <Separator />
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Join Date</p>
                <p className="text-muted-foreground">
                  {employee.joinDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            {employee.gradeLevel && (
              <>
                <Separator />
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Grade Level</p>
                    <p className="text-muted-foreground">
                      {employee.gradeLevel.name}
                      {employee.gradeLevel.description && (
                        <span className="block text-sm">{employee.gradeLevel.description}</span>
                      )}
                    </p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}