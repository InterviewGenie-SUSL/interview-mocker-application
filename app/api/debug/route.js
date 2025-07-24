import { NextResponse } from "next/server";
import { db } from "@/utils/db";

export async function GET(req) {
    try {
        // Test database connection
        console.log("Testing database connection...");

        // Simple query to test connection
        const result = await db.execute('SELECT 1 as test');
        console.log("Database connection test result:", result);

        return NextResponse.json({
            success: true,
            message: "Database connection successful",
            databaseUrl: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL ? 'Configured' : 'Not configured',
            testResult: result
        });
    } catch (e) {
        console.error("Database connection error:", e);
        return NextResponse.json({
            error: "Database connection failed",
            details: e.message,
            databaseUrl: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL ? 'Configured' : 'Not configured'
        }, { status: 500 });
    }
}
