import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

// Define a Schema for input validation
const userSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(30, 'Username must be less than 30 characters'),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have at least 8 characters'),
  })

export async function POST(req: Request){
    try {
        const body = await req.json();
        const { email, username, password } = userSchema.parse(body)
        // Check if email exists
        const existingUserEmail = await db.user.findUnique({
            where: { email: email }
        })
        if(existingUserEmail){
            return NextResponse.json({ user: null, message: "User with this email already exists"}, { status: 409 })
        }
        // Check if username exists
        const existingUserName = await db.user.findUnique({
            where: { username: username }
        })
        if(existingUserName){
            return NextResponse.json({ user: null, message: "User with this username already exists"}, { status: 409 })
        }
        const hashedPassword = await hash(password, 10)
        const newUser = await db.user.create({
            data: {
                username, 
                email, 
                password: hashedPassword,
            }
        })
        const { password: newUserPassword, ...rest} = newUser;

        return NextResponse.json({ user: rest, message: "USer created Successfully" }, { status: 201 })
    } catch (error) {
        NextResponse.json({ message: "Ope! Something went wrong" }, { status: 500 })
    }
}