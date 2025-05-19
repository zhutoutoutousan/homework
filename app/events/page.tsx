import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Events() {
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
              <span className="bg-primary text-white px-2 py-0.5 rounded text-xs">Events</span>
            </div>
            <h1 className="text-2xl font-bold">Unsere #BCD Events</h1>
            <p className="text-sm text-muted-foreground">
              Bringing together
              <br />
              the best in business
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">View All</Button>
          </div>
          <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Events Hero Image"
              width={400}
              height={300}
              className="rounded-md"
            />
          </div>
        </div>
      </section>

      {/* Forum Sessions Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-2">Forum Sessions</h2>
        <p className="text-sm text-muted-foreground mb-6">Join us for our facilitated small group sessions</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="text-sm font-medium">Date</div>
              <div className="text-sm text-muted-foreground">Description</div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Register</Button>
            <Button variant="outline">Request Information</Button>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=200&width=300"
              alt="Forum Sessions"
              width={300}
              height={200}
              className="rounded-md"
            />
          </div>
        </div>
      </section>

      {/* Stammtische Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-2">Stammtische</h2>
        <p className="text-sm text-muted-foreground mb-6">Regular meetings for members to network and share ideas</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <Card>
            <CardContent className="p-0">
              <div className="bg-gray-200 aspect-video flex items-center justify-center">
                <Image src="/placeholder.svg?height=150&width=250" alt="Berlin" width={250} height={150} />
              </div>
              <div className="p-4">
                <h3 className="font-medium">Berlin</h3>
                <p className="text-xs text-muted-foreground">Monthly meetup</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <div className="bg-gray-200 aspect-video flex items-center justify-center">
                <Image src="/placeholder.svg?height=150&width=250" alt="Hamburg" width={250} height={150} />
              </div>
              <div className="p-4">
                <h3 className="font-medium">Hamburg</h3>
                <p className="text-xs text-muted-foreground">Monthly meetup</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <div className="bg-gray-200 aspect-video flex items-center justify-center">
                <Image src="/placeholder.svg?height=150&width=250" alt="Berlin" width={250} height={150} />
              </div>
              <div className="p-4">
                <h3 className="font-medium">Berlin</h3>
                <p className="text-xs text-muted-foreground">Special event</p>
              </div>
            </CardContent>
          </Card>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-yellow-100 p-3 rounded-md">
            <ul className="text-xs text-yellow-800 space-y-1">
              <li>• Regular events</li>
              <li>• Networking</li>
              <li>• Knowledge sharing</li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="bg-gray-200 aspect-video flex items-center justify-center">
                <Image src="/placeholder.svg?height=150&width=250" alt="München" width={250} height={150} />
              </div>
              <div className="p-4">
                <h3 className="font-medium">München</h3>
                <p className="text-xs text-muted-foreground">Quarterly meetup</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <div className="bg-gray-200 aspect-video flex items-center justify-center">
                <Image src="/placeholder.svg?height=150&width=250" alt="Leipzig" width={250} height={150} />
              </div>
              <div className="p-4">
                <h3 className="font-medium">Leipzig</h3>
                <p className="text-xs text-muted-foreground">Quarterly meetup</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end mt-6 space-x-4">
          <Button className="bg-blue-600 hover:bg-blue-700">Register</Button>
          <Button variant="outline">Request Information</Button>
        </div>
      </section>

      {/* Member Events Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-2">Member Events</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="text-sm font-medium">Upcoming events</div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-yellow-100 p-3 rounded-md absolute right-0 top-0">
              <ul className="text-xs text-yellow-800 space-y-1">
                <li>• Member-only</li>
                <li>• Exclusive content</li>
                <li>• Special guests</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fast Track Retreat Section */}
      <section className="container mx-auto px-4 py-8 mb-12">
        <h2 className="text-xl font-bold mb-2">Fast Track Retreat</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative">
            <div className="bg-yellow-100 p-3 rounded-md absolute right-0 top-0">
              <ul className="text-xs text-yellow-800 space-y-1">
                <li>• Annual event</li>
                <li>• Intensive networking</li>
                <li>• Business growth</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center">
            <p className="text-center text-muted-foreground">Event Details</p>
          </div>
        </div>
      </section>
    </main>
  )
}
