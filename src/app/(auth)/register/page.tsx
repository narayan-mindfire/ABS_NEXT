"use client";

import { useState } from "react";
import Input from "@/components/generic/Input";
import Button from "@/components/generic/Button";
import Link from "next/link";
import { validationService } from "@/utils/validationService";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/lib/axiosInterceptor";
import { useAppContext } from "@/context/app.context";
import { validationConfig } from "@/const/const";
import { FormFields } from "@/types/stateTypes";
import axios from "axios";

/**
 * Registration page component that allows users to create an account as a doctor or patient.
 * It includes form validation and submission handling.
 * @returns Registration page component that allows users to create an account as a doctor or patient.
 */
const Register = () => {
  const [form, setForm] = useState<FormFields>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    user_type: "doctor",
    specialization: "",
    bio: "",
    gender: "",
    date_of_birth: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormFields, string>>
  >({});
  const [submitting, setSubmitting] = useState(false);

  const specializations = [
    "Cardiology",
    "Medicine",
    "Dermatology",
    "Neurology",
    "Pediatrics",
  ];

  const router = useRouter();
  const { setState } = useAppContext();
  const validators = validationService();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /**
   * Validates the form fields.
   * @returns boolean indicating whether the form fields are valid.
   */
  const validateFields = () => {
    let valid = true;
    const tempErrors: typeof errors = {};

    for (const key in form) {
      const rules = validationConfig[key as keyof FormFields] || [];
      for (const rule of rules) {
        const validate = validators[rule];
        const value = form[key as keyof FormFields];

        if (
          !validate(value) &&
          ((form.user_type === "doctor" &&
            key !== "gender" &&
            key !== "date_of_birth") ||
            (form.user_type === "patient" &&
              key !== "specialization" &&
              key !== "bio"))
        ) {
          tempErrors[key as keyof FormFields] = `${key.replace(
            /_/g,
            " "
          )} is invalid`;
          valid = false;
          break;
        }
      }
    }

    setErrors(tempErrors);
    return valid;
  };

  /**
   *
   * @param e - Form submission event.
   * Handles form submission for user registration.
   * Validates the form fields and sends a POST request to register the user.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;

    setSubmitting(true);
    try {
      const res = await axiosInstance.post("/auth/register", form);

      setState("userType", res.data.user_type);
      setState("userName", res.data.user_name);

      router.replace("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4 py-10">
      <form
        className="w-full max-w-2xl bg-white p-10 rounded-xl shadow-lg space-y-8"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Create an Account
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign up as a doctor or a patient
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="First Name"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            placeholder="John"
            error={errors.first_name}
          />
          <Input
            label="Last Name"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            placeholder="Doe"
            error={errors.last_name}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            error={errors.email}
          />
          <Input
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="8593049274"
            error={errors.phone}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            error={errors.password}
          />
          <Input
            label="User Type"
            name="user_type"
            value={form.user_type}
            onChange={handleChange}
            selectOptions={["doctor", "patient"]}
            error={errors.user_type}
          />

          {form.user_type === "doctor" && (
            <>
              <Input
                label="Specialization"
                name="specialization"
                value={form.specialization}
                onChange={handleChange}
                selectOptions={specializations}
                error={errors.specialization}
              />
              <Input
                label="Bio"
                name="bio"
                value={form.bio}
                onChange={handleChange}
                textarea
                placeholder="Tell us about yourself..."
              />
            </>
          )}

          {form.user_type === "patient" && (
            <>
              <Input
                label="Gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                selectOptions={["male", "female", "others"]}
                error={errors.gender}
              />
              <Input
                label="Date of Birth"
                name="date_of_birth"
                type="date"
                value={form.date_of_birth}
                onChange={handleChange}
                error={errors.date_of_birth}
              />
            </>
          )}
        </div>

        <div className="space-y-3">
          <Button
            className="w-full"
            variant="default"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Registering..." : "Register"}
          </Button>
          <p className="text-center text-gray-500 text-sm">or</p>
          <Link href="/login">
            <Button className="w-full" variant="outline" type="button">
              Log In
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
