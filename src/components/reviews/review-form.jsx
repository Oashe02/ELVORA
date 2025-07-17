"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import ImageUploader from "../helper/image-uploader"
import axiosInstance from "@/lib/axiosInstance"
import { ReviewStatusSelector } from "./review-status-selector"
import { DeleteReviewButton } from "./delete-review-button"

export default function ReviewForm({ reviewId = null }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(!!reviewId)
  const [products, setProducts] = useState([])
  const [images, setImages] = useState([])
  const [formData, setFormData] = useState({
    productId: "",
    userName: "",
    userEmail: "",
    rating: 5,
    title: "",
    comment: "",
    verified: false,
    status: "pending",
    color: "",
    size: "",
  })

  const isEditing = !!reviewId

  useEffect(() => {
    if (reviewId) {
      fetchReview()
    }
  }, [reviewId])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchReview = async () => {
    try {
      const response = await axiosInstance.get(`/review/${reviewId}`)
      const review = response.data.data || response.data
      setFormData({
        productId: review.productId || "",
        userName: review.userName || "",
        userEmail: review.userEmail || "",
        rating: review.rating || 5,
        title: review.title || "",
        comment: review.comment || "",
        verified: review.verified || false,
        status: review.status || "pending",
        color: review.color || "",
        size: review.size || "",
      })
      setImages(review.images || [])
    } catch (error) {
      console.error("Error fetching review:", error)
      toast.error("Failed to load review")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products")
      let productsData = []
      if (response.data.products) {
        productsData = response.data.products
      } else if (response.data.data) {
        productsData = response.data.data
      } else if (Array.isArray(response.data)) {
        productsData = response.data
      }
      setProducts(productsData)
    } catch (error) {
      console.error("Error fetching products:", error)
      toast.error("Failed to load products")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleRatingChange = (rating) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  const handleImagesChange = (newImages) => {
    setImages(newImages)
  }

  const handleStatusChange = () => {
    if (isEditing) {
      fetchReview()
    }
  }

  const handleDeleteSuccess = () => {
    router.push("/admin/reviews")
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (
        !formData.productId ||
        !formData.userName.trim() ||
        !formData.userEmail.trim() ||
        !formData.title.trim() ||
        !formData.comment.trim()
      ) {
        toast.error("Please fill in all required fields")
        setIsSubmitting(false)
        return
      }

      const reviewData = {
        productId: formData.productId,
        userName: formData.userName.trim(),
        userEmail: formData.userEmail.trim(),
        rating: Number(formData.rating),
        title: formData.title.trim(),
        comment: formData.comment.trim(),
        verified: Boolean(formData.verified),
        status: formData.status,
        color: formData.color.trim() || undefined,
        size: formData.size.trim() || undefined,
        images: images || [],
      }

      let res
      if (isEditing) {
        res = await axiosInstance.put(`/review/${reviewId}`, reviewData)
      } else {
        res = await axiosInstance.post("/review", reviewData)
      }

      toast.success(`Review ${isEditing ? "updated" : "created"} successfully`)
      router.push("/admin/reviews")
    } catch (error) {
      console.error("Submit error:", error)
      toast.error(error.response?.data?.error || "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const StarRating = ({ value, onChange }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`p-1 ${star <= value ? "text-yellow-400" : "text-gray-300"}`}
          >
            <Star className="h-6 w-6 fill-current" />
          </button>
        ))}
      </div>
    )
  }

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-center">Loading...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{isEditing ? "Edit Review" : "Add New Review"}</CardTitle>
            <CardDescription>
              {isEditing ? "Update the review information below" : "Fill in the details to create a new review"}
            </CardDescription>
          </div>
          {isEditing && (
            <div className="flex items-center space-x-2">
              <ReviewStatusSelector
                reviewId={reviewId}
                currentStatus={formData.status}
                onStatusChange={handleStatusChange}
              />
              <DeleteReviewButton reviewId={reviewId} onDelete={handleDeleteSuccess} />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="productId">Product *</Label>
              <Select value={formData.productId} onValueChange={(value) => handleSelectChange("productId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product._id} value={product._id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="userName">User Name *</Label>
              <Input
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter user name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userEmail">User Email *</Label>
              <Input
                id="userEmail"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleChange}
                placeholder="Enter user email"
                type="email"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Rating *</Label>
            <StarRating value={formData.rating} onChange={handleRatingChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Review Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter review title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Review Comment *</Label>
            <Textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Write the review comment here..."
              className="resize-none min-h-[120px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="color">Color (Optional)</Label>
              <Input
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="Product color"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Size (Optional)</Label>
              <Input id="size" name="size" value={formData.size} onChange={handleChange} placeholder="Product size" />
            </div>
          </div>

          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Verified Purchase</Label>
              <p className="text-sm text-muted-foreground">Mark this review as from a verified purchaser</p>
            </div>
            <Switch
              checked={formData.verified}
              onCheckedChange={(checked) => handleSwitchChange("verified", checked)}
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Review Images</Label>
              <ImageUploader
                initialImages={images}
                onChange={handleImagesChange}
                maxFiles={5}
                label="Upload Review Images"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/reviews")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEditing ? "Update Review" : "Create Review"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
