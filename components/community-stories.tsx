"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { ChevronUp, ChevronDown, Clock, CheckCircle2, ArrowLeft, Plus, Trash2, Wallet } from "lucide-react"
import StorySubmissionForm from "./story-submission-form"
import { useWallet } from "@solana/wallet-adapter-react"
import WalletConnector from "./wallet-connector"

interface CommunityStoriesProps {
  username: string
  onBack: () => void
}

interface UserStory {
  id: string
  username: string
  fortress_name: string
  story_title: string
  story_content: string
  status: string
  votes: number
  created_at: string
}

export default function CommunityStories({ username, onBack }: CommunityStoriesProps) {
  const [stories, setStories] = useState<UserStory[]>([])
  const [loading, setLoading] = useState(true)
  const [showSubmissionForm, setShowSubmissionForm] = useState(false)
  const [userVotes, setUserVotes] = useState<Record<string, string>>({})
  const [showWalletForVoting, setShowWalletForVoting] = useState(false)
  const [pendingVote, setPendingVote] = useState<{ storyId: string; voteType: "upvote" | "downvote" } | null>(null)
  const [showWalletConnector, setShowWalletConnector] = useState(false)
  const { connected, publicKey, signTransaction } = useWallet()

  useEffect(() => {
    loadStories()
    loadUserVotes()
  }, [])

  const loadStories = async () => {
    const supabase = createBrowserClient()
    const { data, error } = await supabase
      .from("user_generated_stories")
      .select("*")
      .in("status", ["approved", "pending"])
      .order("votes", { ascending: false })
      .order("created_at", { ascending: false })

    if (data) {
      setStories(data)
    }
    setLoading(false)
  }

  const loadUserVotes = async () => {
    const supabase = createBrowserClient()
    const { data } = await supabase.from("story_votes").select("story_id, vote_type").eq("username", username)

    if (data) {
      const votesMap: Record<string, string> = {}
      data.forEach((vote) => {
        votesMap[vote.story_id] = vote.vote_type
      })
      setUserVotes(votesMap)
    }
  }

  const handleVote = async (storyId: string, voteType: "upvote" | "downvote") => {
    if (!connected || !publicKey) {
      setPendingVote({ storyId, voteType })
      setShowWalletForVoting(true)
      return
    }

    const supabase = createBrowserClient()
    const existingVote = userVotes[storyId]

    try {
      if (existingVote) {
        await supabase.from("story_votes").delete().eq("story_id", storyId).eq("username", username)
        const story = stories.find((s) => s.id === storyId)
        if (story) {
          const change = existingVote === "upvote" ? -1 : 1
          await supabase
            .from("user_generated_stories")
            .update({ votes: story.votes + change })
            .eq("id", storyId)
        }
      }

      if (existingVote !== voteType) {
        await supabase.from("story_votes").insert({ story_id: storyId, username, vote_type: voteType })
        const story = stories.find((s) => s.id === storyId)
        if (story) {
          const change = voteType === "upvote" ? 1 : -1
          await supabase
            .from("user_generated_stories")
            .update({ votes: story.votes + change })
            .eq("id", storyId)
        }
      }

      loadStories()
      loadUserVotes()
    } catch (error) {
      console.error("[v0] Error voting:", error)
    }
  }

  const handleDeleteStory = async (storyId: string, storyUsername: string) => {
    if (storyUsername !== username) {
      alert("You can only delete your own stories")
      return
    }

    if (!connected || !publicKey) {
      alert("Please connect your wallet to delete stories")
      setShowWalletConnector(true)
      return
    }

    if (!confirm("Are you sure you want to delete this story? This action cannot be undone.")) {
      return
    }

    try {
      const { Connection, Transaction, SystemProgram, PublicKey } = await import("@solana/web3.js")
      const connection = new Connection("https://api.devnet.solana.com", "confirmed")

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: publicKey,
          lamports: 1,
        }),
      )

      transaction.feePayer = publicKey
      const { blockhash } = await connection.getLatestBlockhash()
      transaction.recentBlockhash = blockhash

      const signed = await signTransaction(transaction)
      const signature = await connection.sendRawTransaction(signed.serialize())
      await connection.confirmTransaction(signature)

      console.log("[v0] Delete transaction confirmed:", signature)

      const supabase = createBrowserClient()
      const { error } = await supabase
        .from("user_generated_stories")
        .delete()
        .eq("id", storyId)
        .eq("username", username)

      if (error) throw error

      alert(`Story deleted successfully! Transaction: ${signature}`)
      loadStories()
    } catch (error: any) {
      console.error("[v0] Error deleting story:", error)
      if (error.message?.includes("User rejected")) {
        alert("Deletion cancelled - wallet signature required")
      } else {
        alert("Failed to delete story. Please try again.")
      }
    }
  }

  const handleWalletConnected = async () => {
    setShowWalletForVoting(false)
    if (pendingVote && publicKey) {
      await handleVote(pendingVote.storyId, pendingVote.voteType)
      setPendingVote(null)
    }
  }

  if (showWalletConnector) {
    return (
      <WalletConnector
        username={username}
        context="stories"
        onConnected={(address) => {
          console.log("[v0] Wallet connected:", address)
          setShowWalletConnector(false)
        }}
        onSkip={() => setShowWalletConnector(false)}
      />
    )
  }

  if (showWalletForVoting) {
    return (
      <WalletConnector
        username={username}
        context="stories"
        onConnected={handleWalletConnected}
        onSkip={() => {
          setShowWalletForVoting(false)
          setPendingVote(null)
        }}
      />
    )
  }

  if (showSubmissionForm) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 p-6">
        <Button
          onClick={() => setShowSubmissionForm(false)}
          variant="ghost"
          className="mb-4 text-white hover:bg-white/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Stories
        </Button>

        <h2 className="text-3xl font-bold text-white mb-6">Submit Your Fortress Story</h2>

        <StorySubmissionForm
          username={username}
          walletConnected={connected}
          walletAddress={publicKey?.toString()}
          onSubmitted={() => {
            setShowSubmissionForm(false)
            loadStories()
          }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="flex items-center justify-between mb-6">
        <Button onClick={onBack} variant="ghost" className="text-white hover:bg-white/10">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="flex items-center gap-3">
          {connected && publicKey ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
              <Wallet className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-300 font-mono">
                {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
              </span>
            </div>
          ) : (
            <Button
              onClick={() => setShowWalletConnector(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          )}
          <Button
            onClick={() => setShowSubmissionForm(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Submit Story
          </Button>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-white mb-6">Community Fortress Stories</h2>

      {loading ? (
        <div className="text-white text-center">Loading stories...</div>
      ) : stories.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <p className="mb-4">No community stories yet.</p>
          <p>Be the first to share your fortress tale!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {stories.map((story) => (
            <div key={story.id} className="bg-slate-900/50 border border-purple-500/30 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center gap-1">
                  <button
                    onClick={() => handleVote(story.id, "upvote")}
                    className={`p-1 rounded hover:bg-purple-500/20 ${
                      userVotes[story.id] === "upvote" ? "text-green-400" : "text-gray-400"
                    }`}
                  >
                    <ChevronUp className="w-6 h-6" />
                  </button>
                  <span className="text-white font-bold">{story.votes}</span>
                  <button
                    onClick={() => handleVote(story.id, "downvote")}
                    className={`p-1 rounded hover:bg-purple-500/20 ${
                      userVotes[story.id] === "downvote" ? "text-red-400" : "text-gray-400"
                    }`}
                  >
                    <ChevronDown className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white">{story.story_title}</h3>
                      {story.status === "approved" && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                      {story.status === "pending" && <Clock className="w-5 h-5 text-yellow-400" />}
                    </div>
                    {story.username === username && (
                      <button
                        onClick={() => handleDeleteStory(story.id, story.username)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-all group"
                        title="Delete story"
                      >
                        <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300" />
                      </button>
                    )}
                  </div>

                  <div className="text-sm text-gray-400 mb-3">
                    <span className="text-purple-400">{story.fortress_name}</span> • by {story.username}
                  </div>

                  <p className="text-gray-300 whitespace-pre-wrap">{story.story_content}</p>

                  <div className="text-xs text-gray-500 mt-3">{new Date(story.created_at).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
