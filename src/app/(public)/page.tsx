import Button from "@/components/generic/Button";
import DisplayCard from "@/components/others/DisplayCard";
import Link from "next/link";
import {
  faCalendarCheck,
  faUserDoctor,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Home page component that displays a welcome message and three feature cards.
 * @returns Home page component that displays a welcome message and three feature cards.
 * It includes a header with navigation links to login and register pages.
 */
export default function Home() {
  return (
    <>
      <div className="bg-white text-gray-900 font-sans min-h-screen flex flex-col">
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm">
          <nav className="container mx-auto flex justify-between items-center px-4 py-4">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-gray-900 hover:opacity-90 transition"
            >
              🩺 ABS
              <p className="text-sm text-gray-500">get that appointment!</p>
            </Link>
            <div className="flex gap-3">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </div>
          </nav>
        </header>

        {/* Main content */}
        <main className="flex-grow flex items-center justify-center py-16 px-4">
          <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <DisplayCard
              icon={
                <FontAwesomeIcon
                  icon={faCalendarCheck}
                  className="text-xl text-gray-800"
                />
              }
              title="Book Appointments"
              description="Easily schedule appointments with your doctor using our intuitive booking system."
            />
            <DisplayCard
              icon={
                <FontAwesomeIcon
                  icon={faUserDoctor}
                  className="text-xl text-gray-800"
                />
              }
              title="Expert Doctors"
              description="Access a trusted network of certified doctors ready to help you stay healthy."
            />
            <DisplayCard
              icon={
                <FontAwesomeIcon
                  icon={faClock}
                  className="text-xl text-gray-800"
                />
              }
              title="24/7 Availability"
              description="Get medical support anytime, day or night, without waiting in line."
            />
          </div>
        </main>
      </div>
    </>
  );
}
