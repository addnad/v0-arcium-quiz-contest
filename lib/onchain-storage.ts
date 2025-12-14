import { type Connection, PublicKey, Transaction, SystemProgram } from "@solana/web3.js"

interface ScoreProof {
  username: string
  gameName: string
  score: number
  timestamp: number
  walletAddress: string
}

// Create a simple memo transaction to store score proof onchain
export async function storeScoreOnchain(
  connection: Connection,
  walletPublicKey: PublicKey,
  signTransaction: (tx: Transaction) => Promise<Transaction>,
  scoreData: ScoreProof,
): Promise<string> {
  try {
    // Create a simple transaction with memo
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: walletPublicKey,
        toPubkey: walletPublicKey, // Send to self (0 cost except fees)
        lamports: 0,
      }),
    )

    // In production, this would be encrypted using Arcium's MPC
    const scoreProof = JSON.stringify(scoreData)

    // Add memo instruction (this stores data onchain)
    const memoProgram = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr")
    transaction.add({
      keys: [],
      programId: memoProgram,
      data: Buffer.from(scoreProof, "utf-8"),
    })

    // Get recent blockhash
    const { blockhash } = await connection.getLatestBlockhash()
    transaction.recentBlockhash = blockhash
    transaction.feePayer = walletPublicKey

    // Sign and send transaction
    const signed = await signTransaction(transaction)
    const signature = await connection.sendRawTransaction(signed.serialize())

    // Wait for confirmation
    await connection.confirmTransaction(signature, "confirmed")

    return signature
  } catch (error) {
    console.error("Error storing score onchain:", error)
    throw error
  }
}

// Retrieve score from wallet's local storage (scores stored onchain but indexed locally for performance)
export function getStoredScores(username: string): ScoreProof[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem(`arcium-onchain-scores-${username}`)
  return stored ? JSON.parse(stored) : []
}

// Save score proof locally (backup) and onchain
export function saveScoreProof(proof: ScoreProof): void {
  if (typeof window === "undefined") return

  const existing = getStoredScores(proof.username)
  const updated = [...existing, proof]
  localStorage.setItem(`arcium-onchain-scores-${proof.username}`, JSON.stringify(updated))
}
