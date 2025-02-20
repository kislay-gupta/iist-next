"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const OTPSchema = z.object({
    otp: z.string().length(6, { message: "OTP must be 6 digits" }),
});

type FormData = z.infer<typeof OTPSchema>;

interface VerifyOTPFormProps {
    userId: string;
}

export default function VerifyOTPForm({ userId }: VerifyOTPFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const form = useForm<FormData>({
        resolver: zodResolver(OTPSchema),
        defaultValues: {
            otp: "",
        },
    });

    const onSubmit = async (values: FormData) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("req_data", "otpValidation");
            formData.append("otp", values.otp);
            formData.append("user_id", userId);

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}users`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            toast.success(response.data.text);
            router.replace("/login"); // Redirect to login after successful verification
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message || "OTP verification failed");
            } else {
                toast.error("An unexpected error occurred");
            }
            console.error("Error while verifying OTP:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 text-black"
            >
                <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex justify-between gap-2">
                                    {[...Array(6)].map((_, index) => (
                                        <Input
                                            key={index}
                                            type="text"
                                            maxLength={1}
                                            className="w-12 h-12 text-center text-xl"
                                            value={field.value[index] || ""}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (!/^\d*$/.test(value)) return; // Only allow digits

                                                const newOTP = field.value.split("");
                                                newOTP[index] = value;
                                                field.onChange(newOTP.join(""));

                                                // Auto-focus next input
                                                if (value && index < 5) {
                                                    const nextInput = document.querySelector(
                                                        `input[name="otp-${index + 1}"]`
                                                    ) as HTMLInputElement;
                                                    if (nextInput) nextInput.focus();
                                                }
                                            }}
                                            name={`otp-${index}`}
                                            onKeyDown={(e) => {
                                                // Handle backspace
                                                if (e.key === "Backspace" && !field.value[index] && index > 0) {
                                                    const prevInput = document.querySelector(
                                                        `input[name="otp-${index - 1}"]`
                                                    ) as HTMLInputElement;
                                                    if (prevInput) prevInput.focus();
                                                }
                                            }}
                                        />
                                    ))}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="w-full" disabled={isSubmitting} type="submit">
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 size-4 animate-spin" />
                            Verifying...
                        </>
                    ) : (
                        "Verify OTP"
                    )}
                </Button>
            </form>
        </Form>
    );
}