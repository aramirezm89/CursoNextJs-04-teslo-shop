'use client'

import { authenticate } from '@/actions'
import { signIn } from 'next-auth/react'
import { useActionState } from 'react'


export const LoginForm = () => {

/*     const credentialsAction = (formData: FormData) => {
        signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
        })
      }
 */
      const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
      );
     
  return (
    <form
           className="flex flex-col"
           action={formAction}
         >
           <label htmlFor="email">Correo electrónico</label>
           <input
             name="email"
             className="px-5 py-2 border bg-gray-200 rounded mb-5"
             type="email"
           />
 
           <label htmlFor="password">Contraseña</label>
           <input
             name="password"
             className="px-5 py-2 border bg-gray-200 rounded mb-5"
             type="password"
           />
 
           <button disabled={isPending} type="submit" className="btn-primary">
           {
            isPending ? "Ingresando..." : "Ingresar"
           }
           </button>
         </form>
  )
}
