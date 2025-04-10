"use client";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginModal } from "@/store/use-login-popup-store";
import useLoader from "@/hooks/use-loader";
import axios from "axios";
import toast from "react-hot-toast";

import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPop() {
  const { isLoading, startLoading, stopLoading } = useLoader();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isOpen, onClose } = useLoginModal();
  const router = useRouter();
  const id = useId();
  interface LoginResponse {
    status: boolean;
    text: string;
    session_id?: string;
    userID?: string;
    role?: string;
  }

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    const formData = new FormData();
    formData.append("req_data", "userValidation");
    formData.append("username", email);
    formData.append("password", password);
    startLoading();
    try {
      const response = await axios.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}users`,
        formData,
      );
      if (response.data.status) {
        const { session_id, userID, role } = response.data;

        // Call API to set cookies in the server
        await fetch("/api/auth/set-cookies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id, userID, role }),
        });

        toast.success(response.data.text);
        router.refresh();
        onClose();
        setEmail("");
        setPassword("");
        onClose();
      } else {
        toast(response.data.text);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      stopLoading();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <svg
              className="stroke-zinc-800 dark:stroke-zinc-100"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
            </svg>
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">Welcome back</DialogTitle>
            <DialogDescription className="sm:text-center">
              Enter your credentials to login to your account.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-email`}>Email</Label>
              <Input
                id={`${id}-email`}
                placeholder="hi@yourcompany.com"
                type="email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="*:not-first:mt-2">
              <Label htmlFor={`${id}-password`}>Password</Label>
              <Input
                id={`${id}-password`}
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id={`${id}-remember`}
                checked={showPassword == true}
                onClick={() => setShowPassword(!showPassword)}
              />
              <Label
                htmlFor={`${id}-remember`}
                className="text-muted-foreground font-normal"
              >
                Show password
              </Label>
            </div>
            <a className="text-sm underline hover:no-underline" href="#">
              Forgot password?
            </a>
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <span className="flex gap-1">
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </span>
            ) : (
              <span>Sign in</span>
            )}
          </Button>
        </form>

        <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
          <span className="text-muted-foreground text-xs">Or</span>
        </div>

        <Button variant="outline">Sign Up</Button>
      </DialogContent>
    </Dialog>
  );
}
