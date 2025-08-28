import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { useLocations } from '@/hooks/useLocations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Employee, GradeLevel, EmployeeFormData } from '@/types';

const employeeSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  country: z.string().min(2, 'Country is required'),
  state: z.string().min(2, 'State is required'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  role: z.string().min(2, 'Role is required'),
  department: z.string().min(2, 'Department is required'),
  gradeLevelId: z.string().optional(),
  phone: z.string().optional(),
});

interface EmployeeFormProps {
  employee?: Employee;
  gradeLevels: GradeLevel[];
  onSubmit: (data: EmployeeFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function EmployeeForm({ 
  employee, 
  gradeLevels, 
  onSubmit, 
  onCancel, 
  isLoading 
}: EmployeeFormProps) {
  const { countries, getStatesForCountry, isLoading: locationsLoading } = useLocations();
  const [selectedCountry, setSelectedCountry] = useState(employee?.country || '');
  const [availableStates, setAvailableStates] = useState(() => 
    employee?.country ? getStatesForCountry(employee.country) : []
  );

  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: employee?.name || '',
      email: employee?.email || '',
      country: employee?.country || '',
      state: employee?.state || '',
      address: employee?.address || '',
      role: employee?.role || '',
      department: employee?.department || '',
      gradeLevelId: employee?.gradeLevel?.id || 'none',
      phone: employee?.phone || '',
    },
  });

  useEffect(() => {
    if (employee?.country && countries.length > 0) {
      setSelectedCountry(employee.country);
    }
  }, [employee?.country, countries]);

  useEffect(() => {
    if (selectedCountry) {
      setAvailableStates(getStatesForCountry(selectedCountry));
    } else {
      setAvailableStates([]);
    }
  }, [selectedCountry, getStatesForCountry]);

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    form.setValue('country', value);
    form.setValue('state', ''); // Clear state when country changes
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {employee ? 'Edit Employee' : 'Add New Employee'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role *</FormLabel>
                    <FormControl>
                      <Input placeholder="Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department *</FormLabel>
                    <FormControl>
                      <Input placeholder="Engineering" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country *</FormLabel>
                    <Select 
                      onValueChange={handleCountryChange} 
                      value={field.value}
                      disabled={locationsLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={locationsLoading ? "Loading countries..." : "Select a country"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map(country => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State *</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value}
                      disabled={!selectedCountry || locationsLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={
                            !selectedCountry 
                              ? "Select a country first" 
                              : availableStates.length === 0 
                                ? "No states available" 
                                : "Select a state"
                          } />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableStates.map(state => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="123 Main Street, City, State, ZIP"
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gradeLevelId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade Level</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a grade level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">No grade level</SelectItem>
                        {gradeLevels.map(level => (
                          <SelectItem key={level.id} value={level.id}>
                            {level.name} - {level.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : employee ? 'Update Employee' : 'Create Employee'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}