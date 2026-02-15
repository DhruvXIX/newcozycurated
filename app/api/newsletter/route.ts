import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX; // e.g. "us21"

  if (!apiKey || !audienceId || !serverPrefix) {
    // If Mailchimp isn't configured yet, just pretend it succeeded
    return NextResponse.json({ success: true, message: "Newsletter not fully configured, but request received." });
  }

  const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `apikey ${apiKey}`,
    },
    body: JSON.stringify({
      email_address: email,
      status: "subscribed",
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter", details: errorData },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

