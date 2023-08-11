import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function main() {
    try {
        await prisma.$connect()
    } catch (error: any) {
        return Error("Database Connection fail")
    }
}

export const GET = async (req: Request, res: NextResponse) => {
    await main()
    try {
        const posts = await prisma.post.findMany()
        return NextResponse.json({ message: "data fetching successfull", posts }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({ message: "error in fetching data", error }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}

export const POST = async (req: Request, res: NextResponse) => {
    try {
        const { title, description } = await req.json()
        await main()
        const post = await prisma.post.create({ data: { description, title } })

        return NextResponse.json({ message: "posted successfully", post }, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ message: "post failed", error }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}
