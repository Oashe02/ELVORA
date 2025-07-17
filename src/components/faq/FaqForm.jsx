"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from "@/lib/axiosInstance";

const faqSchema = z.object({
  question: z.string().min(2, { message: "Question must be at least 2 characters" }),
  answer: z.string().min(2, { message: "Answer must be at least 2 characters" }),
  isActive: z.boolean().default(true),

});

export default function FaqForm({ faq, isEditing = false }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: faq?.question || "",
      answer: faq?.answer || "",
      isActive: faq?.isActive || true,
   
    },
  });

  async function onSubmit(data) {
    setIsSubmitting(true);
    try {
      let res;
      if (isEditing && faq?._id) {
        res = await axiosInstance.put(`/faq/${faq._id}`, data);
      } else {
        res = await axiosInstance.post("/faq", data);
      }

      if (res.status >= 200 && res.status < 300) {
        toast.success(`Successfully ${isEditing ? "updated" : "created"} FAQ`);
        router.push("/admin/faq");
      } else {
        toast.error(res.data?.error || "Something went wrong");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          {isEditing ? "Edit FAQ" : "Add New FAQ"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium">Question</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your question here..."
                      className="w-full border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium">Answer</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your answer here..."
                      className="w-full h-32 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Input
                      type="checkbox"
                      className="h-5 w-5 border-gray-300 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  </FormControl>
                  <FormLabel className="text-lg font-medium">Active</FormLabel>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                className="px-4 py-2 border-gray-300 rounded-md hover:bg-gray-100"
                onClick={() => router.push("/admin/faq")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
              >
                {isEditing ? "Update FAQ" : "Create FAQ"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}