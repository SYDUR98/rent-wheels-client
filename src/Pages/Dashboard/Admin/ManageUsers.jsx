import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingPage from "../../../Coponents/Shared/LoadingPage";


const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Role change
  const handleRoleChange = async (email, role) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Make this user ${role}?`,
      icon: "warning",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.patch(`/users/role/${email}`, { role });
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire("Success!", "User role updated", "success");
      }
    }
  };

  // Delete user
  const handleDelete = async (email) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "User will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/users/${email}`);
      if (res.data.deletedCount > 0) {
        refetch();
        Swal.fire("Deleted!", "User deleted successfully.", "success");
      }
    }
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">MANAGE USERS</h2>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.displayName || "N/A"}</td>
                <td>{user.email}</td>

                <td>
                  <span className="badge badge-outline">
                    {user.role}
                  </span>
                </td>

                <td className="text-center space-x-2">
                  <button
                    disabled={user.role === "admin"}
                    onClick={() => handleRoleChange(user.email, "admin")}
                    className="btn btn-xs btn-success"
                  >
                    Admin
                  </button>

                  <button
                    disabled={user.role === "carsDealer"}
                    onClick={() => handleRoleChange(user.email, "carsDealer")}
                    className="btn btn-xs btn-info"
                  >
                    Dealer
                  </button>

                  <button
                    disabled={user.role === "member"}
                    onClick={() => handleRoleChange(user.email, "member")}
                    className="btn btn-xs btn-secondary"
                  >
                    Member
                  </button>

                  <button
                    onClick={() => handleDelete(user.email)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center py-6">No users found</p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
