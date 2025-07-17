// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Switch } from "@/components/ui/switch";
// import axiosInstance from "@/lib/axiosInstance";
// import { toast } from "sonner";
// import ThumbnailUploader from "../helper/thumbnail-uploader";
// import ImageUploader from "../helper/image-uploader";
// import VideoUploader from "../helper/video-uploader";
// import ReactSelect from 'react-select';

// const productSchema = z.object({
//   name: z.string().min(2, { message: "Name must be at least 2 characters" }),
//   slug: z.string().optional(),
//   sku: z.string().optional(),
//   barcode: z.string().optional(),
//   // brand: z.string().optional(),
//   googleProductCategory: z.string().optional(),
  
//   flowerType: z.enum(["roses", "tulips", "lilies", "orchids", "peonies","carnations","daisies","mix","others"]).optional(),

//   category: z.string().min(1, { message: "Category is required" }),
//   mrp: z.coerce.number().min(0, { message: "MRP must be a positive number" }),
//   price: z.coerce.number().min(0, { message: "Price must be a positive number" }),
//   costPrice: z.coerce.number().min(0, { message: "Cost price must be a positive number" }).optional(),
//   stock: z.coerce.number().int().min(0, { message: "Stock must be a positive integer" }),
//   lowStockThreshold: z.coerce.number().int().min(0).default(5),
//   shortDescription: z.string().min(1, { message: "Short description is required" }),
//   description: z.string().min(1, { message: "Description is required" }),
//   thumbnail: z.string().min(1, { message: "Thumbnail is required" }),
//   images: z.array(z.string()).optional(),
//   videos: z.array(z.string()).optional(),
//   priority: z.coerce.number().int().min(0).default(0),
//   status: z.enum(["active", "draft", "unpublished", "discontinued"]).default("draft"),
//   featured: z.boolean().default(false),
//   isArtificial: z.boolean().default(false),
//   tags: z.array(z.string()).optional(),

//   variants: z.array(
//     z.object({
//       name: z.string().optional(),
//       sku: z.string().optional(),
//       price: z.coerce.number().min(0).optional(),
//       stock: z.coerce.number().int().min(0).optional(),
//       attributes: z.record(z.string()).optional(),
//     })
//   ).optional(),
//   seo: z.object({
//     title: z.string().optional(),
//     description: z.string().optional(),
//     keywords: z.array(z.string()).optional(),
//   }).optional(),
//   // specifications: z.record(z.string()).optional(),
//   allowBackorders: z.boolean().default(false),
//   metadata: z.record(z.any()).optional(),
// });

// export function ProductForm({ product, isEditing = false }) {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [thumbnail, setThumbnail] = useState(product?.thumbnail || "");
//   const [images, setImages] = useState(product?.images || []);
//   const [videos, setVideos] = useState(product?.videos || []);
//   const [categories, setCategories] = useState([]);
//   const [makes, setMakes] = useState([]);
//   const [carmodels, setCarmodels] = useState([]);
//   const [manufacturers, setManufacturers] = useState([]);
//   const [isLoadingCategories, setIsLoadingCategories] = useState(true);
//   const [isLoadingMakes, setIsLoadingMakes] = useState(true);
//   const [isLoadingModels, setIsLoadingModels] = useState(true);
//   const [isLoadingManufacturers, setIsLoadingManufacturers] = useState(true);
//   const [tagInput, setTagInput] = useState("");
//   const [specKey, setSpecKey] = useState("");
//   const [specValue, setSpecValue] = useState("");



//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const [categoriesRes, makesRes, modelsRes, manufacturersRes] = await Promise.all([
//           axiosInstance.get("/categories"),
        
//         ]);
//         setCategories(categoriesRes.data?.categories || []);

//       } catch (error) {
//         console.error("Failed to load data:", error);
//         toast.error("Failed to load data. Please refresh the page.");
//       } finally {
//         setIsLoadingCategories(false);
      
//       }
//     }
//     fetchData();
//   }, []);

//   const form = useForm({
//     resolver: zodResolver(productSchema),
//     defaultValues: {
//       name: product?.name || "",
//       slug: product?.slug || "",
//       sku: product?.sku || "",
//       barcode: product?.barcode || "",
//       // brand: product?.brand || "",
//       googleProductCategory: product?.googleProductCategory || "",
    
//      flowerType: product?.flowerType || undefined,
    
//       category: product?.category?._id?.toString() || product?.category || "",
//       mrp: product?.mrp || 0,
//       price: product?.price || 0,
//       costPrice: product?.costPrice || 0,
//       stock: product?.stock || 0,
//       lowStockThreshold: product?.lowStockThreshold || 5,
//       shortDescription: product?.shortDescription || "",
//       description: product?.description || "",
//       thumbnail: product?.thumbnail || "",
//       images: product?.images || [],
//       videos: product?.videos || [],
//       priority: product?.priority || 0,
//       status: product?.status || "draft",
//       featured: product?.featured || false,
//       isArtificial: product?.isArtificial || false,
//       tags: product?.tags || [],
//       // dimensions: product?.dimensions || {
//       //   length: 0,
//       //   width: 0,
//       //   height: 0,
//       //   unit: "cm",
//       // },
//       // weight: product?.weight || {
//       //   value: 0,
//       //   unit: "kg",
//       // },
//       // variants: product?.variants || [],
//       seo: product?.seo || {
//         title: "",
//         description: "",
//         keywords: [],
//       },
//       // specifications: product?.specifications || {},
//       allowBackorders: product?.allowBackorders || false,
//       metadata: product?.metadata || {},
//     },
//   });


