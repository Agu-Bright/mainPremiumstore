import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@utils/connectDB";
import User from "@models/user";
import bcrypt from "bcryptjs";
// import connectDb from "@utils/connectDb";
// import User from "@models/user";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        await connectDB;
        //check user existance
        const result = await User.findOne({
          email: credentials.email,
        });
        if (!result) {
          throw new Error("Invalid Credentials");
        }
        //check if password is correct or not
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          result.password
        );
        console.log("invalid credentials");
        if (!isPasswordCorrect) {
          throw new Error("Invalid Email or Password", 401);
        }
        return result;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      //get user data and set it to the session storage
      const sessionUser = await User.findById(token.id);
      session.user.id = sessionUser._id.toString();
      session.user.role = sessionUser.role;
      session.user.username = sessionUser?.username;
      return session;
    },

    async signIn({ profile }) {
      try {
        if (profile === undefined) {
          return true;
        }
        //this is a setverless function
        await connectDB;

        //check if the use exists
        const userExists = await User.findOne({
          email: profile.email,
        });
        if (!userExists) {
          //create a new user and save it to the database
          await User.create({
            username: profile.username,
            password: profile.password,
            confirmPassword: profile.confirmPassword,
          });
          //send welcome mail
          // await sendMail("welcome", sessionUser.fullName, profile.email);
        }
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
