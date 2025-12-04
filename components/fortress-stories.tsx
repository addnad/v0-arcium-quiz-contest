"use client"

import { useState } from "react"
import { ArrowLeft, BookOpen, X } from "lucide-react"
import Image from "next/image"

interface FortressStoriesProps {
  onBack: () => void
}

const FORTRESSES = [
  {
    id: "defirius",
    name: "Fortress Defirius",
    subtitle: "Your Financial Life",
    image: "/images/fortress-defirius.jpg",
    description: "The guardian of your financial secrets and transactions",
    story: `In the heart of the Arcium Citadel stands Fortress Defirius, a towering structure where your financial life is encrypted and protected. Here, every transaction, every asset, and every financial decision is shielded from prying eyes.

Within its walls, the ancient art of Multi-Party Computation transforms your sensitive financial data into cryptographic puzzles that can only be solved with your permission. No single entity can see your complete financial picture—not banks, not governments, not even the fortress itself.

The keepers of Defirius understand that financial privacy is not about hiding wrongdoing—it's about protecting your autonomy. When you trade on dark pools, when you manage your DeFi assets, when you conduct private transactions, Fortress Defirius ensures that your financial sovereignty remains intact.

In this fortress, your wealth tells no tales to those who shouldn't hear them.`,
  },
  {
    id: "arcae-intellect",
    name: "Fortress Arcae Intellect",
    subtitle: "Your Thoughts",
    image: "/images/fortress-arcae-intellect.jpg",
    description: "Where your ideas and knowledge remain yours alone",
    story: `Fortress Arcae Intellect rises like a crystalline mind in the Arcium landscape, protecting the most intimate aspect of your digital life: your thoughts, your learning, and your intellectual property.

Here, AI models train on your data without ever seeing it. Your search queries, your writing, your creative works—all processed in encrypted form. The fortress allows you to benefit from artificial intelligence while ensuring your thoughts remain your own.

The scholars of Arcae Intellect have mastered the paradox: how to learn from data without observing it, how to improve systems without compromising privacy. Through homomorphic encryption and secure enclaves, your intellectual footprint becomes invisible yet valuable.

In this sanctuary, knowledge grows while privacy thrives. Your mind's work contributes to collective intelligence without sacrificing individual sovereignty.`,
  },
  {
    id: "guffal",
    name: "Fortress Guffal",
    subtitle: "Your Hobbies and Fun Side",
    image: "/images/fortress-guffal.jpg",
    description: "Protecting your digital leisure and personal interests",
    story: `Fortress Guffal is the playful heart of the Citadel, where your gaming achievements, streaming habits, social connections, and personal interests are encrypted and protected from surveillance capitalism.

This fortress understands that your leisure time reveals as much about you as your work. What games you play, what communities you join, what content you consume—these patterns paint an intimate portrait that corporations and advertisers desperately want to exploit.

The guardians of Guffal have built walls of encryption around your digital downtime. Play-to-earn games that don't track your every move. Social platforms that connect you without selling you. Streaming services that recommend without watching.

In Fortress Guffal, you're free to explore your interests, express yourself, and enjoy your digital life without becoming a product. Here, fun is not a commodity—it's a right.`,
  },
  {
    id: "deepyne",
    name: "Fortress Deepyne",
    subtitle: "Your Daily Patterns",
    image: "/images/fortress-deepyne.jpg",
    description: "Safeguarding your behavioral data and daily routines",
    story: `Deepyne is perhaps the most mysterious fortress in the Citadel, built to protect what many don't realize is being collected: your patterns, your rhythms, your behavioral fingerprint.

When you wake up, where you go, how you move through the world, who you communicate with, when you're most active—these patterns form a detailed map of your existence that can be used to predict and manipulate your behavior.

The architects of Deepyne employ Privacy-Enhancing Technologies to anonymize your behavioral data while still allowing useful insights. DePIN networks powered by Arcium let you contribute to mapping projects, share IoT data, and participate in smart cities without exposing your individual patterns.

This fortress proves that we can build intelligent, responsive systems that serve society without creating a surveillance state. In Deepyne, your patterns serve you, not the other way around.`,
  },
  {
    id: "citadel",
    name: "The Arcium Citadel",
    subtitle: "The Personal Diary",
    image: "/images/fortress-citadel.jpg",
    description: "The central vault where all aspects of your encrypted life converge",
    story: `At the center of all fortresses stands the Arcium Citadel itself—the great convergence where all aspects of your encrypted digital life come together, yet remain fundamentally separate and private.

The Citadel is more than the sum of its fortresses. It's a philosophy made architecture: that privacy is not a feature but a foundation. That data can be useful without being exposed. That we can build a connected world without building a surveillance world.

Here, the Four Fortress Apprentices—representing Finance, Intellect, Leisure, and Behavior—work in concert, protected by the Citadel's master protocols. Each fortress specialized, each connected through encrypted channels, none compromising the others.

The Citadel stands as proof that confidential computing isn't just possible—it's necessary. As you walk through its encrypted halls, you carry with you the power to participate in the digital age without surrendering your privacy.

Welcome to the Arcium Citadel. Your data is yours. Your life is yours. And in this fortress, both remain protected.`,
  },
]

