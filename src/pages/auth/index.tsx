import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@radix-ui/themes';
import {
  IconBook2,
  IconBrandGoogle,
  IconLoader,
  IconMail,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useSearchParams } from 'react-router-dom';

import Divider from '@/components/Divider';
import OtpInput from '@/components/OtpInput';
import useAuth from '@/hooks/useAuth';
import useToast from '@/hooks/useToast';
import { cn } from '@/lib/cn';
import supabase from '@/lib/supabase';
import { LoginSchema, loginSchema } from '@/schemas/auth';

const LoginPage = () => {
  const { toast } = useToast();
  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const redirect_to = searchParams.get('redirect_to') || '/';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [otp, setOtp] = useState('');

  const hasErrors = Object.keys(errors).length > 0;

  const onEmailSubmit = async (values: LoginSchema) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: values.email,
      });
      if (error) throw error;
      setIsOtpStep(true);
    } catch (error: any) {
      toast({
        title: 'Failed to send OTP',
        description: error.message,
      });
    }
    setIsSubmitting(false);
  };

  const onVerifyOtp = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email: getValues('email'),
        type: 'email',
        token: otp,
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: 'Failed to verify OTP',
        description: error.message,
      });
    }
    setIsSubmitting(false);
  };

  const onGoogleSignIn = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.href,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: 'Failed to sign in with Google',
        description: error.message,
      });
    }
    setIsSubmitting(false);
  };

  if (user) return <Navigate to={redirect_to} replace={true} />;

  return (
    <main className="fixed inset-0 flex items-center justify-center">
      <div
        className={cn(
          'absolute flex flex-col max-w-sm w-full items-center transition p-6',
          isOtpStep && '-translate-x-full opacity-0',
        )}
      >
        <IconBook2 size={48} />
        <h2 className="text-4xl font-semibold text-blue9">readme</h2>
        <h3 className="text-2xl mt-2">login to continue</h3>
        <form className="mt-12 w-full" onSubmit={handleSubmit(onEmailSubmit)}>
          <label htmlFor="email" className="block sr-only">
            Email
          </label>
          <TextField.Root
            size={'3'}
            placeholder="email@example.com"
            className={cn(
              'rounded-xl',
              errors.email && 'outline-red-500 ring-red-500 ring-1',
            )}
            autoComplete="email"
            disabled={isSubmitting}
            {...register('email')}
          >
            <TextField.Slot>
              <IconMail />
            </TextField.Slot>
          </TextField.Root>
          {errors.email && (
            <p className="text-sm font-light text-red-500 mt-1">
              {errors.email?.message}
            </p>
          )}
          <Button
            type="submit"
            className="mt-4 w-full rounded-xl cursor-pointer"
            size={'3'}
            disabled={hasErrors || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <IconLoader className="animate-spin" />
                Sending OTP
              </>
            ) : (
              'Continue'
            )}
          </Button>
        </form>
        <Divider className="my-4 text-black/60">or</Divider>
        <div className="space-y-4 mt-4 w-full">
          <Button
            className="flex w-full rounded-xl cursor-pointer"
            size={'3'}
            variant="soft"
            color="jade"
            disabled={isSubmitting}
            onClick={onGoogleSignIn}
          >
            <IconBrandGoogle />
            Google
          </Button>
          {/* <Button
            className="flex w-full rounded-xl cursor-pointer"
            size={'3'}
            radius="large"
            variant="soft"
            disabled={isSubmitting}
          >
            <IconBrandFacebook />
            Facebook
          </Button> */}
        </div>
      </div>
      <div
        className={cn(
          'absolute w-full transition opacity-0 translate-x-full p-6 max-w-sm flex flex-col items-center',
          isOtpStep && 'opacity-100 translate-x-0',
        )}
      >
        <h2 className="text-4xl font-semibold text-blue9">otp</h2>
        <p className="mt-2 text-center">
          enter the otp sent to <strong>{getValues('email')}</strong>
        </p>
        <div className="mt-8">
          <OtpInput value={otp} onChange={setOtp} disabled={isSubmitting} />
          <Button
            className="mt-4 w-full rounded-xl cursor-pointer"
            size={'3'}
            onClick={onVerifyOtp}
            disabled={isSubmitting || otp.length !== 6}
          >
            {isSubmitting ? (
              <>
                <IconLoader className="animate-spin" />
                Verifying OTP
              </>
            ) : (
              'Verify OTP'
            )}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
