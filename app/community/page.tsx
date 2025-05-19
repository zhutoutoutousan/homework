import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function Community() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="text-sm breadcrumbs mb-6">
          <p>BCD Community (Members) / About / WHY / Historie</p>
        </div>
      </div>

      {/* BCD Community Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="flex space-x-2 text-xs">
              <span className="text-muted-foreground">Home</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground">Level 01</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground">Level 02</span>
              <span className="bg-primary text-white px-2 py-0.5 rounded text-xs">Community</span>
            </div>
            <h1 className="text-2xl font-bold">BCD Community</h1>
            <p className="text-sm text-muted-foreground">
              Bringing together
              <br />
              the best in business
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">Join Now</Button>
          </div>
          <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Community Hero Image"
              width={400}
              height={300}
              className="rounded-md"
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="flex flex-col items-center">
            <Image
              src="/placeholder.svg?height=100&width=100"
              alt="Community Gallery"
              width={100}
              height={100}
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/placeholder.svg?height=100&width=100"
              alt="Community Gallery"
              width={100}
              height={100}
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/placeholder.svg?height=100&width=100"
              alt="Community Gallery"
              width={100}
              height={100}
              className="rounded-md"
            />
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/placeholder.svg?height=100&width=100"
              alt="Community Gallery"
              width={100}
              height={100}
              className="rounded-md"
            />
          </div>
        </div>

        <div className="bg-yellow-100 p-3 rounded-md mt-4 inline-block">
          <ul className="text-xs text-yellow-800 space-y-1">
            <li>• Join our community</li>
            <li>• Connect with professionals</li>
            <li>• Grow your network</li>
          </ul>
        </div>
      </section>

      {/* Members Grid Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {Array.from({ length: 18 }).map((_, i) => (
            <Avatar key={i} className="h-16 w-16 mx-auto">
              <Image src="/placeholder.svg?height=64&width=64" alt={`Member ${i + 1}`} width={64} height={64} />
            </Avatar>
          ))}
        </div>

        <div className="text-center mt-6">
          <h2 className="text-xl font-bold">CTA</h2>
          <Button className="bg-blue-600 hover:bg-blue-700 mt-4">Join Now</Button>
        </div>
      </section>

      {/* Community Description */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-2">Von A wie Anfangsklasse bis Z wie Zugehörigkeitsgemeinschaft.</h2>
        <p className="text-sm text-muted-foreground mb-6">Join our exclusive community</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Angel Investing</h3>
              <p className="text-sm text-muted-foreground">Startup Funding</p>
              <p className="text-sm text-muted-foreground">2-10 deals</p>
              <p className="text-sm text-muted-foreground">Recommended ticket range</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Founders</h3>
              <p className="text-sm text-muted-foreground">Entrepreneurs</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Executives</h3>
              <p className="text-sm text-muted-foreground">Business leaders</p>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=200&width=300"
              alt="Community Types"
              width={300}
              height={200}
              className="rounded-md"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold">CTA</h2>
        </div>
      </section>

      {/* Upcoming Deals Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-6">Upcoming Deals</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-yellow-100 p-4 rounded-md">
            <p className="text-xs text-yellow-800">
              <strong>Ich biete euch hier</strong>
              <br />
              Zugang zu einem Netzwerk von Unternehmern
              <br />
              und Investoren.
              <br />
              <br />
              <strong>Ihr bekommt:</strong>
              <br />- Zugang zu Deal Flow
              <br />- Austausch mit anderen Investoren
              <br />- Gemeinsame Investments
              <br />- Lernen von den Besten
              <br />
              <br />
              <strong>Ich will:</strong>
              <br />- Euch helfen, bessere Investments zu machen
              <br />- Eine Community aufbauen
              <br />- Wissen teilen
              <br />
              <br />
              <strong>Mein Ziel:</strong>
              <br />
              Eine starke Community von Angel Investoren
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center">
              <div className="flex justify-center mb-4">
                <RefreshCw className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-sm font-medium mb-2">
                Big deal announcement, latest
                <br />
                startup opportunity
              </p>
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700 w-full">Join Now</Button>
            <p className="text-xs text-muted-foreground text-center">Organized by BCD Angel Deal</p>
          </div>
        </div>
      </section>

      {/* Past Deals Section */}
      <section className="container mx-auto px-4 py-8 mb-12">
        <h2 className="text-xl font-bold mb-2">Vergangene Deals</h2>
        <p className="text-sm text-muted-foreground mb-6">5 Startups</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-0">
              <div className="bg-gray-200 aspect-video flex items-center justify-center">
                <Image src="/placeholder.svg?height=150&width=250" alt="Deal 1" width={250} height={150} />
              </div>
              <div className="p-4">
                <h3 className="font-medium">Startup</h3>
                <p className="text-xs text-muted-foreground">Short description</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <div className="bg-gray-200 aspect-video flex items-center justify-center">
                <Image src="/placeholder.svg?height=150&width=250" alt="Deal 2" width={250} height={150} />
              </div>
              <div className="p-4">
                <h3 className="font-medium">Fintech</h3>
                <p className="text-xs text-muted-foreground">Short description</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <div className="bg-gray-200 aspect-video flex items-center justify-center">
                <Image src="/placeholder.svg?height=150&width=250" alt="Deal 3" width={250} height={150} />
              </div>
              <div className="p-4">
                <h3 className="font-medium">SaaS</h3>
                <p className="text-xs text-muted-foreground">Short description</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-4">
          <Button variant="link" className="text-xs">
            View more
          </Button>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-yellow-100 p-3 rounded-md inline-block mx-auto">
            <p className="text-xs text-yellow-800">More information</p>
          </div>
          <p className="text-blue-600 mt-4">
            <Link href="https://joinhampton.com/about-us" className="underline">
              https://joinhampton.com/about-us
            </Link>
          </p>
          <p className="text-sm mt-2">
            TBD: <span className="text-blue-600">https://joinhampton</span>
          </p>
        </div>
      </section>
    </main>
  )
}
