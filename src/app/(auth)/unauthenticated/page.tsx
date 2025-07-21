import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Button from "@/components/Button";

/**
 * Unauthenticated page component that displays a message indicating the user is not logged in.
 * @returns Unauthenticated page component that displays a message indicating the user is not logged in.
 */
export default function UnauthenticatedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <FontAwesomeIcon icon={faLock} className="text-red-500 w-18 h-18 mb-6" />
      <h1 className="text-3xl font-bold mb-2">You’re not logged in</h1>
      <p className="text-gray-600 mb-6">Please sign in to access this page.</p>
      <Link href="/login">
        <Button variant="outline">Go to Login</Button>
      </Link>
    </div>
  );
}
