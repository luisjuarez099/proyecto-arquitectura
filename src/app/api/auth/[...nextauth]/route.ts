import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/user"; //importamos el modelo de usuario
const handler = NextAuth({
  //como vamos a quere que se autentique el usuario/
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.

      //que esperamos recibir del usuario
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jjonson@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      /**
       * credentials es lo que vamos a recibir del usuario
       * req es la peticion que se hace al servidor
       */
      async authorize(credentials, req) {
        // console.log(credentials);
        //verificar si el usuario existe en el email
        const userFound = await User.findOne({
          email: credentials?.email,
        }).select("+password");
        //si no existe
        if (!userFound) throw new Error("Error en el email");
        console.log(userFound);

        //verificamos si la contraseña es correcta
        const passFound = await bcrypt.compare(
          credentials!.password,
          userFound.password
        );
        //si la contraseña no es correcta
        if (!passFound)
          throw new Error("Error en password");

        return userFound;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: "/login", //aqui se va a redireccionar cuando este logueado
    signOut: "/login", ///aqui se va a redireccionar cuando no este logueado
  },
});

export { handler as GET, handler as POST };
