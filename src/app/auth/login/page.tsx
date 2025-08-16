import { providerMap, signIn } from "@/auth";
import { titleFont } from "@/config/fonts";
import { AuthError } from "next-auth";
import Link from "next/link";
import { LoginForm } from "./ui/login-form";

interface Props {
  searchParams: Promise<{ callbackUrl: string | undefined }>;
}
export default async function LoginPage({ searchParams }: Props) {
  const { callbackUrl } = await searchParams;
  return (
    <main className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresar</h1>

      <div className="flex flex-col">
        <LoginForm />
       {/*  <form
          className="flex flex-col"
          action={async (formData) => {
            "use server";
            console.log("formData", formData);
            try {
              await signIn("credentials", formData);
            } catch (error) {
              if (error instanceof AuthError) {
                console.log(error);
                return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
              }
              throw error;
            }
          }}
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

          <button type="submit" className="btn-primary">
            Ingresar
          </button>
        </form> */}

        {/* divisor l ine */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/new-account" className="btn-secondary text-center">
          Crear una nueva cuenta
        </Link>

        {Object.values(providerMap).map((provider) => (
          <form
            className="flex flex-col items-center mt-3"
            key={provider.id}
            action={async () => {
              "use server";
              try {
                await signIn(provider.id, {
                  redirectTo: callbackUrl ?? "",
                });
              } catch (error) {
                // Signin can fail for a number of reasons, such as the user
                // not existing, or the user not having the correct role.
                // In some cases, you may want to redirect to a custom error
                if (error instanceof AuthError) {
                  console.log(error);
                  return;
                }

                // Otherwise if a redirects happens Next.js can handle it
                // so you can just re-thrown the error and let Next.js handle it.
                // Docs:
                // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                throw error;
              }
            }}
          >
            {provider.id === "google" ? (
              <button className="gsi-material-button">
                <div className="gsi-material-button-state"></div>
                <div className="gsi-material-button-content-wrapper">
                  <div className="gsi-material-button-icon">
                    <svg
                      display="block"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      style={{ display: "block" }}
                    >
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      ></path>
                      <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      ></path>
                      <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                      ></path>
                      <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      ></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                  </div>
                  <span className="gsi-material-button-contents">
                    Sign in with Google
                  </span>
                  <span style={{ display: "none" }}>Sign in with Google</span>
                </div>
              </button>
            ) : (
              <button type="submit" className="mx-auto w-full">
                <span>Sign in with {provider.name}</span>
              </button>
            )}
          </form>
        ))}
      </div>
    </main>
  );
}