//   const addTag = () => {
//     if (tagInput.trim() && !form.getValues("tags")?.includes(tagInput.trim())) {
//       const currentTags = form.getValues("tags") || [];
//       form.setValue("tags", [...currentTags, tagInput.trim()]);
//       setTagInput("");
//     }
//   };

//   const removeTag = (tag) => {
//     const currentTags = form.getValues("tags") || [];
//     form.setValue(
//       "tags",
//       currentTags.filter((t) => t !== tag)
//     );
//   };

//   // const addSpecification = () => {
//   //   if (specKey.trim() && specValue.trim()) {
//   //     const currentSpecs = form.getValues("specifications") || {};
//   //     form.setValue("specifications", {
//   //       ...currentSpecs,
//   //       [specKey.trim()]: specValue.trim(),
//   //     });
//   //     setSpecKey("");
//   //     setSpecValue("");
//   //   }
//   // };

//   // const removeSpecification = (key) => {
//   //   const currentSpecs = form.getValues("specifications") || {};
//   //   const { [key]: _, ...rest } = currentSpecs;
//   //   form.setValue("specifications", rest);
//   // };

//   async function onSubmit(data) {
//     if (!thumbnail) {
//       toast.error("Thumbnail is required");
//       form.setError("thumbnail", { message: "Thumbnail is required" });
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const processedData = {
//         ...data,
//         thumbnail,
//         images,
//         videos,
//         tags: data.tags || [],
     
//       };

//       console.log("Submitting data:", processedData);

//       let result;
//       if (isEditing && product?._id) {
//         result = await axiosInstance.put(`/products/${product._id.toString()}`, processedData);
//       } else {
//         result = await axiosInstance.post(`/products`, processedData);
//       }

//       if (result.data.success) {
//         toast.success(isEditing ? "Product updated" : "Product created");
//         router.push("/admin/products");
//       } else {
//         toast.error(result.data.error || "Something went wrong");
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//       toast.error(error.response?.data?.error || "An unexpected error occurred");
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   const errors = form.formState.errors;
//   useEffect(() => {
//     if (Object.keys(errors).length > 0) {
//       console.log("Form validation errors:", errors);
//       Object.entries(errors).forEach(([field, error]) => {
//         toast.error(`${field}: ${error.message || "Invalid value"}`);
//       });
//     }
//   }, [errors]);

//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <CardTitle>{isEditing ? "Edit Product" : "Add New Product"}</CardTitle>
//         <CardDescription>
//           {isEditing ? "Update the product information below" : "Fill in the details to create a new product"}
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <Tabs defaultValue="basic" className="w-full">
//               <TabsList className="grid grid-cols-5 mb-4">
//                 <TabsTrigger value="basic">Basic Info</TabsTrigger>
//                 <TabsTrigger value="pricing">Pricing & Inventory</TabsTrigger>
//                 <TabsTrigger value="media">Media</TabsTrigger>
//                 <TabsTrigger value="details">Details & Specs</TabsTrigger>
//                 <TabsTrigger value="seo">SEO & Advanced</TabsTrigger>
//               </TabsList>

//               <TabsContent value="basic" className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <FormField
//                     control={form.control}
//                     name="name"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Name*</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Product name" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="slug"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Slug</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="product-slug (leave empty to auto-generate)"
//                             {...field}
//                             value={field.value || ""}
//                           />
//                         </FormControl>
//                         <FormDescription>Leave empty to auto-generate from name</FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="sku"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>SKU</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="SKU (Stock Keeping Unit)"
//                             {...field}
//                             value={field.value || ""}
//                           />
//                         </FormControl>
//                         <FormDescription>Leave empty to auto-generate</FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="barcode"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Barcode</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="UPC, EAN, ISBN, etc."
//                             {...field}
//                             value={field.value || ""}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   {/* <FormField
//                     control={form.control}
//                     name="brand"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Brand</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="Brand name"
//                             {...field}
//                             value={field.value || ""}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   /> */}
//                   <FormField
//                     control={form.control}
//                     name="googleProductCategory"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Google Product Category</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="Google product category"
//                             {...field}
//                             value={field.value || ""}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="category"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Category*</FormLabel>
//                         <Select
//                           onValueChange={field.onChange}
//                           value={field.value}
//                           disabled={isLoadingCategories || categories.length === 0}
//                         >
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue placeholder="Select a category" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             {categories.length === 0 ? (
//                               <SelectItem value="no-categories-placeholder" disabled>
//                                 No categories available
//                               </SelectItem>
//                             ) : (
//                               categories.map((category, index) => (
//                                 <SelectItem
//                                   key={category._id ? category._id.toString() : `category-${index}`}
//                                   value={category._id ? category._id.toString() : `placeholder-${index}`}
//                                 >
//                                   {category.name}
//                                 </SelectItem>
//                               ))
//                             )}
//                           </SelectContent>
//                         </Select>
//                         {isLoadingCategories && (
//                           <p className="text-sm text-muted-foreground">Loading categories...</p>
//                         )}
//                         {!isLoadingCategories && categories.length === 0 && (
//                           <p className="text-sm text-destructive">
//                             No categories available. Please{" "}
//                             <a href="/admin/categories/new" className="underline">
//                               create a category
//                             </a>{" "}
//                             first
//                           </p>
//                         )}
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="status"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Status*</FormLabel>
//                         <Select
//                           onValueChange={field.onChange}
//                           value={field.value}
//                         >
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue placeholder="Select a status" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             <SelectItem value="active">Active</SelectItem>
//                             <SelectItem value="draft">Draft</SelectItem>
//                             <SelectItem value="unpublished">Unpublished</SelectItem>
//                             <SelectItem value="discontinued">Discontinued</SelectItem>
//                           </SelectContent>
//                         </Select>
//                         <FormDescription>Only active products are displayed on the site</FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="featured"
//                     render={({ field }) => (
//                       <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                         <div className="space-y-0.5">
//                           <FormLabel className="text-base">Featured Product</FormLabel>
//                           <FormDescription>
//                             Featured products appear in special sections on the site
//                           </FormDescription>
//                         </div>
//                         <FormControl>
//                           <Switch
//                             checked={field.value}
//                             onCheckedChange={field.onChange}
//                           />
//                         </FormControl>
//                       </FormItem>
//                     )}
//                   />
                
        
//                   <FormField
//                     control={form.control}
//                     name="flowerType"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Flower Type</FormLabel>
//                         <Select
//                           onValueChange={field.onChange}
//                           value={field.value}
//                         >
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue placeholder="Select Flower" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             <SelectItem value="roses">Roses</SelectItem>
//                             <SelectItem value="tulips">Tulips</SelectItem>
//                             <SelectItem value="lilies">Lilies</SelectItem>
//                             <SelectItem value="orchids">Orchids</SelectItem>
//                             <SelectItem value="peonies">Peonies</SelectItem>
//                             <SelectItem value="carnations">Carnations</SelectItem>
//                             <SelectItem value="daisies">Daisies</SelectItem>
//                             <SelectItem value="mix">Mix</SelectItem>
//                             <SelectItem value="others">Others</SelectItem>
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
           
//                 </div>
//                 <FormField
//                   control={form.control}
//                   name="shortDescription"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Short Description*</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           placeholder="Brief description of the product"
//                           className="resize-none"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="description"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Full Description*</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           placeholder="Detailed description of the product"
//                           className="resize-none min-h-[150px]"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </TabsContent>

//               <TabsContent value="pricing" className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <FormField
//                     control={form.control}
//                     name="mrp"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>MRP*</FormLabel>
//                         <FormControl>
//                           <Input
//                             type="number"
//                             step="0.01"
//                             placeholder="0.00"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormDescription>Manufacturer's Recommended Price</FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="price"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Selling Price*</FormLabel>
//                         <FormControl>
//                           <Input
//                             type="number"
//                             step="0.01"
//                             placeholder="0.00"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="costPrice"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Cost Price</FormLabel>
//                         <FormControl>
//                           <Input
//                             type="number"
//                             step="0.01"
//                             placeholder="0.00"
//                             {...field}
//                             value={field.value || ""}
//                           />
//                         </FormControl>
//                         <FormDescription>Your purchase cost (for profit calculations)</FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="stock"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Stock*</FormLabel>
//                         <FormControl>
//                           <Input type="number" placeholder="0" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="lowStockThreshold"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Low Stock Threshold</FormLabel>
//                         <FormControl>
//                           <Input type="number" placeholder="5" {...field} />
//                         </FormControl>
//                         <FormDescription>Alert when stock falls below this number</FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="allowBackorders"
//                     render={({ field }) => (
//                       <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                         <div className="space-y-0.5">
//                           <FormLabel className="text-base">Allow Backorders</FormLabel>
//                           <FormDescription>
//                             Allow customers to order even when out of stock
//                           </FormDescription>
//                         </div>
//                         <FormControl>
//                           <Switch
//                             checked={field.value}
//                             onCheckedChange={field.onChange}
//                           />
//                         </FormControl>
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="priority"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Display Priority</FormLabel>
//                         <FormControl>
//                           <Input type="number" placeholder="0" {...field} />
//                         </FormControl>
//                         <FormDescription>Higher numbers appear first in listings</FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </TabsContent>

//               <TabsContent value="media" className="space-y-6">
//                 <div className="space-y-4">
//                   <FormField
//                     control={form.control}
//                     name="thumbnail"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Thumbnail*</FormLabel>
//                         <FormControl>
//                           <ThumbnailUploader
//                             initialThumbnail={thumbnail || undefined}
//                             onChange={(value) => {
//                               setThumbnail(value);
//                               field.onChange(value);
//                             }}
//                             label="Upload Product Thumbnail"
//                           />
//                         </FormControl>
//                         <FormDescription>This will be the main image for your product</FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormItem>
//                     <FormLabel>Product Images</FormLabel>
//                     <FormControl>
//                       <ImageUploader
//                         initialImages={images}
//                         onChange={setImages}
//                         maxFiles={10}
//                         label="Upload Product Images"
//                       />
//                     </FormControl>
//                     <FormDescription>Upload additional product images (up to 10)</FormDescription>
//                   </FormItem>
//                   <FormItem>
//                     <FormLabel>Product Videos</FormLabel>
//                     <FormControl>
//                       <VideoUploader
//                         initialVideos={videos}
//                         onChange={setVideos}
//                         maxFiles={5}
//                         label="Upload Product Videos"
//                       />
//                     </FormControl>
//                     <FormDescription>Upload product videos (up to 5)</FormDescription>
//                   </FormItem>
//                 </div>
//               </TabsContent>

//               <TabsContent value="details" className="space-y-6">
//                 {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-medium">Dimensions</h3>
//                     <div className="grid grid-cols-3 gap-4">
//                       <FormField
//                         control={form.control}
//                         name="dimensions.length"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Length</FormLabel>
//                             <FormControl>
//                               <Input
//                                 type="number"
//                                 step="0.01"
//                                 placeholder="0"
//                                 {...field}
//                                 value={field.value || ""}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="dimensions.width"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Width</FormLabel>
//                             <FormControl>
//                               <Input
//                                 type="number"
//                                 step="0.01"
//                                 placeholder="0"
//                                 {...field}
//                                 value={field.value || ""}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="dimensions.height"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Height</FormLabel>
//                             <FormControl>
//                               <Input
//                                 type="number"
//                                 step="0.01"
//                                 placeholder="0"
//                                 {...field}
//                                 value={field.value || ""}
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                     </div>
//                     <FormField
//                       control={form.control}
//                       name="dimensions.unit"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Unit</FormLabel>
//                           <Select
//                             onValueChange={field.onChange}
//                             value={field.value}
//                           >
//                             <FormControl>
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select unit" />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                               <SelectItem value="cm">Centimeters (cm)</SelectItem>
//                               <SelectItem value="in">Inches (in)</SelectItem>
//                               <SelectItem value="mm">Millimeters (mm)</SelectItem>
//                               <SelectItem value="m">Meters (m)</SelectItem>
//                             </SelectContent>
//                           </Select>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                   <div className="space-y-4">
//                     <h3 className="text-lg font-medium">Weight</h3>
//                     <FormField
//                       control={form.control}
//                       name="weight.value"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Weight</FormLabel>
//                           <FormControl>
//                             <Input
//                               type="number"
//                               step="0.01"
//                               placeholder="0"
//                               {...field}
//                               value={field.value || ""}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="weight.unit"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Unit</FormLabel>
//                           <Select
//                             onValueChange={field.onChange}
//                             value={field.value}
//                           >
//                             <FormControl>
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select unit" />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                               <SelectItem value="kg">Kilograms (kg)</SelectItem>
//                               <SelectItem value="g">Grams (g)</SelectItem>
//                               <SelectItem value="lb">Pounds (lb)</SelectItem>
//                               <SelectItem value="oz">Ounces (oz)</SelectItem>
//                             </SelectContent>
//                           </Select>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 </div> */}

// <FormField
//   control={form.control}
//   name="isArtificial"
//   render={({ field }) => (
//     <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//       <div className="space-y-0.5">
//         <FormLabel className="text-base">Is the product artificial?</FormLabel>
//         <FormDescription>
//           Indicates whether the flower is artificial or natural.
//         </FormDescription>
//       </div>
//       <FormControl>
//         <Switch
//           checked={field.value}
//           onCheckedChange={field.onChange}
//         />
//       </FormControl>
//     </FormItem>
//   )}
// />

                
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-medium">Tags</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {form.getValues("tags")?.map((tag, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
//                       >
//                         {tag}
//                         <button
//                           type="button"
//                           className="ml-2 text-secondary-foreground/70 hover:text-secondary-foreground"
//                           onClick={() => removeTag(tag)}
//                         >
//                           ×
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="flex gap-2">
//                     <Input
//                       value={tagInput}
//                       onChange={(e) => setTagInput(e.target.value)}
//                       placeholder="Add a tag"
//                       onKeyDown={(e) => {
//                         if (e.key === "Enter") {
//                           e.preventDefault();
//                           addTag();
//                         }
//                       }}
//                     />
//                     <Button type="button" onClick={addTag} variant="secondary">
//                       Add
//                     </Button>
//                   </div>
//                 </div>
//                 {/* <div className="space-y-4">
//                   <h3 className="text-lg font-medium">Specifications</h3>
//                   <div className="space-y-2">
//                     {Object.entries(form.getValues("specifications") || {}).map(([key, value]) => (
//                       <div
//                         key={key}
//                         className="flex items-center justify-between bg-secondary/50 px-3 py-2 rounded-md"
//                       >
//                         <div>
//                           <span className="font-medium">{key}:</span> {value}
//                         </div>
//                         <button
//                           type="button"
//                           className="text-destructive hover:text-destructive/70"
//                           onClick={() => removeSpecification(key)}
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
//                     <Input
//                       value={specKey}
//                       onChange={(e) => setSpecKey(e.target.value)}
//                       placeholder="Specification name"
//                     />
//                     <Input
//                       value={specValue}
//                       onChange={(e) => setSpecValue(e.target.value)}
//                       placeholder="Specification value"
//                     />
//                     <Button
//                       type="button"
//                       onClick={addSpecification}
//                       variant="secondary"
//                     >
//                       Add Specification
//                     </Button>
//                   </div>
//                 </div> */}
//               </TabsContent>

//               <TabsContent value="seo" className="space-y-6">
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-medium">SEO Information</h3>
//                   <FormField
//                     control={form.control}
//                     name="seo.title"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Meta Title</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="SEO title (leave empty to use product name)"
//                             {...field}
//                             value={field.value || ""}
//                           />
//                         </FormControl>
//                         <FormDescription>Recommended length: 50-60 characters</FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="seo.description"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Meta Description</FormLabel>
//                         <FormControl>
//                           <Textarea
//                             placeholder="SEO description (leave empty to use short description)"
//                             className="resize-none"
//                             {...field}
//                             value={field.value || ""}
//                           />
//                         </FormControl>
//                         <FormDescription>Recommended length: 150-160 characters</FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <div className="space-y-2">
//                     <FormLabel>Meta Keywords</FormLabel>
//                     <div className="flex flex-wrap gap-2">
//                       {form.getValues("seo.keywords")?.map((keyword, index) => (
//                         <div
//                           key={index}
//                           className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
//                         >
//                           {keyword}
//                           <button
//                             type="button"
//                             className="ml-2 text-secondary-foreground/70 hover:text-secondary-foreground"
//                             onClick={() => {
//                               const currentKeywords = form.getValues("seo.keywords") || [];
//                               form.setValue(
//                                 "seo.keywords",
//                                 currentKeywords.filter((_, i) => i !== index)
//                               );
//                             }}
//                           >
//                             ×
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="flex gap-2">
//                       <Input
//                         placeholder="Add a keyword"
//                         onKeyDown={(e) => {
//                           if (e.key === "Enter") {
//                             e.preventDefault();
//                             const value = e.currentTarget.value.trim();
//                             if (value) {
//                               const currentKeywords = form.getValues("seo.keywords") || [];
//                               if (!currentKeywords.includes(value)) {
//                                 form.setValue("seo.keywords", [...currentKeywords, value]);
//                                 e.currentTarget.value = "";
//                               }
//                             }
//                           }
//                         }}
//                       />
//                       <Button
//                         type="button"
//                         variant="secondary"
//                         onClick={(e) => {
//                           const input = e.currentTarget.previousElementSibling;
//                           const value = input.value.trim();
//                           if (value) {
//                             const currentKeywords = form.getValues("seo.keywords") || [];
//                             if (!currentKeywords.includes(value)) {
//                               form.setValue("seo.keywords", [...currentKeywords, value]);
//                               input.value = "";
//                             }
//                           }
//                         }}
//                       >
//                         Add
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </TabsContent>
//             </Tabs>
//             <div className="flex justify-end space-x-4">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => router.push("/admin/products")}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit" disabled={isSubmitting}>
//                 {isSubmitting ? "Saving..." : isEditing ? "Update Product" : "Create Product"}
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// }

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import axiosInstance from "@/lib/axiosInstance"
import { toast } from "sonner"
import ThumbnailUploader from "../helper/thumbnail-uploader"
import ImageUploader from "../helper/image-uploader"
import VideoUploader from "../helper/video-uploader"
import { Plus, Trash } from "lucide-react";


const productSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  slug: z.string().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  googleProductCategory: z.string().optional(),
  flowerType: z
    .enum(["roses", "tulips", "lilies", "orchids", "peonies", "carnations", "daisies", "mix", "others"])
    .optional(),
  occasion: z.array(z.string()).optional(),
  color: z.array(z.string()).optional(),
  fragranceLevel: z.enum(["low", "medium", "strong"]).optional(),
  category: z.string().min(1, { message: "Category is required" }),
  mrp: z.coerce.number().min(0, { message: "MRP must be a positive number" }),
  redeemPoints: z
  .coerce
  .number()
  .min(0, { message: "Redeem points must be a positive number" })
  .optional(),
  price: z.coerce.number().min(0, { message: "Price must be a positive number" }),
  costPrice: z.coerce.number().min(0, { message: "Cost price must be a positive number" }).optional(),
  stock: z.coerce.number().int().min(0, { message: "Stock must be a positive integer" }),
  lowStockThreshold: z.coerce.number().int().min(0).default(5),
  shortDescription: z.string().min(1, { message: "Short description is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  giftSetOptions: z.string().min(1, { message: "Gift Set Options is required" }).optional(),
  deliveryInformation: z.string().min(1, { message: "Delivery Information is required" }).optional(),
  careInstructions: z.string().min(1, { message: "Care Instructions is required" }).optional(),
  thumbnail: z.string().min(1, { message: "Thumbnail is required" }),
  images: z.array(z.string()).optional(),
  videos: z.array(z.string()).optional(),
  priority: z.coerce.number().int().min(0).default(0),
  status: z.enum(["active", "draft", "unpublished", "discontinued"]).default("draft"),
  featured: z.boolean().default(false),
  isArtificial: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  variants: z
  .array(
    z.object({
      size: z.enum(["small", "medium", "large","extra-large"], {
        required_error: "Size is required",
      }),
      price: z.coerce.number().min(0, { message: "Price must be a positive number" }),
      mrp: z.coerce.number().min(0, { message: "MRP must be a positive number" }).optional(),
      costPrice: z.coerce.number().min(0, { message: "Cost Price must be a positive number" }).optional(),
      stock: z.coerce.number().int().min(0, { message: "Stock must be 0 or greater" }).optional(),
    })
  )
  .optional(),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    })
    .optional(),
  allowBackorders: z.boolean().default(false),
  metadata: z.record(z.any()).optional(),
})

export function ProductForm({ product, isEditing = false }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [thumbnail, setThumbnail] = useState(product?.thumbnail || "")
  const [images, setImages] = useState(product?.images || [])
  const [videos, setVideos] = useState(product?.videos || [])
  const [categories, setCategories] = useState([])
  const [makes, setMakes] = useState([])
  const [carmodels, setCarmodels] = useState([])
  const [manufacturers, setManufacturers] = useState([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [isLoadingMakes, setIsLoadingMakes] = useState(true)
  const [isLoadingModels, setIsLoadingModels] = useState(true)
  const [isLoadingManufacturers, setIsLoadingManufacturers] = useState(true)
  const [tagInput, setTagInput] = useState("")
  const [occasionInput, setOccasionInput] = useState("")
  const [colorInput, setColorInput] = useState("")
  const [specKey, setSpecKey] = useState("")
  const [specValue, setSpecValue] = useState("")
  const [showVariantForm, setShowVariantForm] = useState(false);

 



  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesRes, makesRes, modelsRes, manufacturersRes] = await Promise.all([
          axiosInstance.get("/categories"),
        ])
        setCategories(categoriesRes.data?.categories || [])
      } catch (error) {
        console.error("Failed to load data:", error)
        toast.error("Failed to load data. Please refresh the page.")
      } finally {
        setIsLoadingCategories(false)
      }
    }
    fetchData()
  }, [])

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      slug: product?.slug || "",
      sku: product?.sku || "",
      barcode: product?.barcode || "",
      googleProductCategory: product?.googleProductCategory || "",
      flowerType: product?.flowerType || undefined,
      occasion: product?.occasion || [],
      color: product?.color || [],
      fragranceLevel: product?.fragranceLevel || undefined,
      // size: product?.size || undefined,
      category: product?.category?._id?.toString() || product?.category || "",
      mrp: product?.mrp || 0,
      price: product?.price || 0,
      costPrice: product?.costPrice || 0,
      redeemPoints: product?.redeemPoints || 0,
      stock: product?.stock || 0,
      lowStockThreshold: product?.lowStockThreshold || 5,
      shortDescription: product?.shortDescription || "",
      description: product?.description || "",
      giftSetOptions: product?.giftSetOptions || "",
      deliveryInformation: product?.deliveryInformation || "",
      careInstructions: product?.careInstructions || "",
      thumbnail: product?.thumbnail || "",
      images: product?.images || [],
      videos: product?.videos || [],
      priority: product?.priority || 0,
      status: product?.status || "draft",
      featured: product?.featured || false,
      isArtificial: product?.isArtificial || false,
      tags: product?.tags || [],
      variants: product?.variants || [],
      seo: product?.seo || {
        title: "",
        description: "",
        keywords: [],
      },
      allowBackorders: product?.allowBackorders || false,
      metadata: product?.metadata || {},
    },
  })

  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const keywords = form.watch("seo.keywords") || [];


  const addTag = () => {
    if (tagInput.trim() && !form.getValues("tags")?.includes(tagInput.trim())) {
      const currentTags = form.getValues("tags") || []
      form.setValue("tags", [...currentTags, tagInput.trim()])
      setTagInput("")
    }
  }

  const removeTag = (tag) => {
    const currentTags = form.getValues("tags") || []
    form.setValue(
      "tags",
      currentTags.filter((t) => t !== tag),
    )
  }

  const addOccasion = () => {
    if (occasionInput.trim() && !form.getValues("occasion")?.includes(occasionInput.trim())) {
      const currentOccasions = form.getValues("occasion") || []
      form.setValue("occasion", [...currentOccasions, occasionInput.trim()])
      setOccasionInput("")
    }
  }

  const removeOccasion = (occasion) => {
    const currentOccasions = form.getValues("occasion") || []
    form.setValue(
      "occasion",
      currentOccasions.filter((o) => o !== occasion),
    )
  }

  const addColor = () => {
    if (colorInput.trim() && !form.getValues("color")?.includes(colorInput.trim())) {
      const currentColors = form.getValues("color") || []
      form.setValue("color", [...currentColors, colorInput.trim()])
      setColorInput("")
    }
  }

  const removeColor = (color) => {
    const currentColors = form.getValues("color") || []
    form.setValue(
      "color",
      currentColors.filter((c) => c !== color),
    )
  }

  async function onSubmit(data) {
    if (!thumbnail) {
      toast.error("Thumbnail is required")
      form.setError("thumbnail", { message: "Thumbnail is required" })
      return
    }

    setIsSubmitting(true)
    try {
      const processedData = {
        ...data,
        thumbnail,
        images,
        videos,
        tags: data.tags || [],
        occasion: data.occasion || [],
        color: data.color || [],
      }

      console.log("Submitting data:", processedData)

      let result
      if (isEditing && product?._id) {
        result = await axiosInstance.put(`/products/${product._id.toString()}`, processedData)
      } else {
        result = await axiosInstance.post(`/products`, processedData)
      }

      if (result.data.success) {
        toast.success(isEditing ? "Product updated" : "Product created")
        router.push("/admin/products")
      } else {
        toast.error(result.data.error || "Something went wrong")
      }
    } catch (error) {
      console.error("Submission error:", error)
      toast.error(error.response?.data?.error || "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const errors = form.formState.errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Form validation errors:", errors)
      Object.entries(errors).forEach(([field, error]) => {
        toast.error(`${field}: ${error.message || "Invalid value"}`)
      })
    }
  }, [errors])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Product" : "Add New Product"}</CardTitle>
        <CardDescription>
          {isEditing ? "Update the product information below" : "Fill in the details to create a new product"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid grid-cols-5 mb-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="pricing">Pricing & Inventory</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="details">Details & Specs</TabsTrigger>
                <TabsTrigger value="seo">SEO & Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Product name" {...field} />
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
                            placeholder="product-slug (leave empty to auto-generate)"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormDescription>Leave empty to auto-generate from name</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SKU</FormLabel>
                        <FormControl>
                          <Input placeholder="SKU (Stock Keeping Unit)" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormDescription>Leave empty to auto-generate</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="barcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Barcode</FormLabel>
                        <FormControl>
                          <Input placeholder="UPC, EAN, ISBN, etc." {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="googleProductCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Google Product Category</FormLabel>
                        <FormControl>
                          <Input placeholder="Google product category" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isLoadingCategories || categories.length === 0}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.length === 0 ? (
                              <SelectItem value="no-categories-placeholder" disabled>
                                No categories available
                              </SelectItem>
                            ) : (
                              categories.map((category, index) => (
                                <SelectItem
                                  key={category._id ? category._id.toString() : `category-${index}`}
                                  value={category._id ? category._id.toString() : `placeholder-${index}`}
                                >
                                  {category.name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        {isLoadingCategories && <p className="text-sm text-muted-foreground">Loading categories...</p>}
                        {!isLoadingCategories && categories.length === 0 && (
                          <p className="text-sm text-destructive">
                            No categories available. Please{" "}
                            <a href="/admin/categories/new" className="underline">
                              create a category
                            </a>{" "}
                            first
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status*</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="unpublished">Unpublished</SelectItem>
                            <SelectItem value="discontinued">Discontinued</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Only active products are displayed on the site</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Spring Seasonal Collection </FormLabel>
                          <FormDescription>This Collection appear in special sections on the site</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="flowerType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Flower Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Flower" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="roses">Roses</SelectItem>
                            <SelectItem value="tulips">Tulips</SelectItem>
                            <SelectItem value="lilies">Lilies</SelectItem>
                            <SelectItem value="orchids">Orchids</SelectItem>
                            <SelectItem value="peonies">Peonies</SelectItem>
                            <SelectItem value="carnations">Carnations</SelectItem>
                            <SelectItem value="daisies">Daisies</SelectItem>
                            <SelectItem value="mix">Mix</SelectItem>
                            <SelectItem value="others">Others</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fragranceLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fragrance Level</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Fragrance Level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="strong">Strong</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

<div className="flex justify-between items-center">
        <h3 className="text-md font-medium">Product Variants</h3>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() =>
            append({
              size: "",
              price: 0,
              mrp: 0,
              costPrice: 0,
              stock: 0,
            })
          }
        >
          <Plus className="w-4 h-4 mr-1" /> Add Variant
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 border rounded-md p-3 relative">
          {/* Size */}
          <FormField
            control={form.control}
            name={`variants.${index}.size`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                    <SelectItem value="extra-large">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price */}
          <FormField
            control={form.control}
            name={`variants.${index}.price`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Selling Price*</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* MRP */}
          <FormField
            control={form.control}
            name={`variants.${index}.mrp`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>MRP</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="MRP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cost Price */}
          <FormField
            control={form.control}
            name={`variants.${index}.costPrice`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Cost Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Stock */}
          <FormField
            control={form.control}
            name={`variants.${index}.stock`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Stock" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Remove Button */}
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute top-1 right-1 text-red-500 hover:bg-transparent"
            onClick={() => remove(index)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>

                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Short Description*</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Brief description of the product" className="resize-none" {...field} />
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
                      <FormLabel>Full Description*</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detailed description of the product"
                          className="resize-none min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              
              </TabsContent>

              <TabsContent value="pricing" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="mrp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>MRP*</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormDescription>Manufacturer's Recommended Price</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Selling Price*</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="costPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cost Price</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="0.00" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormDescription>Your purchase cost (for profit calculations)</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock*</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
             <FormField
  control={form.control}
  name="redeemPoints"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Redeem Points
        <span className="text-muted-foreground block text-sm font-normal">
          How many redeem points should the user get for this product? <br />
          (Leave blank if none)
        </span>
      </FormLabel>
      <FormControl>
        <Input
          type="number"
          placeholder="e.g. 2"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


                  <FormField
                    control={form.control}
                    name="lowStockThreshold"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Low Stock Threshold</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="5" {...field} />
                        </FormControl>
                        <FormDescription>Alert when stock falls below this number</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="allowBackorders"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Allow Backorders</FormLabel>
                          <FormDescription>Allow customers to order even when out of stock</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Display Priority</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0" {...field} />
                        </FormControl>
                        <FormDescription>Higher numbers appear first in listings</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thumbnail*</FormLabel>
                        <FormControl>
                          <ThumbnailUploader
                            initialThumbnail={thumbnail || undefined}
                            onChange={(value) => {
                              setThumbnail(value)
                              field.onChange(value)
                            }}
                            label="Upload Product Thumbnail"
                          />
                        </FormControl>
                        <FormDescription>This will be the main image for your product</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormLabel>Product Images</FormLabel>
                    <FormControl>
                      <ImageUploader
                        initialImages={images}
                        onChange={setImages}
                        maxFiles={10}
                        label="Upload Product Images"
                      />
                    </FormControl>
                    <FormDescription>Upload additional product images (up to 10)</FormDescription>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Product Videos</FormLabel>
                    <FormControl>
                      <VideoUploader
                        initialVideos={videos}
                        onChange={setVideos}
                        maxFiles={5}
                        label="Upload Product Videos"
                      />
                    </FormControl>
                    <FormDescription>Upload product videos (up to 5)</FormDescription>
                  </FormItem>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-6">
                <FormField
                  control={form.control}
                  name="isArtificial"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Is the product artificial?</FormLabel>
                        <FormDescription>Indicates whether the flower is artificial or natural.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {form.getValues("tags")?.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          className="ml-2 text-secondary-foreground/70 hover:text-secondary-foreground"
                          onClick={() => removeTag(tag)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add a tag"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addTag()
                        }
                      }}
                    />
                    <Button type="button" onClick={addTag} variant="secondary">
                      Add
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Occasions</h3>
                  <div className="flex flex-wrap gap-2">
                    {form.getValues("occasion")?.map((occasion, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                      >
                        {occasion}
                        <button
                          type="button"
                          className="ml-2 text-secondary-foreground/70 hover:text-secondary-foreground"
                          onClick={() => removeOccasion(occasion)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={occasionInput}
                      onChange={(e) => setOccasionInput(e.target.value)}
                      placeholder="Add an occasion (e.g., birthday, anniversary)"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addOccasion()
                        }
                      }}
                    />
                    <Button type="button" onClick={addOccasion} variant="secondary">
                      Add
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {form.getValues("color")?.map((color, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                      >
                        {color}
                        <button
                          type="button"
                          className="ml-2 text-secondary-foreground/70 hover:text-secondary-foreground"
                          onClick={() => removeColor(color)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}
                      placeholder="Add a color (e.g., red, pink, white)"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addColor()
                        }
                      }}
                    />
                    <Button type="button" onClick={addColor} variant="secondary">
                      Add
                    </Button>
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="giftSetOptions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gift Set Options Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detailed description of the product"
                          className="resize-none min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliveryInformation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Information</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detailed description of the product"
                          className="resize-none min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="careInstructions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Care Instructions Information</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detailed description of the product"
                          className="resize-none min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="seo" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">SEO Information</h3>
                  <FormField
                    control={form.control}
                    name="seo.title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="SEO title (leave empty to use product name)"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormDescription>Recommended length: 50-60 characters</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="seo.description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="SEO description (leave empty to use short description)"
                            className="resize-none"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormDescription>Recommended length: 150-160 characters</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel>Meta Keywords</FormLabel>
                    <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword, index) => (
  <div
    key={index}
    className="flex items-center bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
  >
    {keyword}
    <button
      type="button"
      className="ml-2 text-secondary-foreground/70 hover:text-secondary-foreground"
      onClick={() => {
        form.setValue(
          "seo.keywords",
          keywords.filter((_, i) => i !== index),
        );
      }}
    >
      ×
    </button>
  </div>
))}

                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a keyword"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            const value = e.currentTarget.value.trim()
                            if (value) {
                              const currentKeywords = form.getValues("seo.keywords") || []
                              if (!currentKeywords.includes(value)) {
                                form.setValue("seo.keywords", [...currentKeywords, value])
                                e.currentTarget.value = ""
                              }
                            }
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling
                          const value = input.value.trim()
                          if (value) {
                            const currentKeywords = form.getValues("seo.keywords") || []
                            if (!currentKeywords.includes(value)) {
                              form.setValue("seo.keywords", [...currentKeywords, value])
                              input.value = ""
                            }
                          }
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : isEditing ? "Update Product" : "Create Product"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
