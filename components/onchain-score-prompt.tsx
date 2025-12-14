"use client"

import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useConnection } from "@solana/wallet-adapter-react"
import { Button } from "@/components/ui/button"
import { storeScoreOnchain, saveScoreProof } from "@/lib/onchain-storage"
import { Loader2, CheckCircle2, X } from "lucide-react"

interface OnchainScorePromptProps {
  username: string
  gameName: string
  score: number
  onClose: () => void
}

export default function OnchainScorePrompt({ username, gameName, score, onClose }: OnchainScorePromptProps) {
  const { publicKey, signTransaction } = useWallet()
  const { connection } = useConnection()
  const [storing, setStoring] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleStoreOnchain = async () => {
    if (!publicKey || !signTransaction) {
      setError("Wallet not connected")
      return
    }

    setStoring(true)
    setError(null)

    try {
      const scoreProof = {
        username,
        gameName,
        score,
        timestamp: Date.now(),
        walletAddress: publicKey.toString(),
      }

      const signature = await storeScoreOnchain(connection, publicKey, signTransaction, scoreProof)

      // Save locally as backup
      saveScoreProof(scoreProof)

      console.log("[v0] Score stored onchain:", signature)
      setSuccess(true)

      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (err) {
      console.error("[v0] Error storing score:", err)
      setError("Failed to store score onchain")
    } finally {
      setStoring(false)
    }
  }

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center animate-pulse">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Score Stored Onchain!</h3>
          <p className="text-white/70 text-sm">
            Your achievement has been encrypted and verified using Arcium technology
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 max-w-md w-full">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Store Score Onchain?</h3>
            <p className="text-white/70 text-sm">Verify your achievement using Arcium's encrypted technology</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-all">
            <X className="w-5 h-5 text-white/50" />
          </button>
        </div>

        <div className="bg-gradient-to-br from-purple-400/20 to-cyan-400/20 border border-white/20 rounded-xl p-6 mb-6">
          <div className="text-center mb-4">
            <p className="text-white/60 text-sm mb-1">Game</p>
            <p className="text-white font-bold text-lg">{gameName}</p>
          </div>
          <div className="text-center">
            <p className="text-white/60 text-sm mb-1">Score</p>
            <p className="text-4xl font-bold text-cyan-300">{score}</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">{error}</div>
        )}

        <div className="space-y-3">
          <Button
            onClick={handleStoreOnchain}
            disabled={storing || !publicKey}
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold"
          >
            {storing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Storing Onchain...
              </>
            ) : (
              "Store Score Onchain"
            )}
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full bg-white/5 hover:bg-white/10 border-white/20 text-white"
          >
            Skip
          </Button>
        </div>

        {!publicKey && (
          <p className="text-xs text-orange-300 text-center mt-4">
            Wallet not connected. Connect your wallet to store scores onchain.
          </p>
        )}
      </div>
    </div>
  )
}
