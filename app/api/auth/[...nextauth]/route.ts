import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.username || !credentials?.password) {
                        console.log("Missing credentials");
                        return null;
                    }

                    console.log("Checking database for user:", credentials.username);

                    // Kullanıcıyı veritabanında ara
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.username
                        },
                        select: {
                            id: true,
                            email: true,
                            name: true,
                            hashedPassword: true
                        }
                    });

                    console.log("Database lookup result:", {
                        found: !!user,
                        username: credentials.username,
                        userDetails: user ? {
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            hasPassword: !!user.hashedPassword
                        } : null
                    });

                    if (!user || !user.hashedPassword) {
                        console.log("User not found in database or missing password");
                        return null;
                    }

                    // Şifreyi kontrol et
                    const isPasswordValid = await bcrypt.compare(
                        credentials.password,
                        user.hashedPassword
                    );

                    console.log("Password validation:", {
                        provided: credentials.password,
                        isValid: isPasswordValid
                    });

                    if (!isPasswordValid) {
                        console.log("Invalid password");
                        return null;
                    }

                    console.log("Login successful for user:", user.email);
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    };
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: "/admin/login",
    },
    session: {
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };