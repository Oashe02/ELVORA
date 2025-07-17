"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axiosInstance from "@/lib/axiosInstance";
import ImageUploader from "@/components/helper/image-uploader";
import VideoUploader from "@/components/helper/video-uploader";
import ThumbnailUploader from "@/components/helper/thumbnail-uploader";

// Validation schema
const manufacturerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  slug: z.string().optional(),
  shortDescription: z
    .string()
    .min(10, { message: "Short description must be at least 10 characters" }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" }),
  establishedYear: z.coerce.number().int().optional(),
  contact: z.object({
    website: z.string().url().optional().or(z.literal("")),
    email: z.string().email().optional().or(z.literal("")),
    phone: z.string().optional(),
    address: z.object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      postalCode: z.string().optional(),
      country: z.string().optional(),
    }),
  }),
  socialLinks: z.object({
    facebook: z.string().url().optional().or(z.literal("")),
    instagram: z.string().url().optional().or(z.literal("")),
    linkedin: z.string().url().optional().or(z.literal("")),
    twitter: z.string().url().optional().or(z.literal("")),
  }),
  certifications: z.array(z.string()).optional(),
  compliance: z.array(z.string()).optional(),
  industry: z.string().optional(),
  tags: z.array(z.string()).optional(),
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }),
  priority: z.coerce.number().int().default(0),
  status: z.enum(["active", "draft", "unpublished"], {
    required_error: "Please select a status",
  }),
  brochure: z.string().optional(),
rating: z
  .object({
    average: z.coerce.number().min(0).max(5).default(0),
    count: z.coerce.number().int().min(0).default(0),
  })
  .optional(),
});

