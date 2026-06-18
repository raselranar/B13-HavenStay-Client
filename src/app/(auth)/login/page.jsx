// src/app/login/page.js
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Handle Form Submission
  const onSubmit = async (values) => {
    setError("");
    setLoading(true);

    try {
      const { data, error: authError } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        dontRemember: !values.rememberMe,
      });

      if (authError) {
        setError(authError.message || "Invalid credentials. Please try again.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Social Login Functionality [cite: 24]
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f0f3ff] p-4">
      {/* Top Brand Logo */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primary tracking-wide">
          HavenStay
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Welcome back. Secure access to your premium stays.
        </p>
      </div>

      {/* Main Login Box */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xs border border-gray-100 p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-1">
          Login to Account
        </h2>
        <p className="text-xs text-gray-500 mb-6">
          Enter your credentials to manage your bookings.
        </p>

        {error && (
          <div className="mb-4 text-xs bg-red-50 text-red-600 p-3 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email input field */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-gray-400 size-4" />
              <input
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="name@company.com"
                className={`w-full text-sm pl-10 pr-4 py-2.5 bg-white border rounded-xl outline-none focus:border-primary transition-colors text-gray-900 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-[11px] text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password input field */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-gray-700">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[11px] font-bold text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-gray-400 size-4" />
              <input
                {...register("password", { required: "Password is required" })}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full text-sm pl-10 pr-10 py-2.5 bg-white border rounded-xl outline-none focus:border-primary transition-colors text-gray-900 ${
                  errors.password
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors">
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-[11px] text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember me option */}
          <div className="flex items-center gap-2 pt-1">
            <input
              {...register("rememberMe")}
              type="checkbox"
              id="remember"
              className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label
              htmlFor="remember"
              className="text-xs text-gray-500 select-none cursor-pointer">
              Remember me for 30 days
            </label>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/80 disabled:bg-indigo-400 text-white font-medium text-sm py-2.5 rounded-xl transition-colors mt-2 cursor-pointer">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Separator UI element */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <span className="relative bg-white px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Or continue with
          </span>
        </div>

        {/* Google OAuth Trigger Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium text-sm py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer">
          <svg className="size-4" viewBox="0 0 24 24" width="16" height="16">
            <path
              fill="#EA4335"
              d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
            />
            <path
              fill="#4285F4"
              d="M23.455 12.273c0-.818-.073-1.609-.209-2.364H12v4.477h6.432a5.505 5.505 0 0 1-2.386 3.614v3.009h3.836c2.245-2.073 3.573-5.114 3.573-8.736Z"
            />
            <path
              fill="#FBBC05"
              d="M5.266 14.235A7.115 7.115 0 0 1 4.909 12c0-.79.132-1.555.357-2.265L1.24 6.62A11.934 11.934 0 0 0 0 12c0 1.927.455 3.745 1.255 5.373l4.011-3.138Z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.955-1.073 7.936-2.918l-3.836-3.009c-1.064.714-2.427 1.141-4.1 1.141-3.164 0-5.845-2.136-6.805-5.018L1.184 17.34A11.944 11.944 0 0 0 12 24Z"
            />
          </svg>
          Sign in with Google
        </button>
      </div>

      {/* Alternate action link */}
      <p className="text-xs text-gray-500 mt-6">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-bold text-primary hover:underline">
          Register
        </Link>
      </p>
    </main>
  );
}
