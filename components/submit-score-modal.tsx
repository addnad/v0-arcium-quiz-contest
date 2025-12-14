"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@solana/wallet-adapter-react"
import { storeEncryptedScoreOnchain } from "@/lib/arcium-storage"
import { Loader2, Lock, CheckCircle2, XCircle, ArrowLeft, ExternalLink } from "lucide-react"

interface SubmitScoreModalProps {
  gameName: string
  score: number
  onSubmitted?: () => void // Made optional to handle undefined case
  onSkip?: () => void // Made optional to handle undefined case
}

export function SubmitScoreModal({ gameName, score, onSubmitted, onSkip }: SubmitScoreModalProps) {
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [signature, setSignature] = useState<string>("")
  const [error, setError] = useState<string>("")
  const wallet = useWallet()

  const handleSubmit = async () => {
    if (!wallet.publicKey) {
      setError("Please connect your wallet first")
      setStatus("error")
      return
    }

    setSubmitting(true)
    setStatus("idle")

    const username = localStorage.getItem("arcium-username") || "Anonymous"
    const result = await storeEncryptedScoreOnchain(wallet, username, gameName, score)

    setSubmitting(false)

    if (result.success) {
      setStatus("success")
      setSignature(result.signature || "")
    } else {
      setStatus("error")
      setError(result.error || "Failed to store score")
    }
  }

  const username = localStorage.getItem("arcium-username") || "Anonymous"

  const handleBackToGames = () => {
    console.log("[v0] Back to Games button clicked")
    console.log("[v0] onSubmitted type:", typeof onSubmitted)
    console.log("[v0] onSubmitted value:", onSubmitted)
    if (onSubmitted) {
      try {
        onSubmitted()
      } catch (error) {
        console.error("[v0] Error calling onSubmitted:", error)
      }
    } else {
      console.warn("[v0] onSubmitted is not provided")
    }
  }

  const handleSkip = () => {
    console.log("[v0] Skip button clicked")
    if (onSkip) {
      try {
        onSkip()
      } catch (error) {
        console.error("[v0] Error calling onSkip:", error)
      }
    } else {
      console.warn("[v0] onSkip is not provided")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="max-w-md w-full bg-gradient-to-br from-purple-900/90 to-indigo-900/90 backdrop-blur-xl rounded-3xl p-8 border-2 border-purple-500/30 text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-5xl">
          <Lock className="w-10 h-10 text-white" />
        </div>

        <h2 className="text-3xl font-bold text-white mb-2">
          {status === "success" ? "Score Encrypted!" : "Submit Score Onchain"}
        </h2>

        <p className="text-white/70 mb-6">
          {status === "idle" && !submitting && "Store your score encrypted using Arcium MPC technology"}
          {status === "idle" && submitting && "Waiting for transaction confirmation..."}
          {status === "success" && "Your score has been encrypted and stored onchain!"}
          {status === "error" && "Failed to store score onchain"}
        </p>

        {status === "idle" && (
          <>
            <div className="bg-white/10 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70">Game:</span>
                <span className="text-white font-semibold">{gameName}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70">Score:</span>
                <span className="text-pink-400 font-bold text-2xl">{score}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Player:</span>
                <span className="text-white font-semibold">{username}</span>
              </div>
            </div>

            {wallet.publicKey ? (
              <div className="space-y-3">
                <Button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg py-6"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Perform confidential computation...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Submit Encrypted Score
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleSkip}
                  variant="ghost"
                  className="w-full text-white/70 hover:text-white hover:bg-white/10"
                >
                  Skip
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-yellow-400 text-sm">Connect wallet to store score onchain</p>
                <Button onClick={handleSkip} variant="outline" className="w-full bg-transparent">
                  Continue without storing
                </Button>
              </div>
            )}
          </>
        )}

        {status === "success" && (
          <div className="space-y-4">
            <CheckCircle2 className="w-16 h-16 mx-auto text-green-400" />
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-sm text-white/70 mb-2">Transaction:</p>
              <p className="text-purple-400 font-mono text-xs break-all mb-3">{signature}</p>
              <a
                href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300"
              >
                View on Solana Explorer
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
            <Button
              onClick={handleBackToGames}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <XCircle className="w-16 h-16 mx-auto text-red-400" />
            <p className="text-red-400 text-sm">{error}</p>
            <div className="space-y-2">
              <Button onClick={handleSubmit} className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
                Try Again
              </Button>
              <Button
                onClick={handleBackToGames}
                variant="outline"
                className="w-full bg-transparent border-white/30 text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Games
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SubmitScoreModal
