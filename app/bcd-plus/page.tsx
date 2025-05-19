import Image from "next/image"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export default function BCDPlus() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="flex space-x-2 text-xs">
              <span className="text-muted-foreground">Home</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground">Level 01</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground">Level 02</span>
              <span className="bg-primary text-white px-2 py-0.5 rounded text-xs">Premium</span>
            </div>
            <h1 className="text-2xl font-bold">This is BCD+</h1>
            <p className="text-sm text-muted-foreground">
              Elevate your network
              <br />
              with premium benefits
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">Learn More</Button>
          </div>
          <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center relative">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="BCD+ Hero Image"
              width={400}
              height={300}
              className="rounded-md"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-yellow-100 p-3 rounded-md">
              <ul className="text-xs text-yellow-800 space-y-1">
                <li>• Premium access</li>
                <li>• Exclusive events</li>
                <li>• Priority networking</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-2">BCD+ Benefits</h2>
        <p className="text-sm text-muted-foreground mb-6">Exclusive features for our members</p>

        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 border rounded-lg">
            <div className="font-medium">Benefit 1</div>
            <div className="text-sm text-muted-foreground flex-1">Description</div>
          </div>

          <div className="flex items-center space-x-4 p-4 border rounded-lg">
            <div className="font-medium">Benefit 2</div>
            <div className="text-sm text-muted-foreground flex-1">Description</div>
          </div>

          <div className="flex items-center space-x-4 p-4 border rounded-lg">
            <div className="font-medium">Benefit 3</div>
            <div className="text-sm text-muted-foreground flex-1">Description</div>
          </div>

          <div className="flex items-center space-x-4 p-4 border rounded-lg">
            <div className="font-medium">Benefit 4</div>
            <div className="text-sm text-muted-foreground flex-1">Description</div>
          </div>
        </div>
      </section>

      {/* New Webapp Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-2">Die neue Webapp</h2>
        <p className="text-sm text-muted-foreground mb-6">Jetzt mit allen modernen Features für dein Team</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center relative">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Webapp Preview"
              width={400}
              height={300}
              className="rounded-md"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-yellow-100 p-3 rounded-md">
              <ul className="text-xs text-yellow-800 space-y-1">
                <li>• Modern UI</li>
                <li>• Fast performance</li>
                <li>• Mobile friendly</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold">CTA</h2>
        </div>
      </section>

      {/* Upcoming Fast Track Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-2">Upcoming Fast Track</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-lg p-6">
            <div className="flex justify-center mb-4">
              <RefreshCw className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-sm font-medium mb-2">
              Big company announcement or
              <br />
              startup accelerator training time or
              <br />
              learn more
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 w-full mt-4">Register</Button>
            <p className="text-xs text-muted-foreground mt-2">Organized by BCD company</p>
          </div>
        </div>
      </section>

      {/* Pricing/Memberships Section */}
      <section className="container mx-auto px-4 py-8 mb-12">
        <h2 className="text-xl font-bold mb-2">Pricing/Memberships mit CTA</h2>
        <p className="text-sm text-muted-foreground mb-6">Tbd ob mit oder ohne Pricing</p>

        <div className="flex items-start space-x-4">
          <div>
            <p className="font-medium mb-2">BCD / BCD+ / PRO/EQ / Hamptons / Vistage</p>
          </div>
          <div className="bg-yellow-100 p-3 rounded-md">
            <ul className="text-xs text-yellow-800 space-y-1">
              <li>• Compare plans</li>
              <li>• See all features</li>
              <li>• Choose best option</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-100 rounded-lg p-6 mt-6 flex items-center justify-center">
          <p className="text-center text-muted-foreground">Pricing Table</p>
        </div>
      </section>
    </main>
  )
}
