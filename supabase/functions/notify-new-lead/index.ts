import { serve } from "std/http/server.ts"

serve(async (req: Request) => {
  try {
    const payload = await req.json()
    const record = payload.record

    console.log("Received webhook payload for:", record?.email)

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'TRIA Solutions <onboarding@resend.dev>',
        to: 'triasolutions14@gmail.com',
        subject: `New lead: ${record.name} (${record.project_type})`,
        html: `
          <p><strong>Name:</strong> ${record.name}</p>
          <p><strong>Email:</strong> ${record.email}</p>
          <p><strong>Phone:</strong> ${record.phone ?? 'N/A'}</p>
          <p><strong>Project Type:</strong> ${record.project_type}</p>
          <p><strong>Budget:</strong> ${record.budget}</p>
          <p><strong>Message:</strong> ${record.message}</p>
        `,
      }),
    })

    const resendResult = await res.json()

    if (!res.ok) {
      console.error("Resend API error:", resendResult)
    } else {
      console.log("Email sent successfully:", resendResult)
    }

    return new Response(JSON.stringify({ ok: res.ok, resend: resendResult }), {
      status: res.ok ? 200 : 500,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error("Function error:", err)
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})