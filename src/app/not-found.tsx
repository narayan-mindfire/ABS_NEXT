"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <FontAwesomeIcon
        icon={faSearch}
        className="text-gray-500 text-6xl mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-primary text-white rounded-xl shadow bg-black transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
