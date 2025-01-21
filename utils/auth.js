import connectDB from "@utils/connectDB";
import User from "@models/user";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
          accountName: credentials.accountName,
        });
        if (!result) {
          throw new Error("No User found with username");
        }
        //check if password is correct or not
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          result.password
        );
        if (!isPasswordCorrect) {
          throw new Error("Invalid Email or Password", 401);
        }

        return result;
      },
    }),
  ],

  callbacks: {
    async session({ session }) {
      //get user data and set it to the session storage
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser?._id.toString();
      session.user.role = sessionUser?.role;
      return session;
    },
    async signIn({ profile }) {
      try {
        // this is a setverless function
        await connectDB;

        // //check if the use exists
        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          //   //create a new user and save it to the database
          await User.create({
            email: profile.email,
            fullName: profile.name,
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        return false;
      }
    },
  },
};

export const getAuthSession = getServerSession(authOptions);
