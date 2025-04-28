
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
import { motion } from 'framer-motion';
import { Cloud, Loader2 } from 'lucide-react';
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

const staggerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const CloudAccountForm: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
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
      setIsSubmitting(true);
      
      // In a real implementation, this would send the data to your backend API
      console.log('Submitting account:', data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <motion.form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-8 max-w-2xl"
        variants={staggerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Account Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Production AWS" 
                    className="transition-all focus:ring-2 focus:ring-cloud-blue/30"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Cloud Provider</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full transition-all focus:ring-2 focus:ring-cloud-blue/30">
                      <SelectValue placeholder="Select a provider" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="AWS" className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-cloud-blue inline-block mr-2"></div>
                      Amazon Web Services (AWS)
                    </SelectItem>
                    <SelectItem value="Azure" className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-cloud-teal inline-block mr-2"></div>
                      Microsoft Azure
                    </SelectItem>
                    <SelectItem value="GCP" className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-cloud-purple inline-block mr-2"></div>
                      Google Cloud Platform (GCP)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="credentials"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Authentication Credentials</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Paste your cloud credentials JSON or connection string here" 
                    className="h-32 font-mono text-sm transition-all focus:ring-2 focus:ring-cloud-blue/30"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Description (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Add notes about this account" 
                    className="transition-all focus:ring-2 focus:ring-cloud-blue/30"
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="flex gap-4 pt-2"
        >
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-cloud-blue to-cloud-teal hover:opacity-90 transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connecting...
              </>
            ) : (
              <>
                <Cloud className="mr-2 h-4 w-4" /> Connect Account
              </>
            )}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/cloud-accounts')}
            className="border-gray-200 hover:bg-gray-50"
          >
            Cancel
          </Button>
        </motion.div>
      </motion.form>
    </Form>
  );
};
