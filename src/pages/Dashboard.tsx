import { Users, Award, Building, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEmployeeStore } from '@/store/useEmployeeStore';

export default function Dashboard() {
  const { employees, gradeLevels } = useEmployeeStore();

  const stats = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter(e => e.status === 'active').length,
    totalGradeLevels: gradeLevels.length,
    departments: [...new Set(employees.map(e => e.department))].length,
  };

  const departmentStats = employees.reduce((acc, employee) => {
    acc[employee.department] = (acc[employee.department] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const gradeLevelStats = gradeLevels.map(level => ({
    ...level,
    count: employees.filter(e => e.gradeLevel?.id === level.id).length,
  }));

  const recentEmployees = employees
    .sort((a, b) => b.joinDate.getTime() - a.joinDate.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your organization's staff directory
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeEmployees} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Grade Levels</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGradeLevels}</div>
            <p className="text-xs text-muted-foreground">
              hierarchy levels
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.departments}</div>
            <p className="text-xs text-muted-foreground">
              active departments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12%</div>
            <p className="text-xs text-muted-foreground">
              vs last quarter
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(departmentStats)
                .sort(([,a], [,b]) => b - a)
                .map(([department, count]) => (
                <div key={department} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{department}</span>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Grade Level Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Grade Level Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {gradeLevelStats
                .sort((a, b) => b.count - a.count)
                .map((level) => (
                <div key={level.id} className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium">{level.name}</span>
                    {level.description && (
                      <p className="text-xs text-muted-foreground">{level.description}</p>
                    )}
                  </div>
                  <Badge variant="secondary">{level.count}</Badge>
                </div>
              ))}
              
              {employees.filter(e => !e.gradeLevel).length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Unassigned</span>
                  <Badge variant="outline">
                    {employees.filter(e => !e.gradeLevel).length}
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Employees */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Additions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentEmployees.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">
                      {employee.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{employee.name}</p>
                    <p className="text-xs text-muted-foreground">{employee.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">
                    {employee.joinDate.toLocaleDateString()}
                  </p>
                  <Badge variant="secondary" className="text-xs">
                    {employee.department}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}