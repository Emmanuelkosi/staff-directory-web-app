import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GradeLevel } from '@/types';

const gradeLevelSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
});

interface GradeLevelFormProps {
  gradeLevel?: GradeLevel;
  onSubmit: (data: { name: string; description?: string }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function GradeLevelForm({ 
  gradeLevel, 
  onSubmit, 
  onCancel, 
  isLoading 
}: GradeLevelFormProps) {
  const form = useForm<{ name: string; description?: string }>({
    resolver: zodResolver(gradeLevelSchema),
    defaultValues: {
      name: gradeLevel?.name || '',
      description: gradeLevel?.description || '',
    },
  });

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {gradeLevel ? 'Edit Grade Level' : 'Create New Grade Level'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade Level Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., LVL1, Senior, Manager" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Optional description for this grade level..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : gradeLevel ? 'Update Grade Level' : 'Create Grade Level'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}