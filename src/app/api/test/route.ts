import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const sessions = await prisma.session.findMany({
            take: 5,
        });

        return NextResponse.json({
            success: true,
            message: 'Prisma connection successful',
            count: sessions.length,
            data: sessions,
        });
    } catch (error: any) {
        console.error('Database test failed:', error.message);

        return NextResponse.json(
            {
                success: false,
                message: 'Prisma connection failed',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}