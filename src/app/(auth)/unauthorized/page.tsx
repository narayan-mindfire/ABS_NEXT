import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Button from "@/components/Button";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <FontAwesomeIcon
        icon={faShieldAlt}
        className="text-yellow-500 w-18 h-18 mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
      <p className="text-gray-600 mb-6">
        You don’t have permission to view this page.
      </p>
      <Link href="/">
        <Button variant="outline">back home</Button>
      </Link>
    </div>
  );
}
