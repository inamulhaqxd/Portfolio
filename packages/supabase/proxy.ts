import { createServerClient } from '@supabase/ssr'
import type { NextRequest, NextResponse } from 'next/server'

export async function updateSession(request: NextRequest, response: NextResponse) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabase.auth.updateCookies(cookiesToSet)
        },
      },
    }
  )

  const { data } = await supabase.auth.getClaims()

  if (
    !data?.claims &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return { request, response: NextResponse.redirect(url) }
  }

  return { request, response }
}
