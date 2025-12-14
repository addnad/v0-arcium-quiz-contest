"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useEffect, useState } from "react"
import { CheckCircle2, Wallet, X } from "lucide-react"

interface WalletConnectorProps {
  username: string
  onConnected: (address: string) => void // Updated to pass address
  onSkip?: () => void
}

export default function WalletConnector({ username, onConnected, onSkip }: WalletConnectorProps) {
  const { connected, publicKey } = useWallet()
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (connected && publicKey) {
      setShowSuccess(true)
      // Store wallet connection in localStorage
      localStorage.setItem(
        "arcium-wallet",
        JSON.stringify({
          address: publicKey.toString(),
          username,
          connectedAt: Date.now(),
        }),
      )
      // Wait 2 seconds to show success, then proceed
      setTimeout(() => {
        onConnected(publicKey.toString())
      }, 2000)
    }
  }, [connected, publicKey, username, onConnected])

  if (showSuccess && connected) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)" }}
      >
        <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 shadow-2xl">
          {onSkip && (
            <button
              onClick={onSkip}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-all group"
            >
              <X className="w-5 h-5 text-white/50 group-hover:text-white" />
            </button>
          )}

          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Wallet Connected!</h3>
              <p className="text-white/70 text-sm">
                Your scores will now be verified onchain using Arcium's encrypted technology
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs text-white/50 mb-1">Connected Address</p>
              <p className="text-sm text-cyan-300 font-mono break-all">{publicKey?.toString()}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #6c44fc 0%, #4a2e8f 50%, #2a1a5f 100%)" }}
    >
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl p-8 shadow-2xl">
        {onSkip && (
          <button
            onClick={onSkip}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-all group"
          >
            <X className="w-5 h-5 text-white/50 group-hover:text-white" />
          </button>
        )}

        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-2xl flex items-center justify-center shadow-lg">
            <Wallet className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Connect Your Wallet</h2>
          <p className="text-white/70 text-sm leading-relaxed">
            Connect your Solana wallet to store encrypted score proofs onchain using Arcium's confidential computing
            technology
          </p>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-green-300 text-lg">🔐</span>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm mb-1">Encrypted Storage</h4>
                <p className="text-white/60 text-xs">Your scores are encrypted using Arcium's MPC technology</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-purple-300 text-lg">⛓️</span>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm mb-1">Onchain Verification</h4>
                <p className="text-white/60 text-xs">Immutable proof of your gaming achievements</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-cyan-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-300 text-lg">👤</span>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm mb-1">Privacy Preserved</h4>
                <p className="text-white/60 text-xs">Only you can decrypt your full score details</p>
              </div>
            </div>
          </div>

          <div className="wallet-adapter-button-container">
            <WalletMultiButton className="!bg-gradient-to-r !from-cyan-500 !to-purple-500 hover:!from-cyan-600 hover:!to-purple-600 !text-white !font-bold !py-4 !px-6 !text-base !rounded-xl !shadow-lg hover:!shadow-xl !transition-all !w-full" />
          </div>

          {onSkip && (
            <button
              onClick={onSkip}
              className="w-full text-center text-white/50 hover:text-white/80 text-sm transition-all"
            >
              Skip for now →
            </button>
          )}

          <p className="text-xs text-white/50 text-center">
            Playing as: <span className="text-cyan-300 font-semibold">{username}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