export default function FortressStories({ onBack }: FortressStoriesProps) {
  const [selectedFortress, setSelectedFortress] = useState<string | null>(null)
  const [mobilePreview, setMobilePreview] = useState<string | null>(null)

  const fortress = FORTRESSES.find((f) => f.id === selectedFortress)

  if (fortress) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 py-8"
        style={{
          background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)",
        }}
      >
        <div className="w-full max-w-4xl">
          {/* Back Button */}
          <button
            onClick={() => setSelectedFortress(null)}
            className="mb-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Fortresses
          </button>

          {/* Story Content */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 relative">
                <Image
                  src="/images/arcium-logo.png"
                  alt="Arcium Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">{fortress.name}</h1>
                <p className="text-cyan-300 text-sm">{fortress.subtitle}</p>
              </div>
            </div>

            {/* Fortress Image */}
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-2xl overflow-hidden">
              <Image src={fortress.image || "/placeholder.svg"} alt={fortress.name} fill className="object-cover" />
            </div>

            {/* Story Text */}
            <div className="prose prose-invert max-w-none">
              {fortress.story.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-white/90 leading-relaxed mb-4 text-base md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)",
      }}
    >
      <div className="w-full max-w-6xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Features
        </button>

        {/* Header */}
        <div className="flex flex-col items-center gap-8 mb-12">
          <div className="text-center space-y-4">
            <h1
              className="text-4xl md:text-5xl font-bold text-white"
              style={{
                letterSpacing: "-0.003rem",
                textShadow: "0 0 30px rgba(93, 226, 218, 0.3)",
              }}
            >
              The Arcium Citadel
            </h1>
            <p className="text-xl text-cyan-300 font-medium">Stories of the Five Encrypted Fortresses</p>
            <p className="text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
              Explore the legendary fortresses that protect different aspects of your digital life in the Arcium
              ecosystem. Each fortress tells a story of privacy, encryption, and the future of confidential computing.
            </p>
          </div>
        </div>

        {/* Fortress Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FORTRESSES.map((fortress) => (
            <div
              key={fortress.id}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all md:hover:scale-105 md:hover:border-cyan-400/50 animate-float cursor-pointer"
              style={{
                animationDelay: `${Math.random() * 2}s`,
              }}
              onClick={() => setSelectedFortress(fortress.id)}
            >
              {/* Fortress Image */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={fortress.image || "/placeholder.svg"}
                  alt={fortress.name}
                  fill
                  className="object-cover transition-transform duration-500 md:group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                <div className="hidden md:flex absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex-col items-center justify-center p-6 text-center">
                  <h4 className="text-2xl font-bold text-white mb-3">{fortress.subtitle}</h4>
                  <p className="text-white/90 text-sm leading-relaxed mb-4">{fortress.description}</p>
                  <button
                    onClick={() => setSelectedFortress(fortress.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/20 border border-cyan-400 rounded-full text-cyan-300 text-sm font-semibold hover:bg-cyan-400/30 transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    Click to read full story
                  </button>
                </div>

                {mobilePreview === fortress.id && (
                  <div className="md:hidden absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
                    <button
                      onClick={() => setMobilePreview(null)}
                      className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <h4 className="text-xl font-bold text-white mb-3">{fortress.subtitle}</h4>
                    <p className="text-white/90 text-sm leading-relaxed mb-4">{fortress.description}</p>
                    <button
                      onClick={() => {
                        setMobilePreview(null)
                        setSelectedFortress(fortress.id)
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/20 border border-cyan-400 rounded-full text-cyan-300 text-sm font-semibold"
                    >
                      <BookOpen className="w-4 h-4" />
                      Read full story
                    </button>
                  </div>
                )}
              </div>

              {/* Title Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-xl font-bold text-white md:group-hover:text-cyan-300 transition-colors mb-2">
                  {fortress.name}
                </h3>
                <button
                  onClick={() => setMobilePreview(mobilePreview === fortress.id ? null : fortress.id)}
                  className="md:hidden inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-400/20 border border-cyan-400 rounded-full text-cyan-300 text-xs font-semibold"
                >
                  Tap to preview
                </button>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/10 via-transparent to-transparent"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
