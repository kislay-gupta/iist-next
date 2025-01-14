"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import useLoader from "@/hooks/use-loader";
import Loader from "../shared/Loader";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, User, Phone, Building2, MessageSquare, Send } from "lucide-react";

// Define the API response type
interface ApiResponse {
  text: string;
}

// Define the error response type
interface ApiErrorResponse {
  text: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  number: z.string().min(10, "Phone number must be at least 10 digits"),
  reason: z.string().min(1, "Please select a reason for contact"),
  institution: z.string().min(2, "Institution name is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  req_data: z.string().min(1, "Please select a reason for contact"),
});

type ContactFormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const { isLoading, startLoading, stopLoading } = useLoader();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      number: "",
      email: "",
      reason: "",
      institution: "",
      message: "",
      req_data: "SubmitContactFrom",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    startLoading();
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post<ApiResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}siteData`,
        formData
      );

      form.reset({
        name: "",
        number: "",
        email: "",
        reason: "",
        institution: "",
        message: "",
        req_data: "SubmitContactFrom",
      });
      toast.success(response.data.text || "Message sent successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const typedError = error as AxiosError<ApiErrorResponse>;
        console.error("Full error object:", typedError);
        console.error("Error response:", typedError.response?.data);
        console.error("Error status:", typedError.response?.status);
        toast.error(
          typedError.response?.data?.text ||
            "Failed to send message. Please try again."
        );
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      stopLoading();
    }
  };

  if (isLoading) return <Loader />;
  return (
    <Card className="w-full max-w-4xl mx-auto">
      
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
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input className="pl-10" placeholder="Enter your name" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input className="pl-10" placeholder="Enter your email" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input className="pl-10" placeholder="Enter your phone number" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Contact</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="pl-10">
                          <div className="absolute left-3 top-3">
                            <MessageSquare className="h-4 w-4 text-gray-500" />
                          </div>
                          <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="customer-Project">Customer Project</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="institution"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Institution Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                        <Input className="pl-10" placeholder="Enter your institution name" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Type your message here" 
                        className="min-h-[120px] resize-none" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-center mt-6">
              <Button 
                type="submit" 
                className="w-full md:w-auto px-8 py-2 bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
