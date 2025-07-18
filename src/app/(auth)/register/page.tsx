"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import { validationService } from "@/utils/validationService";
type UserType = "doctor" | "patient";

interface FormFields {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  user_type: UserType;
  specialization: string;
  bio: string;
  gender: string;
  date_of_birth: string;
}

const validationConfig: Record<
  keyof FormFields,
  Array<keyof ReturnType<typeof validationService>>
> = {
  first_name: ["isRequired"],
  last_name: ["isRequired"],
  email: ["isRequired", "isEmailFormat"],
  phone: ["isRequired", "isPhone"],
  password: ["isRequired"],
  user_type: ["isRequired"],
  specialization: ["isRequired"],
  bio: [],
  gender: ["isRequired"],
  date_of_birth: ["isRequired"],
};

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
  const validators = validationService();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;

    console.log("Form valid, submit logic goes here");
    // You can call API here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4 py-10">
      <form
        className="w-full max-w-2xl bg-white p-10 rounded-xl shadow-lg space-y-8"
        onSubmit={handleSubmit}
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
                placeholder="e.g. Cardiology"
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
          <Button className="w-full" variant="default">
            Register
          </Button>
          <p className="text-center text-gray-500 text-sm">or</p>
          <Link href="/login">
            <Button className="w-full" variant="outline">
              Log In
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
