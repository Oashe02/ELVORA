// components/car-models/CarModelForm.js
"use client";

import { useState, useEffect } from "react";
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
const carModelSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  slug: z.string().optional(),
  shortDescription: z
    .string()
    .min(10, { message: "Short description must be at least 10 characters" }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters" }),
  year: z.coerce.number().int().min(1900).max(new Date().getFullYear() + 1),
  bodyType: z.string().optional(),
  engine: z.object({
    displacement: z.string().optional(),
    cylinders: z.coerce.number().int().optional(),
    type: z.string().optional(),
    horsepower: z.coerce.number().int().optional(),
    torque: z.coerce.number().int().optional(),
  }),
  transmission: z.string().optional(),
  drivetrain: z.string().optional(),
  dimensions: z.object({
    length: z.coerce.number().optional(),
    width: z.coerce.number().optional(),
    height: z.coerce.number().optional(),
    wheelbase: z.coerce.number().optional(),
  }),
  weight: z.coerce.number().optional(),
  fuelType: z.string().optional(),
  fuelCapacity: z.coerce.number().optional(),
  price: z.coerce.number().min(0).optional(),
  features: z.array(z.string()).optional(),
  colorsAvailable: z.array(z.string()).optional(),
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
  specSheet: z.string().optional(),
  make: z.string().min(1, "Make is required"),
});

