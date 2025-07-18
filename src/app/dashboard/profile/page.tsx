"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  faUser,
  faPenToSquare,
  faTrash,
  faArrowLeft,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import EditProfileForm from "@/components/EditProfileForm";
import ProfileDetails from "@/components/ProfileDetails";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { User } from "@/types/stateTypes";

const demoUser: User = {
  _id: "64acfe44e1d8e01b23456789",
  first_name: "John",
  last_name: "Doe",
  email: "john.doe@example.com",
  phone_number: "+91-9876543210",
  user_type: "doctor",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  specialization: "Cardiology",
  bio: "Experienced cardiologist with 10+ years in clinical practice.",
  gender: "male",
  date_of_birth: "1985-06-15",
};

const Profile = () => {
  const [user, setUser] = useState<User | null>(demoUser);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [form, setForm] = useState<Partial<User>>({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      // const res = await axiosInstance.get("/users/me");
      // setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch profile", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleEdit = () => {
    if (user) {
      setForm(user);
      setEditModalOpen(true);
    }
  };

  const deleteMe = async () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      // await axiosInstance.delete("/users/me");
      // logout();
    } catch (error) {
      console.log("Failed to delete user", error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // await axiosInstance.put("/users/me", form);
      setEditModalOpen(false);
      fetchUser();
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black px-4 sm:px-10 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Back Button */}
        <div className="mb-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-sm text-gray-600"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back
          </Button>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold flex items-center gap-3">
            <FontAwesomeIcon icon={faUser} className="text-black text-2xl" />
            My Profile
          </h2>
          <Button onClick={handleEdit} variant="outline">
            <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
            Edit
          </Button>
        </div>

        {/* Profile Details */}
        {user ? (
          <ProfileDetails user={user} />
        ) : (
          <p className="text-center text-gray-500">Loading profile...</p>
        )}

        {/* Edit Modal */}
        {editModalOpen && user && (
          <EditProfileForm
            form={form}
            userType={user.user_type}
            onChange={handleChange}
            onClose={() => setEditModalOpen(false)}
            onSubmit={handleSubmit}
          />
        )}

        {/* Action Buttons */}
        <div className="border-t mt-10 pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <Button
            className="w-full sm:w-auto"
            onClick={deleteMe}
            variant="danger"
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Delete Profile
          </Button>
          <Button
            className="w-full sm:w-auto"
            // onClick={logout}
            variant="outline"
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <Modal
          title="Delete Profile"
          message="Are you sure you want to delete your profile? This action cannot be undone."
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          confirmText="Yes, Delete"
          cancelText="Cancel"
        />
      )}
    </div>
  );
};

export default Profile;
