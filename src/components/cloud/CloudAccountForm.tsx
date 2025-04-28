
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Account name must be at least 3 characters' }),
  provider: z.string().min(1, { message: 'Please select a cloud provider' }),
  credentials: z.string().min(10, { message: 'Please enter valid credentials' }),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const CloudAccountForm: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      provider: '',
      credentials: '',
      description: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // In a real implementation, this would send the data to your backend API
      console.log('Submitting account:', data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Account added successfully",
        description: `${data.name} has been connected to your dashboard.`,
      });
      
      navigate('/cloud-accounts');
    } catch (error) {
      console.error('Error adding account:', error);
      toast({
        title: "Failed to add account",
        description: "There was an error connecting your cloud account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Name</FormLabel>
              <FormControl>
                <Input placeholder="Production AWS" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="provider"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cloud Provider</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a provider" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="AWS">Amazon Web Services (AWS)</SelectItem>
                  <SelectItem value="Azure">Microsoft Azure</SelectItem>
                  <SelectItem value="GCP">Google Cloud Platform (GCP)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="credentials"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Authentication Credentials</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Paste your cloud credentials JSON or connection string here" 
                  className="h-32 font-mono text-sm"
                  {...field} 
                />
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
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Add notes about this account" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex gap-4">
          <Button type="submit">Connect Account</Button>
          <Button type="button" variant="outline" onClick={() => navigate('/cloud-accounts')}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
