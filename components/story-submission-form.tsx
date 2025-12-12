"use client"

import type React from "react"

import { useState } from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Send, Loader2 } from "lucide-react"

interface StorySubmissionFormProps {
  username: string
  onSubmitted: () => void
}

export default function StorySubmissionForm({ username, onSubmitted }: StorySubmissionFormProps) {
  const [fortressName, setFortressName] = useState("")
  const [storyTitle, setStoryTitle] = useState("")
  const [storyContent, setStoryContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    const supabase = createBrowserClient()

    try {
      const { error } = await supabase.from("user_generated_stories").insert({
        username,
        fortress_name: fortressName,
        story_title: storyTitle,
        story_content: storyContent,
        status: "pending",
      })

      if (error) throw error

      setMessage("Story submitted successfully! Awaiting moderation.")
      setFortressName("")
      setStoryTitle("")
      setStoryContent("")
      setTimeout(() => {
        onSubmitted()
      }, 2000)
    } catch (error) {
      console.error("[v0] Error submitting story:", error)
      setMessage("Failed to submit story. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900/50 p-6 rounded-lg border border-purple-500/30">
      <div>
        <Label htmlFor="fortress-name" className="text-white">
          Fortress Name
        </Label>
        <Input
          id="fortress-name"
          value={fortressName}
          onChange={(e) => setFortressName(e.target.value)}
          placeholder="e.g., Citadel of Trust"
          required
          minLength={3}
          className="bg-slate-800 border-purple-500/30 text-white"
        />
      </div>

      <div>
        <Label htmlFor="story-title" className="text-white">
          Story Title
        </Label>
        <Input
          id="story-title"
          value={storyTitle}
          onChange={(e) => setStoryTitle(e.target.value)}
          placeholder="Give your story a compelling title"
          required
          minLength={5}
          className="bg-slate-800 border-purple-500/30 text-white"
        />
      </div>

      <div>
        <Label htmlFor="story-content" className="text-white">
          Your Story
        </Label>
        <Textarea
          id="story-content"
          value={storyContent}
          onChange={(e) => setStoryContent(e.target.value)}
          placeholder="Share your fortress story... (min 50 characters)"
          required
          minLength={50}
          rows={8}
          className="bg-slate-800 border-purple-500/30 text-white resize-none"
        />
        <div className="text-xs text-gray-400 mt-1">{storyContent.length}/50 characters minimum</div>
      </div>

      {message && (
        <div className={`text-sm ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>{message}</div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Submit Story
          </>
        )}
      </Button>
    </form>
  )
}
