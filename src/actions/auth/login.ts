'use server';
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
 /*    await sleep(1000) */
    await signIn('credentials', {
      redirect: false,
      ...Object.fromEntries(formData),
    });
    return "success";

  } catch (error) {
    console.log(error)
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}