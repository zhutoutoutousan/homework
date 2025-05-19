"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-6 lg:space-x-8">
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Home
      </Link>
      <Link
        href="/bcd-plus"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/bcd-plus" ? "text-primary" : "text-muted-foreground",
        )}
      >
        BCD+
      </Link>
      <Link
        href="/events"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/events" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Events
      </Link>
      <Link
        href="/community"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/community" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Community
      </Link>
      <Link
        href="/whatsapp"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/whatsapp" ? "text-primary" : "text-muted-foreground",
        )}
      >
        WhatsApp
      </Link>
    </nav>
  )
}
