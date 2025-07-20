"use client";

import { useState } from "react";
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
import axiosInstance from "@/app/lib/axiosInterceptor";
import { logout } from "@/app/lib/logout";

const ClientProfile = ({ user }: { user: User }) => {
  const [currentUser, setUser] = useState<User | null>(user);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [form, setForm] = useState<Partial<User>>(user || {});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();

  const handleEdit = () => {
    if (currentUser) {
      setForm(currentUser);
      setEditModalOpen(true);
    }
  };

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete("/users/me");
      await logout().then(() => router.replace("/login"));
    } catch (error) {
      console.log("Failed to delete user", error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put("/users/me", form);
      setUser(res.data); // update state with response
      setEditModalOpen(false);
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
        {currentUser ? (
          <ProfileDetails user={currentUser} />
        ) : (
          <p className="text-center text-gray-500">Loading profile...</p>
        )}

        {/* Edit Modal */}
        {editModalOpen && currentUser && (
          <EditProfileForm
            form={form}
            userType={currentUser.user_type}
            onChange={handleChange}
            onClose={() => setEditModalOpen(false)}
            onSubmit={handleSubmit}
          />
        )}

        {/* Action Buttons */}
        <div className="border-t mt-10 pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <Button
            className="w-full sm:w-auto"
            onClick={() => setShowDeleteModal(true)}
            variant="danger"
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Delete Profile
          </Button>
          <Button
            className="w-full sm:w-auto"
            onClick={async () => {
              await logout().then(() => router.replace("/login"));
            }}
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

export default ClientProfile;
