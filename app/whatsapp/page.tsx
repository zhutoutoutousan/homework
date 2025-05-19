import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function WhatsApp() {
  return (
    <main className="min-h-screen">
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex space-x-2 text-xs">
              <span className="text-muted-foreground">Level 01</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground">Level 02</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground">Level 03</span>
            </div>
            <h1 className="text-2xl font-bold">BCD WhatsApp</h1>
            <p className="text-sm text-muted-foreground">
              Connect with our BCD community via WhatsApp
              <br />
              for quick updates, networking, and daily
              <br />
              business insights. Join our active groups!
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">Connect via WhatsApp</Button>
          </div>
          <div className="flex justify-center">
            <Image
              src="/placeholder.svg?height=400&width=300"
              alt="WhatsApp on Phone"
              width={300}
              height={400}
              className="rounded-md"
            />
          </div>
        </div>

        <div className="mt-12 bg-yellow-100 p-4 rounded-md max-w-md mx-auto">
          <div className="text-yellow-800 text-sm">
            <p className="font-medium mb-2">Benefits of our WhatsApp groups:</p>
            <ul className="space-y-2">
              <li>• Instant networking opportunities</li>
              <li>• Daily business insights and tips</li>
              <li>• Quick access to community resources</li>
              <li>• Real-time event updates and reminders</li>
              <li>• Direct communication with community members</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">(Content)</p>
        </div>
      </section>
    </main>
  )
}
