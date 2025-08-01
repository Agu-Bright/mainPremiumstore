import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@utils/connectDB";
import bcrypt from "bcryptjs";
import User2 from "@models/user2";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        try {
          // Properly call connectDB function
          await connectDB();

          // Add timeout protection and better error handling
          const result = await User2.findOne({
            email: credentials.email,
          })
            .maxTimeMS(10000) // 10 second timeout
            .lean(); // Use lean() for better performance

          if (!result) {
            throw new Error("Invalid Credentials");
          }

          // Check if password is correct
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            result.password
          );

          if (!isPasswordCorrect) {
            console.log("Invalid credentials for:", credentials.email);
            throw new Error("Invalid Email or Password");
          }

          // Return user object with string ID
          return {
            id: result._id.toString(),
            email: result.email,
            username: result.username,
            role: result.role,
            name: result.name || result.username,
            phone: result.phone || null,
          };
        } catch (error) {
          console.error("Auth error:", error);
          if (error.message.includes("timeout")) {
            throw new Error("Database connection timeout. Please try again.");
          }
          throw error;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
        token.phone = user.phone;
      }
      return token;
    },

    async session({ session, token }) {
      try {
        // Only fetch user data if we don't have it in token
        if (!token.role || !token.username) {
          await connectDB();

          const sessionUser = await User2.findById(token.id)
            .select("_id role username name phone email") // Only select needed fields
            .maxTimeMS(10000) // 10 second timeout
            .lean(); // Use lean for better performance

          if (sessionUser) {
            session.user.id = sessionUser._id.toString();
            session.user.role = sessionUser.role;
            session.user.username = sessionUser.username;
            session.user.name = sessionUser.name || sessionUser.username;
            session.user.phone = sessionUser.phone || null;
          }
        } else {
          // Use data from token (more efficient)
          session.user.id = token.id;
          session.user.role = token.role;
          session.user.username = token.username;
          session.user.phone = token.phone;
        }

        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        // Return session even if DB query fails
        session.user.id = token.id;
        return session;
      }
    },

    async signIn({ profile, user, account }) {
      try {
        // Handle credential sign in (when profile is undefined)
        if (!profile) {
          return true;
        }

        // Handle OAuth sign in (Google, etc.)
        await connectDB();

        // Check if user exists
        const userExists = await User2.findOne({
          email: profile.email,
        })
          .maxTimeMS(10000)
          .lean();

        if (!userExists) {
          // Create new user for OAuth sign in
          const newUser = await User2.create({
            email: profile.email,
            name: profile.name,
            username:
              profile.name?.replace(/\s+/g, "").toLowerCase() ||
              profile.email.split("@")[0],
            // Don't set password for OAuth users
            authProvider: account.provider,
            image: profile.picture || profile.image,
          });

          console.log("New OAuth user created:", newUser.email);
        }

        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        // Allow sign in to continue even if there's a DB error
        return true;
      }
    },
  },

  // Add session configuration
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Add JWT configuration
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Add pages configuration
  pages: {
    signIn: "/user/login",
    error: "/user/login", // Redirect to login on error
  },

  // Add debug logging in development
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
