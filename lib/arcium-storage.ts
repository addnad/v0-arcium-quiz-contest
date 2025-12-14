"use client"

import { Connection, PublicKey, Transaction, SystemProgram } from "@solana/web3.js"
import type { WalletContextState } from "@solana/wallet-adapter-react"
import { RescueCipher, x25519 } from "@arcium-hq/client"

// Arcium encrypted score storage
export interface EncryptedScore {
  username: string
  gameName: string
  score: number
  timestamp: number
  walletAddress: string
  encryptedData: Uint8Array
  publicKey: Uint8Array
  nonce: Uint8Array
}

// Encrypt score data using Arcium's Rescue cipher
export async function encryptScoreData(
  username: string,
  gameName: string,
  score: number,
): Promise<{ encryptedData: Uint8Array; publicKey: Uint8Array; nonce: Uint8Array }> {
  // Generate a random private key for x25519 ECDH
  const privateKey = x25519.utils.randomSecretKey()

  // Derive the public key
  const publicKey = x25519.getPublicKey(privateKey)

  // Generate random nonce using browser's crypto
  const nonce = new Uint8Array(16)
  if (typeof window !== "undefined" && window.crypto) {
    window.crypto.getRandomValues(nonce)
  }

  // For now, we use a self-shared secret for encryption
  // In production, this would use the MXE public key
  const sharedSecret = x25519.getSharedSecret(privateKey, publicKey)

  // Initialize cipher with shared secret
  const cipher = new RescueCipher(sharedSecret)

  // Prepare score data as BigInt array for encryption
  const scoreData = [BigInt(score), BigInt(Date.now()), BigInt(username.charCodeAt(0) || 0)]

  // Encrypt the data
  const encryptedData = cipher.encrypt(scoreData, nonce)

  return {
    encryptedData,
    publicKey,
    nonce,
  }
}

// Store encrypted score onchain using Arcium
export async function storeEncryptedScoreOnchain(
  wallet: WalletContextState,
  username: string,
  gameName: string,
  score: number,
): Promise<{ success: boolean; signature?: string; error?: string }> {
  try {
    if (!wallet.publicKey || !wallet.signTransaction) {
      throw new Error("Wallet not connected")
    }

    // Encrypt the score data using Arcium
    const { encryptedData, publicKey, nonce } = await encryptScoreData(username, gameName, score)

    // Connect to Solana devnet (where Arcium testnet runs)
    const connection = new Connection("https://api.devnet.solana.com", "confirmed")

    // Create memo with encrypted score proof
    const memoData = JSON.stringify({
      type: "arcium_encrypted_score",
      game: gameName,
      username,
      encrypted: Buffer.from(encryptedData).toString("base64"),
      pubkey: Buffer.from(publicKey).toString("base64"),
      nonce: Buffer.from(nonce).toString("base64"),
      timestamp: Date.now(),
    })

    // Create transaction with memo program
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: wallet.publicKey, // Send to self
        lamports: 1000, // Minimal amount (0.000001 SOL)
      }),
    )

    // Add memo instruction with encrypted data
    transaction.add({
      keys: [],
      programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
      data: Buffer.from(memoData, "utf-8"),
    })

    // Get recent blockhash
    const { blockhash } = await connection.getLatestBlockhash()
    transaction.recentBlockhash = blockhash
    transaction.feePayer = wallet.publicKey

    // Sign and send transaction
    const signed = await wallet.signTransaction(transaction)
    const signature = await connection.sendRawTransaction(signed.serialize())

    // Confirm transaction
    await connection.confirmTransaction(signature)

    console.log("[v0] Encrypted score stored onchain:", signature)

    return {
      success: true,
      signature,
    }
  } catch (error: any) {
    console.error("[v0] Error storing encrypted score:", error)
    return {
      success: false,
      error: error.message || "Failed to store score onchain",
    }
  }
}

// Decrypt score data (for verification purposes)
export function decryptScoreData(
  encryptedData: Uint8Array,
  privateKey: Uint8Array,
  publicKey: Uint8Array,
  nonce: Uint8Array,
): { score: number; timestamp: number } {
  const sharedSecret = x25519.getSharedSecret(privateKey, publicKey)
  const cipher = new RescueCipher(sharedSecret)

  const decrypted = cipher.decrypt(encryptedData, nonce)

  return {
    score: Number(decrypted[0]),
    timestamp: Number(decrypted[1]),
  }
}
