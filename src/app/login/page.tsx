"use client";
import { FormEvent } from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
function login() {

  const router = useRouter();
  const [error, setError] = useState("");


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // evita que se recargue la pagina
    //extraer los datos del formulario actual
    const data = new FormData(e.currentTarget);
    //enviar los datos al servidor donde es validado la informacion que le pasamos
    const res = await signIn("credentials", {
      //le enviamos la informacion al autenticador de next-auth que hicimos en credentials
      email: data.get("email"), //el valor se obtiene del formulario
      password: data.get("password"),
      redirect: false,
    });

    if (res?.error) {
      return setError(res.error);
    }
    console.log(res);
    //si la respuesta fue coreecta
    if (res?.ok) {
      //redireccionamos a la pagina de inicio
      return router.push("/dashbord");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            {error}
          </div>
        )}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Ingresar
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email ******************************************** */}
          <div>
            <label
              typeof="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                name="email"
                type="email"
                required
                className=" pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Password*********************************************/}
          <div>
            <div className="flex items-center justify-between">
              <label
                typeof="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                name="password"
                type="password"
                required
                className=" pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Boton de envio de formulario **************************** */}
          <div>
            <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default login;