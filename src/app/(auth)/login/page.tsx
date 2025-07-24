"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAppContext } from "@/context/app.context";
import Button from "@/components/generic/Button";
import Input from "@/components/generic/Input";
import { loginAction } from "@/app/actions/loginAction";

/**
 * Login page that allows users to log in with their email and password.
 * @returns Login page component that allows users to log in with their email and password.
 */
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setState } = useAppContext();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const validate = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const { data } = await loginAction({ email, password });
        if (data) {
          setState("userType", data.user_type);
          setState("userName", data.user_name);
        }
        router.replace("/dashboard");
      } catch (error) {
        throw error;
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-10 rounded-xl w-full max-w-sm"
        noValidate
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome</h2>
          <p className="text-gray-500 text-sm mt-1">Login to your account</p>
        </div>

        <div className="space-y-5">
          <Input
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            error={errors.email}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            error={errors.password}
          />
        </div>

        <Button className="w-full mt-6 mb-3" variant="default" type="submit">
          Log In
        </Button>

        <p className="text-center text-gray-500 text-sm mb-2">or</p>
        <Link href="/register">
          <Button className="w-full" variant="outline" type="button">
            Register
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
