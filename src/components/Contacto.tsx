"use client";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import emailI from "../../public/mail.png";
import phoneI from "../../public/phone.png";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { set } from "mongoose";

function Contacto() {
  const [errors, setErrors] = useState(""); // Estado para los errores
  const [cont, setCont] = useState<any>(); // Estado para Telefono
  const [contM, setContM] = useState<any>(); // Estado para Mensaje
  const [contN, setContN] = useState<any>(); // Estado para Nombre
  const router = useRouter(); // Hook de Next.js para redireccionar
  const [Nombre, setNombre] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Telefono, setTelefono] = useState("");
  const [Mensaje, setMensaje] = useState("");

  //creamos este estado para que se actualice cantidad de caracteres
  useEffect(() => {
    let valNum = Telefono.length;
    let valM = Mensaje.length;
    let valN = Nombre.length;
    setCont(valNum);
    setContM(valM);
    setContN(valN);
  }, [Telefono.length, Mensaje.length, Nombre.length]);

  const handleSubmit = async (event: any) => {
    try {
      event.preventDefault(); // Evita que se recargue la pagina
      console.log(Nombre + " " + Correo + " " + Telefono + " " + Mensaje);
      const resData = await axios.post("/api/contacto", {
        Nombre: Nombre,
        Correo: Correo,
        Telefono: Telefono,
        Mensaje: Mensaje,
      });
      if (resData.request.status == 200) {
        setErrors(resData.data.message);
        /// Limpiamos los campos
        setNombre("");
        setCorreo("");
        setTelefono("");
        setMensaje("");
        router.refresh(); // Refrescamos la pagina
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrors(error.response?.data.message);
      }
    }
    //router.push("/"); // Redireccionamos a la pagina de inicio
  };
  return (
    <div>
      <main className="py-14">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
            <div className="max-w-lg space-y-3">
              <h3 className="text-indigo-600 font-semibold">Contact</h3>
              <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                Haz Contacto, Haz Amigos
              </p>
              <h6>Estamos Aquí para Ti</h6>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Beatae, voluptas corrupti! At, laboriosam nulla quos facere
                accusamus voluptatem inventore ducimus itaque excepturi esse
                adipisci suscipit commodi repellendus earum a mollitia.
              </p>
              <div>
                <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-6 items-center">
                  <li className="flex items-center gap-x-3">
                    <div className="flex-none text-gray-400">
                      <Image src={emailI} alt="email" height={30} width={30} />
                    </div>
                    <p> Support@example.com </p>
                  </li>
                  <li className="flex items-center gap-x-3">
                    <div className="flex-none text-gray-400">
                      <Image
                        src={phoneI}
                        alt="telefono"
                        height={30}
                        width={30}
                      />
                    </div>
                    <p> 000-000-000-0000 </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Aqui comienza el envio de informacion para el contacto con el cliente */}
            <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md">
              {errors && (
                <div
                  className="bg-amber-100 border border-amber-200 text-amber-800 px-4 py-3 rounded relative"
                  role="alert"
                >
                  {errors}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" method="POST">
                {/* Nombre de la persona */}
                <div>
                  <label htmlFor="Nombre" className="font-medium">
                    Full name
                  </label>
                  <input
                    onChange={(e) => setNombre(e.target.value)} // Actualiza el estado de la variable fullName
                    value={Nombre} // Asigna el valor de la variable fullName
                    type="text"
                    name="Nombre"
                    pattern="^[^0-9]*$"
                    maxLength={25}
                    placeholder="Nombre(s) o Apellido(s)"
                    required
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                  <p className="text-gray-500 text-xs">{contN}/25 caracteres</p>
                </div>
                {/* Email */}
                <div>
                  <label htmlFor="Correo" className="font-medium">
                    Email
                  </label>
                  <input
                    onChange={(e) => setCorreo(e.target.value)}
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    value={Correo.toLowerCase()}
                    type="email"
                    name="Correo"
                    placeholder="example@gmail.com"
                    required
                  />
                </div>
                {/* Telefono */}
                <div>
                  <label htmlFor="Telefono" className="font-medium">
                    Telefono
                  </label>
                  <input
                    onChange={(e) => setTelefono(e.target.value)}
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    value={Telefono}
                    type="tel"
                    maxLength={10}
                    pattern="^[0-9]*$"
                    name="Telefono"
                    placeholder="0123456789"
                    required
                  />
                  <p className="text-gray-500 text-xs">{cont}/10 caracteres</p>
                </div>
                {/* Motivo del Mensaje */}
                <div>
                  <label htmlFor="Mensaje" className="font-medium">
                    Mensaje
                  </label>
                  <textarea
                    onChange={(e) => setMensaje(e.target.value)}
                    className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                    value={Mensaje}
                    maxLength={100}
                    placeholder="Escribe tu mensaje aqui..."
                    name="Mensaje"
                    required
                  ></textarea>
                  <p className="text-gray-500 text-xs">{contM}/100 caracteres</p>
                </div>
                {/* Boton de enviar */}
                <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Contacto;
