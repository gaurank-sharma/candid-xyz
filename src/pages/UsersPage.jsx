import React, { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../utils/api";
import { Plus, Trash, Edit, X } from "lucide-react";
import BackButton from "../components/BackButton";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
  });

  const [editUser, setEditUser] = useState(null); // user being edited
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createUser(newUser);
      setNewUser({ name: "", email: "", role: "user", password: "" });
      loadUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id)); // update UI
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser(editUser._id, editUser);
      setEditUser(null);
      loadUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
       <BackButton />
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      {/* Create User */}
      <form
        onSubmit={handleCreate}
        className="flex flex-col md:flex-row gap-2 mb-6"
      >
        <input
          className="border p-2 rounded flex-1"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          required
        />
        <input
          className="border p-2 rounded flex-1"
          placeholder="Email"
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <input
          className="border p-2 rounded flex-1"
          placeholder="Password"
          type="password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <select
          className="border p-2 rounded"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Super Admin</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1">
          <Plus size={16} /> Add
        </button>
      </form>

      {/* Users List (Responsive Table) */}
      <div className="overflow-x-auto">
        <table className="w-full border hidden md:table">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.role}</td>
                <td className="p-2 border flex gap-2">
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(u._id)}
                  >
                    <Trash size={16} />
                  </button>
                  <button
                    className="text-blue-600"
                    onClick={() => setEditUser(u)}
                  >
                    <Edit size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile view: cards */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {users.map((u) => (
            <div
              key={u._id}
              className="bg-white p-4 rounded shadow border flex flex-col"
            >
              <p className="font-semibold">{u.name}</p>
              <p className="text-sm text-gray-600">{u.email}</p>
              <p className="text-xs text-gray-500 mb-2">Role: {u.role}</p>
              <div className="flex gap-2">
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(u._id)}
                >
                  <Trash size={16} />
                </button>
                <button
                  className="text-blue-600"
                  onClick={() => setEditUser(u)}
                >
                  <Edit size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Edit User</h2>
              <button onClick={() => setEditUser(null)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleUpdate} className="flex flex-col gap-3">
              <input
                className="border p-2 rounded"
                placeholder="Name"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
              />
              <input
                className="border p-2 rounded"
                placeholder="Email"
                type="email"
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
              />
              <select
                className="border p-2 rounded"
                value={editUser.role}
                onChange={(e) =>
                  setEditUser({ ...editUser, role: e.target.value })
                }
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>

               <input
               className="border p-2 rounded"
               placeholder="Password (leave blank to keep same)"
               type="password"
               value={editUser.password || ""}
               onChange={(e) =>
                 setEditUser({ ...editUser, password: e.target.value })
                 }
               />
              <button className="bg-green-600 text-white px-4 py-2 rounded">
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
