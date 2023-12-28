import { NextResponse } from "next/server";
import contacto from "@/models/contacto"; //importar el modelo de contacto

//metodo get para obtener todos los contactos
export async function GET() {
  try {
    const contactos = await contacto.find();

    return NextResponse.json({ contactos }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

//metodo post para crear un contacto
export async function POST(request: Request) {
  try {
    const { Nombre, Correo, Telefono, Mensaje } = await request.json(); //obtener  la peticion en formato json para poder usarlo
    if (Telefono.length !== 10) {
      return NextResponse.json(
        {
          message: "El numero de telefono debe tener 10 digitos",
        },
        {
          status: 409, //return a status code
        }
      );
    }
    if (Nombre.length < 3 || Nombre.length > 25) {
      return NextResponse.json(
        {
          message: "El nombre debe tener entre 5 y 25 caracteres",
        },
        {
          status: 409, //return a status code
        }
      );
    }
    if (Mensaje.length < 5 || Mensaje.length > 500) {
      return NextResponse.json(
        {
          message: "El mensaje debe tener entre 5 y 500 caracteres",
        },
        {
          status: 409, //return a status code
        }
      );
    }
    // console.log(Nombre, Correo, Telefono, Mensaje);
    //crear el contacto
    await contacto.create({ Nombre, Correo, Telefono, Mensaje });
    return NextResponse.json(
      { message: "Mensaje enviado con exito. " },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "Mensaje no enviado.",
        },
        {
          status: 400,
        }
      );
    }
  }
}
