"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ImageUploader from "../helper/image-uploader"
import VideoUploader from "../helper/video-uploader"
import axiosInstance from "@/lib/axiosInstance"

const feedPostSchema = z.object({
  caption: z.string().min(2, { message: "Caption must be at least 2 characters" }),
  slug: z.string().optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(["active", "draft", "archived"], {
    required_error: "Please select a status",
  }),
  createdBy: z.string().min(1, { message: "Creator is required" }),
})

export default function FeedPostForm({ post, isEditing = false }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tagInput, setTagInput] = useState("")

  const [images, setImages] = useState(
    post?.media?.filter((item) => item.type === "image").map((item) => item.url) || [],
  )
  const [videos, setVideos] = useState(
    post?.media?.filter((item) => item.type === "video").map((item) => item.url) || [],
  )

  const form = useForm({
    resolver: zodResolver(feedPostSchema),
    defaultValues: {
      caption: post?.caption || "",
      slug: post?.slug || "",
      tags: post?.tags || [],
      status: post?.status || "draft",
      createdBy: post?.createdBy || "",
    },
  })

  const handleAddTag = () => {
    if (tagInput.trim() && !form.getValues().tags.includes(tagInput.trim())) {
      const currentTags = form.getValues().tags
      form.setValue("tags", [...currentTags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag) => {
    const currentTags = form.getValues().tags
    form.setValue(
      "tags",
      currentTags.filter((t) => t !== tag),
    )
  }

  async function onSubmit(data) {
    const media = [...images.map((url) => ({ url, type: "image" })), ...videos.map((url) => ({ url, type: "video" }))]

    if (media.length === 0) {
      toast.error("Media required", {
        description: "Please upload at least one image or video",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const processedData = {
        ...data,
        media,
      }

      let res
      if (isEditing && post?._id) {
        res = await axiosInstance.put(`/feed/${post._id}`, processedData)
      } else {
        res = await axiosInstance.post("/feed", processedData)
      }

      if (res.status >= 200 && res.status < 300) {
        toast.success(`Successfully ${isEditing ? "updated" : "created"} feed post`)
        router.push("/admin/feed")
      } else {
        toast.error(res.data?.error || "Something went wrong")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
      console.error("Submit error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Feed Post" : "Add New Feed Post"}</CardTitle>
        <CardDescription>
          {isEditing ? "Update the feed post information below" : "Fill in the details to create a new feed post"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Caption</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your caption here..."
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>The main text content of your post</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="post-slug (leave empty to auto-generate)"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>Leave empty to auto-generate from caption</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="createdBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Created By</FormLabel>
                    <FormControl>
                      <Input placeholder="Author name or ID" {...field} />
                    </FormControl>
                    <FormDescription>User who created this post</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Only active posts are displayed on the site</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="tags"
              render={() => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {form.getValues().tags.map((tag) => (
                      <div key={tag} className="bg-muted px-3 py-1 rounded-full flex items-center gap-2">
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddTag()
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={handleAddTag}>
                      Add
                    </Button>
                  </div>
                  <FormDescription>Add tags to categorize your post</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormItem>
                <FormLabel>Post Images</FormLabel>
                <FormControl>
                  <ImageUploader initialImages={images} onChange={setImages} maxFiles={10} label="Upload Post Images" />
                </FormControl>
                <FormDescription>Upload  images for your post (up to 10)</FormDescription>
              </FormItem>

              <FormItem>
                <FormLabel>Post Videos</FormLabel>
                <FormControl>
                  <VideoUploader initialVideos={videos} onChange={setVideos} maxFiles={5} label="Upload Post Videos" />
                </FormControl>
                <FormDescription>Upload videos for your post (up to 5)</FormDescription>
              </FormItem>

              <FormMessage>
                {images.length === 0 && videos.length === 0 && "At least one image or video is required"}
              </FormMessage>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/feed")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : isEditing ? "Update Post" : "Create Post"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
