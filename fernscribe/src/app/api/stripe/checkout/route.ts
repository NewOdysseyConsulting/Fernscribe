import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20' })

export async function POST(req: NextRequest) {
  const { priceId = process.env.STRIPE_PRICE_PRO } = await req.json().catch(() => ({}))
  const origin = req.headers.get('origin') || 'http://localhost:3000'
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/?success=true`,
    cancel_url: `${origin}/?canceled=true`,
  })
  return NextResponse.json({ url: session.url })
}