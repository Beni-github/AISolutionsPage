import { NextRequest, NextResponse } from "next/server";

// Web3Forms Access Key - Get yours free at https://web3forms.com/
// Replace 'YOUR_ACCESS_KEY_HERE' with your actual key
const ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, business, phone, email, service, message } = body;

    // Basic validation
    if (!name?.trim() || !phone?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: "Name, phone, and email are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // If using Web3Forms (set ACCESS_KEY above)
    if (ACCESS_KEY !== "YOUR_ACCESS_KEY_HERE") {
      const payload = {
        access_key: ACCESS_KEY,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        business: business?.trim() || "Not provided",
        service: service || "Not specified",
        message: `Service Interest: ${service || "Not specified"}\n\nMessage:\n${message || "No message provided"}\n\nFrom: ${name.trim()}\nBusiness: ${business?.trim() || "Not provided"}\nPhone: ${phone.trim()}\nEmail: ${email.trim()}`,
        from_name: "AI Solutions Website",
        subject: `New Lead: ${name.trim()} - ${service || "Website Inquiry"}`,
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        return NextResponse.json(
          { success: true, message: "Thank you! I'll be in touch within 2 hours." },
          { status: 200 }
        );
      } else {
        console.error("[Web3Forms Error]", result);
        // Fall through to console log
      }
    }

    // Fallback: Log to console if no API key configured
    console.log("[Contact Form Submission]", {
      name: name.trim(),
      business: business?.trim(),
      phone: phone.trim(),
      email: email.trim(),
      service: service || "Not specified",
      message: message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: "Thank you! I'll be in touch within 2 hours." },
      { status: 200 }
    );
  } catch (err) {
    console.error("[Contact API Error]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or contact directly." },
      { status: 500 }
    );
  }
}
