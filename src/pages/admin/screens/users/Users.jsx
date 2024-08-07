import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDataTable } from "../../../../hooks/useDataTable";
import {
  deleteUser,
  getAllUsers,
  updateProfile,
} from "../../../../services/index/users";
import DataTable from "../../components/DataTable";
import { images, stables } from "../../../../constants";
import { useSelector } from "react-redux";

const Users = () => {
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  const {
    currentPage,
    searchKeyword,
    data: usersData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () =>
      getAllUsers(userState.userInfo.token, searchKeyword, currentPage),
    dataQueryKey: "users",
    deleteDataMessage: "User is deleted",
    mutateDeleteFn: ({ slug, token }) => {
      return deleteUser({
        slug,
        token,
      });
    },
  });

  const { mutate: mutateUpdateUser, isLoading: isLoadingUpdateUser } =
    useMutation({
      mutationFn: ({ role, userId }) => {
        console.log("Updating role to:", role, "for user:", userId);
        return updateProfile({
          token: userState.userInfo.token,
          userData: { role },
          userId,
        });
      },
      onSuccess: () => {
        console.log("User role updated successfully");
        queryClient.invalidateQueries(["users"]);
        toast.success("User role updated successfully");
      },
      onError: (error) => {
        console.error("Error updating user role:", error);
        toast.error(`Error updating user role: ${error.message}`);
      },
    });

  const handleRoleChange = (event, userId) => {
    const newRole = event.target.value;

    if (window.confirm("Do you want to change the role of this user?")) {
      console.log("Role change confirmed:", newRole, "for user:", userId);
      mutateUpdateUser({ role: newRole, userId });
    } else {
      console.log("Role change canceled.");
    }
  };

  if (userState.userInfo.role !== "superadmin") {
    return <div>You are not authorized to view this page.</div>;
  }

  return (
    <DataTable
      pageTitle="Manage Users"
      dataListName="Users"
      searchInputPlaceHolder="User's email..."
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={[
        "Name",
        "Email",
        "Created At",
        "is Verified",
        "Role",
        "",
      ]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={usersData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={usersData?.headers}
      userState={userState}
    >
      {usersData?.data.map((user) => (
        <tr key={user._id}>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" className="relative block">
                  <img
                    src={
                      user?.avatar
                        ? stables.UPLOAD_FOLDER_BASE_URL + user?.avatar
                        : images.userImage
                    }
                    alt={user.name}
                    className="mx-auto aspect-square w-10 rounded-lg object-cover"
                  />
                </a>
              </div>
              <div className="ml-3">
                <p className="whitespace-no-wrap text-gray-900">{user.name}</p>
              </div>
            </div>
          </td>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <p className="whitespace-no-wrap text-gray-900">{user.email}</p>
          </td>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <p className="whitespace-no-wrap text-gray-900">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </td>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <p className="whitespace-no-wrap text-gray-900">
              {user.verified ? "✅" : "❌"}
            </p>
          </td>
          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <select
              className="rounded-md border border-gray-300 py-2 px-4"
              value={user.role}
              onChange={(event) => handleRoleChange(event, user._id)}
              disabled={isLoadingUpdateUser}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Superadmin</option>
            </select>
          </td>
          <td className="space-x-5 border-b border-gray-200 bg-white px-5 py-5 text-sm">
            <button
              disabled={isLoadingDeleteData}
              type="button"
              className="text-red-600 hover:text-red-900 disabled:cursor-not-allowed disabled:opacity-70"
              onClick={() => {
                deleteDataHandler({
                  slug: user?._id,
                  token: userState.userInfo.token,
                });
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default Users;