export default function CarModelForm({ carModel = {}, isEditing = false }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnail, setThumbnail] = useState(carModel.thumbnail || null);
  const [images, setImages] = useState(carModel.images || []);
  const [videos, setVideos] = useState(carModel.videos || []);
  const [specSheet, setSpecSheet] = useState(carModel.specSheet || null);
  const [makes, setMakes] = useState([]);

  // Fetch makes for the dropdown
  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const { data } = await axiosInstance.get("/make");
        setMakes(data.categories || []);
      } catch (error) {
        console.error("Failed to fetch makes:", error);
      }
    };
    
    fetchMakes();
  }, []);

  const form = useForm({
    resolver: zodResolver(carModelSchema),
    defaultValues: {
      name: carModel.name || "",
      slug: carModel.slug || "",
      shortDescription: carModel.shortDescription || "",
      description: carModel.description || "",
      year: carModel.year || new Date().getFullYear(),
      bodyType: carModel.bodyType || "",
      engine: {
        displacement: carModel.engine?.displacement || "",
        cylinders: carModel.engine?.cylinders || "",
        type: carModel.engine?.type || "",
        horsepower: carModel.engine?.horsepower || "",
        torque: carModel.engine?.torque || "",
      },
      transmission: carModel.transmission || "",
      drivetrain: carModel.drivetrain || "",
      dimensions: {
        length: carModel.dimensions?.length || "",
        width: carModel.dimensions?.width || "",
        height: carModel.dimensions?.height || "",
        wheelbase: carModel.dimensions?.wheelbase || "",
      },
      weight: carModel.weight || "",
      fuelType: carModel.fuelType || "",
      fuelCapacity: carModel.fuelCapacity || "",
      price: carModel.price || "",
      features: carModel.features || [],
      colorsAvailable: carModel.colorsAvailable || [],
      industry: carModel.industry || "",
      tags: carModel.tags || [],
      seo: {
        metaTitle: carModel.seo?.metaTitle || "",
        metaDescription: carModel.seo?.metaDescription || "",
        keywords: carModel.seo?.keywords || [],
      },
      priority: carModel.priority || 0,
      status: carModel.status || "draft",
      specSheet: carModel.specSheet || "",
      make: carModel.make?._id || "",
    },
  });

  const onSubmit = async (data) => {
    if (!thumbnail) {
      toast.error("Thumbnail required", {
        description: "Please upload a thumbnail image for the car model",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = { 
        ...data, 
        thumbnail, 
        images, 
        videos, 
        specSheet 
      };
      
      let res;
      if (isEditing && carModel._id) {
        res = await axiosInstance.put(`/model/${carModel._id}`, payload);
      } else {
        res = await axiosInstance.post("/model", payload);
      }

      if (res.status >= 200 && res.status < 300) {
        toast.success(`Successfully ${isEditing ? "updated" : "created"} car model!`);
        router.push("/admin/car-models");
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
        <CardTitle>{isEditing ? "Edit Car Model" : "Add New Car Model"}</CardTitle>
        <CardDescription>
          {isEditing
            ? "Update the car model information below"
            : "Fill in the details to create a new car model"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Model name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Make */}
              <FormField
                control={form.control}
                name="make"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Make</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a make" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {makes.map((make) => (
                          <SelectItem key={make._id} value={make._id}>
                            {make.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Year */}
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Year" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Body Type */}
              <FormField
                control={form.control}
                name="bodyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Sedan, SUV" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Starting price"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Priority */}
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

              {/* Status */}
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
                      Only active models are displayed on the site
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Short Description */}
            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief description of the model"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Full Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detailed description of the model"
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Engine Specifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Engine Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="engine.displacement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Displacement</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2.0L" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="engine.cylinders"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cylinders</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="4" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="engine.type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Engine Type</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Inline-4, V6" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="engine.horsepower"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horsepower</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="200" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="engine.torque"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Torque (Nm)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="300" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Drivetrain */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="transmission"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transmission</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 6-Speed Automatic" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="drivetrain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Drivetrain</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., AWD, FWD" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Dimensions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Dimensions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="dimensions.length"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Length (mm)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="4800" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dimensions.width"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Width (mm)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1850" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dimensions.height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (mm)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1450" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dimensions.wheelbase"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Wheelbase (mm)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="2800" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Weight and Fuel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="1500" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fuelType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fuel Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Petrol, Diesel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fuelCapacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fuel Capacity (L)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="60" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Features and Colors */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Features (comma-separated)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Sunroof, Leather Seats, Navigation"
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
                name="colorsAvailable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Colors (comma-separated)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Red, Blue, Black, White"
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
                        placeholder="Luxury, Electric, Performance"
                        value={field.value?.join(", ") || ""}
                        onChange={(e) => field.onChange(e.target.value.split(", ").filter(Boolean))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* SEO Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">SEO Fields</h3>
              <FormField
                control={form.control}
                name="seo.metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Title</FormLabel>
                    <FormControl>
                      <Input placeholder="SEO title for the model" {...field} />
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
                        placeholder="SEO description for the model"
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
                        placeholder="car, model, sedan, 2024"
                        value={field.value?.join(", ") || ""}
                        onChange={(e) => field.onChange(e.target.value.split(", ").filter(Boolean))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* File Uploaders */}
            <div className="space-y-4">
              {/* Thumbnail */}
              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <ThumbnailUploader
                    initialThumbnail={thumbnail}
                    onChange={setThumbnail}
                    label="Upload Model Thumbnail"
                  />
                </FormControl>
                <FormDescription>
                  This will be the main image for your car model
                </FormDescription>
                <FormMessage>{!thumbnail && "Thumbnail is required"}</FormMessage>
              </FormItem>

              {/* Images */}
              <FormItem>
                <FormLabel>Model Images</FormLabel>
                <FormControl>
                  <ImageUploader
                    initialImages={images}
                    onChange={setImages}
                    maxFiles={10}
                    label="Upload Model Images"
                  />
                </FormControl>
                <FormDescription>
                  Upload additional model images (up to 10)
                </FormDescription>
              </FormItem>

              {/* Videos */}
              <FormItem>
                <FormLabel>Model Videos</FormLabel>
                <FormControl>
                  <VideoUploader
                    initialVideos={videos}
                    onChange={setVideos}
                    maxFiles={5}
                    label="Upload Model Videos"
                  />
                </FormControl>
                <FormDescription>
                  Upload model videos (up to 5)
                </FormDescription>
              </FormItem>

              {/* Spec Sheet */}
              <FormItem>
                <FormLabel>Specification Sheet</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Spec sheet URL"
                    value={specSheet || ""}
                    onChange={(e) => setSpecSheet(e.target.value)}
                  />
                </FormControl>
                <FormDescription>Provide a URL for the specification sheet PDF</FormDescription>
              </FormItem>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/car-models")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Saving..."
                  : isEditing
                  ? "Update Model"
                  : "Create Model"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}