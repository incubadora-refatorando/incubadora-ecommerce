'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Card } from '@/shared/components/ui/card';
import { useAuthStore } from '@/features/auth/store';
import { registerSchema, RegisterFormData } from '@/features/auth/schemas';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.email, data.password, data.name);
      toast.success('Account created successfully!');
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-light px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-dark mb-2">Create Account</h1>
          <p className="text-gray-medium">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-dark mb-1">
              Name (Optional)
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              {...register('name')}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-dark mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-error mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-dark mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-error mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-medium">Already have an account? </span>
          <Link href="/login" className="text-primary hover:underline font-semibold">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
}
