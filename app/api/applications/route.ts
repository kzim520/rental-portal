import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Basic validation
    if (!data.propertyName || !data.name || !data.email) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create or connect user
    const user = await db.user.upsert({
      where: { email: data.email },
      update: { name: data.name },
      create: { email: data.email, name: data.name },
    });

    // Create application
    const application = await db.application.create({
      data: {
        propertyName: data.propertyName,
        dataJson: data, // store full form data as JSON
        userId: user.id,
      },
    });

    return Response.json({ ok: true, applicationId: application.id });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}