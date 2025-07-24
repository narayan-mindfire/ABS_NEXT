"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  faUser,
  faPenToSquare,
  faTrash,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import EditProfileForm from "@/components/profile/EditProfileForm";
import Button from "@/components/generic/Button";
import { User } from "@/types/stateTypes";
import ProfileDetails from "./ProfileDetails";
import dynamic from "next/dynamic";
import { deleteUserAction } from "@/app/actions/deleteUserAction";
import { updateUserAction } from "@/app/actions/updateUserAction";
import { logoutAction } from "@/app/actions/logoutAction";

// lazy loading not critical components
const EditProfileForm = dynamic(
  () => import("@/components/profile/EditProfileForm"),
  {
    loading: () => {
      return <p>Loading form...</p>;
    },
  },
);

const Modal = dynamic(() => import("../generic/Modal"), {
  loading: () => <p>Loading modal...</p>,
});

/**
 * Renders the client profile page which includes profile information,
 * editing capability, profile deletion, and logout functionality.
 *
 * @component
 * @param {Object} props - The component props
 * @param {User} props.user - The initial user data used to populate the profile
 * @returns {JSX.Element} A React component that displays and manages the user's profile
 */
const ClientProfile = ({ user }: { user: User }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(user);
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
      await deleteUserAction();
      await logoutAction().then(() => router.replace("/"));
    } catch (error) {
      console.log(error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await updateUserAction(form);
      if ("user" in res) {
        setCurrentUser(res.user);
        setEditModalOpen(false);
      } else {
        alert(res.error);
      }
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="overflow-y-auto text-black px-4 py-0">
      <div className="max-h-[80vh] overflow-y-auto mx-auto bg-zinc-50 py-0">
        <div className="mb-4"></div>

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

        <div className="border-t my-30 md:mb-40 pt-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
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
              await logoutAction().then(() => router.replace("/"));
            }}
            variant="outline"
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>

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
