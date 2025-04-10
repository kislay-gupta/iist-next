"use client";

import { useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

import { Loader2 } from "lucide-react";
import * as z from "zod";

const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" })
      .max(50, { message: "Name must not exceed 50 characters" }),
    email: z.string().email({ message: "Invalid email address" }).toLowerCase(),
    number: z.string().nonempty({ message: "Phone number is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedData = SignUpSchema.parse(formData);
      setIsSubmitting(true);
      const formDataToSend = new FormData();
      formDataToSend.append("req_data", "createUser");
      formDataToSend.append("name", parsedData.name);
      formDataToSend.append("email", parsedData.email);
      formDataToSend.append("number", parsedData.number);
      formDataToSend.append("password", parsedData.password);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}users`,
        formDataToSend,
      );

      toast.success(response.data.text);
      router.replace(`/verify-otp/${response.data.data.user_id}`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Sign up failed");
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error("Error while signing up user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className=" my-auto grid grid-cols-2 gap-2 text-black">
      <div>
        <label>Full Name</label>
        <Input
          name="name"
          placeholder="John Doe"
          className="text-black"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Email</label>
        <Input
          name="email"
          type="email"
          placeholder="john.doe@example.com"
          className="text-black"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="col-span-full">
        <label>Phone Number</label>
        <Input
          name="number"
          placeholder="1234567890"
          className="text-black"
          value={formData.number}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Password</label>
        <Input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          className="text-black"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Confirm Password</label>
        <Input
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          className="text-black"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col items-start gap-1">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <span className="text-sm">Show Password</span>
        </label>
        {formData.confirmPassword && (
          <p
            className={
              formData.password === formData.confirmPassword
                ? "text-sm text-green-600"
                : "text-sm text-red-600"
            }
          >
            {formData.password === formData.confirmPassword
              ? "Passwords match"
              : "Passwords do not match"}
          </p>
        )}
      </div>
      <div className="col-span-full">
        <Button onClick={onSubmit} className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Please wait...
            </>
          ) : (
            "Sign up"
          )}
        </Button>
      </div>
    </form>
  );
}
