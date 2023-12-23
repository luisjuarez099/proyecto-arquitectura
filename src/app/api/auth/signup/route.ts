import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; //importar la libreria de encriptacion
import User from "@/models/user"; //importar el modelo de usuario que es la conexion a la base de datos

export async function POST(request: Request) {
  //aqui recibimos los datos desde el formulario
  const { username, email, password } = await request.json(); //destructuring
  //validacion del password
  if (password.length < 8 || !password) {
    return NextResponse.json(
      {
        message: "El password debe tener al menos 8 caracteres",
      },
      {
        status: 409, //return a status code
      }
    );
  }

  //validacion del email y de username
  try {
    const emailFound = await User.findOne({ email });
    if (emailFound) {
      return NextResponse.json(
        {
          message: "El email ya esta en uso",
        },
        {
          status: 409,
        }
      );
    }
    //validacion del username
    const usernameFound = await User.findOne({ username });
    if (usernameFound) {
      return NextResponse.json(
        {
          message: "El username ya esta en uso",
        },
        {
          status: 409,
        }
      );
    }

    //encriptamos el password
    const hasedPassword = await bcrypt.hash(password, 10);
    //creacion del usuario
    const user = new User({
      username,
      email,
      password: hasedPassword,
    });
    const userSave = await user.save(); //guardar el usuario en la base de datos
    console.log(username, email, password);
    console.log(userSave); //guardar el usuario en la base de datos
    return NextResponse.json({
      _id: userSave._id,
      username: userSave.username,
      email: userSave.email,
      message: "Usuario creado exitosamente",
    },
    {
      status: 201,
    }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: "Error al crear el usuario. Por favor intente de nuevo.",
        },
        {
          status: 400,
        }
      );
    };
  };
};
