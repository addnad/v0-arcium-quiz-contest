"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const factCards = [
  "Arcium enables Decentralized Confidential Computing (DeCC).",
  "It combines privacy, security, and verifiability onchain.",
  "Arcium keeps data encrypted even during computation.",
  "It removes single points of failure through distributed execution.",
  "Arcium supports multi-party computation across secure nodes.",
  "It allows institutions to trade and compute privately on Web3.",
  "Remote attestation ensures node integrity in Arcium's network.",
  "It's built to make confidential computing trustless and decentralized.",
  "Arcium's design protects against data leaks and insider threats.",
  "It enables private smart contracts that are still verifiable.",
  "Arcium can power dark pools, private DeFi, and secure AI.",
  "Data, code, and execution remain confidential yet auditable.",
  "It bridges Web2 institutions into Web3 privacy infrastructure.",
  "Arcium supports encrypted coordination between participants.",
  "It resists front-running and MEV attacks in trading.",
  "DeCC ensures computations are verified without exposing raw data.",
  "Arcium can host privacy-preserving analytics and machine learning.",
  "It enables regulatory auditability without revealing live activity.",
  "Arcium decentralizes trust away from any single hardware vendor.",
  "It's shaping the future of private, verifiable computation onchain.",
]

interface ArciumFactCardsProps {
  onBack: () => void
}

export function ArciumFactCards({ onBack }: ArciumFactCardsProps) {
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

  const toggleCard = (index: number) => {
    setFlippedCard((prev) => (prev === index ? null : index))
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-8 md:py-12"
      style={{
        background: "linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 50%, #1a0b2e 100%)",
      }}
    >
      <Image
        src="/images/jpeg-20image-4a18-8462-04-0.jpeg"
        alt="Arcium Booth"
        width={1}
        height={1}
        className="hidden"
        priority
      />

      <Button
        onClick={onBack}
        variant="ghost"
        className="self-start mb-8 text-white hover:text-cyan-300 hover:bg-white/10 transition-all"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to <span className="text-cyan-300 font-semibold">{"<encrypted>"}</span> World
      </Button>

      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="flex flex-col items-center gap-8 mb-12">
          <div className="flex items-center gap-6 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl border border-white/20 rounded-3xl px-8 md:px-12 py-5 md:py-6 shadow-2xl">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center p-2 md:p-3 shadow-lg">
              <Image
                src="/images/arcium-logo.png"
                alt="Arcium Logo"
                width={64}
                height={64}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Arcium Fact Cards
              </h1>
              <p className="text-base md:text-lg text-cyan-300 font-medium">Learn about confidential computing</p>
            </div>
          </div>

          {/* Creator Credit */}
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-lg border border-purple-500/30 rounded-2xl px-6 py-4 max-w-2xl">
            <p className="text-white/90 text-center text-sm md:text-base">
              Original concept and design by{" "}
              <a
                href="https://x.com/dfw_victor2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 font-semibold transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                @dfw_victor2
              </a>
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {factCards.map((fact, index) => (
            <div key={index} className="card-container" onClick={() => toggleCard(index)}>
              <div className={`card-inner ${flippedCard === index ? "flipped" : ""}`}>
                {/* Front of Card */}
                <div className="card-face card-front">
                  <Image
                    src="/images/jpeg-20image-4a18-8462-04-0.jpeg"
                    alt="Arcium Booth Background"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="text-center relative z-10">
                    <div className="text-6xl mb-4">🔐</div>
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">Card {index + 1}</h3>
                    <p className="text-white/90 text-sm mt-2 font-semibold drop-shadow-md">Click to reveal</p>
                  </div>
                </div>

                {/* Back of Card */}
                <div className="card-face card-back">
                  <p className="text-white text-center text-base md:text-lg leading-relaxed font-medium">{fact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-white/60 text-sm">
            Click any card to flip and discover fascinating facts about Arcium's confidential computing ecosystem
          </p>
        </div>
      </div>

      <style jsx>{`
        .card-container {
          perspective: 1000px;
          width: 100%;
          height: 16rem;
          cursor: pointer;
        }
        
        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        
        .card-inner.flipped {
          transform: rotateY(180deg);
        }
        
        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.2);
          overflow: hidden;
        }
        
        .card-front {
          background: transparent;
        }
        
        .card-back {
          background: linear-gradient(135deg, #0891b2 0%, #7c3aed 100%);
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  )
}