export default function ManufacturerForm({ manufacturer = {}, isEditing = false }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnail, setThumbnail] = useState(manufacturer.thumbnail || null);
  const [images, setImages] = useState(manufacturer.images || []);
  const [videos, setVideos] = useState(manufacturer.videos || []);
  const [brochure, setBrochure] = useState(manufacturer.brochure || null);

  const form = useForm({
    resolver: zodResolver(manufacturerSchema),
    defaultValues: {
      name: manufacturer.name || "",
      slug: manufacturer.slug || "",
      shortDescription: manufacturer.shortDescription || "",
      description: manufacturer.description || "",
      establishedYear: manufacturer.establishedYear || "",
      contact: {
        website: manufacturer.contact?.website || "",
        email: manufacturer.contact?.email || "",
        phone: manufacturer.contact?.phone || "",
        address: {
          street: manufacturer.contact?.address?.street || "",
          city: manufacturer.contact?.address?.city || "",
          state: manufacturer.contact?.address?.state || "",
          postalCode: manufacturer.contact?.address?.postalCode || "",
          country: manufacturer.contact?.address?.country || "",
        },
      },
      socialLinks: {
        facebook: manufacturer.socialLinks?.facebook || "",
        instagram: manufacturer.socialLinks?.instagram || "",
        linkedin: manufacturer.socialLinks?.linkedin || "",
        twitter: manufacturer.socialLinks?.twitter || "",
      },
      certifications: manufacturer.certifications || [],
      compliance: manufacturer.compliance || [],
      industry: manufacturer.industry || "",
      tags: manufacturer.tags || [],
      seo: {
        metaTitle: manufacturer.seo?.metaTitle || "",
        metaDescription: manufacturer.seo?.metaDescription || "",
        keywords: manufacturer.seo?.keywords || [],
      },
      priority: manufacturer.priority || 0,
      status: manufacturer.status || "draft",
      brochure: manufacturer.brochure || "",
      rating: {
        average: manufacturer.rating?.average || 0,
        count: manufacturer.rating?.count || 0,
      },
    },
  });

  const onSubmit = async (data) => {
    if (!thumbnail) {
      toast.error("Thumbnail required", {
        description: "Please upload a thumbnail image for the manufacturer",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = { ...data, thumbnail, images, videos, brochure };
      let res;
      if (isEditing && manufacturer._id) {
        res = await axiosInstance.put(`/manufacturer/${manufacturer._id}`, payload);
      } else {
        res = await axiosInstance.post("/manufacturer", payload);
      }

      if (res.status >= 200 && res.status < 300) {
        toast.success(`Successfully ${isEditing ? "updated" : "created"} manufacturer!`);
        router.push("/admin/manufacturers");
      } else {
        toast.error(res.data?.error || "Something went wrong");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Manufacturer" : "Add New Manufacturer"}</CardTitle>
        <CardDescription>
          {isEditing
            ? "Update the manufacturer information below"
            : "Fill in the details to create a new manufacturer"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Manufacturer name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="manufacturer-slug (leave empty to auto-generate)"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Leave empty to auto-generate from name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>Higher numbers appear first</FormDescription>
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
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="unpublished">Unpublished</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Only active manufacturers are displayed on the site
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="establishedYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Established Year</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="YYYY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Automotive" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating.average"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating Average</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" placeholder="0.0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rating.count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating Count</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief description of the manufacturer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detailed description of the manufacturer"
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="contact.website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="contact@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="contact.address.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact.address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact.address.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact.address.postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="12345" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contact.address.country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Social Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="socialLinks.facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook</FormLabel>
                      <FormControl>
                        <Input placeholder="https://facebook.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="socialLinks.instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input placeholder="https://instagram.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="socialLinks.linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn</FormLabel>
                      <FormControl>
                        <Input placeholder="https://linkedin.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="socialLinks.twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter</FormLabel>
                      <FormControl>
                        <Input placeholder="https://twitter.com/..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="certifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certifications (comma-separated)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ISO 9001, CE, etc."
                        value={field.value?.join(", ") || ""}
                        onChange={(e) => field.onChange(e.target.value.split(", ").filter(Boolean))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="compliance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compliance (comma-separated)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="EPA, GDPR, etc."
                        value={field.value?.join(", ") || ""}
                        onChange={(e) => field.onChange(e.target.value.split(", ").filter(Boolean))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (comma-separated)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Luxury, Electric, etc."
                        value={field.value?.join(", ") || ""}
                        onChange={(e) => field.onChange(e.target.value.split(", ").filter(Boolean))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">SEO Fields</h3>
              <FormField
                control={form.control}
                name="seo.metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Title</FormLabel>
                    <FormControl>
                      <Input placeholder="SEO title for the manufacturer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seo.metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="SEO description for the manufacturer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seo.keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keywords (comma-separated)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="keyword1, keyword2, etc."
                        value={field.value?.join(", ") || ""}
                        onChange={(e) => field.onChange(e.target.value.split(", ").filter(Boolean))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <ThumbnailUploader
                    initialThumbnail={thumbnail}
                    onChange={setThumbnail}
                    label="Upload Manufacturer Thumbnail"
                  />
                </FormControl>
                <FormDescription>
                  This will be the main image for your manufacturer
                </FormDescription>
                <FormMessage>{!thumbnail && "Thumbnail is required"}</FormMessage>
              </FormItem>
              <FormItem>
                <FormLabel>Manufacturer Images</FormLabel>
                <FormControl>
                  <ImageUploader
                    initialImages={images}
                    onChange={setImages}
                    maxFiles={10}
                    label="Upload Manufacturer Images"
                  />
                </FormControl>
                <FormDescription>
                  Upload additional manufacturer images (up to 10)
                </FormDescription>
              </FormItem>
              <FormItem>
                <FormLabel>Manufacturer Videos</FormLabel>
                <FormControl>
                  <VideoUploader
                    initialVideos={videos}
                    onChange={setVideos}
                    maxFiles={5}
                    label="Upload Manufacturer Videos"
                  />
                </FormControl>
                <FormDescription>
                  Upload manufacturer videos (up to 5)
                </FormDescription>
              </FormItem>
              <FormItem>
                <FormLabel>Brochure</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Brochure URL"
                    value={brochure || ""}
                    onChange={(e) => setBrochure(e.target.value)}
                  />
                </FormControl>
                <FormDescription>Provide a URL for the manufacturer brochure</FormDescription>
              </FormItem>
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/manufacturers")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Saving..."
                  : isEditing
                  ? "Update Manufacturer"
                  : "Create Manufacturer"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}