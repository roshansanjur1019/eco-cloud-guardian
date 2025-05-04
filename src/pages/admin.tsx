import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

function TrafficTable() {
  const [traffic, setTraffic] = useState<any[]>([]);
  useEffect(() => {
    supabase
      .from("traffic")
      .select("id, user_id, page, timestamp")
      .order("timestamp", { ascending: false })
      .then(({ data }) => setTraffic(data || []));
  }, []);
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-2">Traffic</h2>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">User</th>
            <th className="border px-2 py-1">Page</th>
            <th className="border px-2 py-1">Time</th>
          </tr>
        </thead>
        <tbody>
          {traffic.map((row) => (
            <tr key={row.id}>
              <td className="border px-2 py-1">{row.user_id}</td>
              <td className="border px-2 py-1">{row.page}</td>
              <td className="border px-2 py-1">{new Date(row.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RevenueTable() {
  const [revenue, setRevenue] = useState<any[]>([]);
  useEffect(() => {
    supabase
      .from("revenue")
      .select("id, amount, date, description")
      .order("date", { ascending: false })
      .then(({ data }) => setRevenue(data || []));
  }, []);
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-2">Revenue</h2>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Amount</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Description</th>
          </tr>
        </thead>
        <tbody>
          {revenue.map((row) => (
            <tr key={row.id}>
              <td className="border px-2 py-1">{row.amount}</td>
              <td className="border px-2 py-1">{row.date}</td>
              <td className="border px-2 py-1">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [role, setRole] = useState("");
  const [tenantId, setTenantId] = useState("");

  useEffect(() => {
    supabase
      .from("profiles")
      .select("id, full_name, email, role, tenant_id")
      .then(({ data }) => setUsers(data || []));
  }, []);

  const startEdit = (user: any) => {
    setEditing(user.id);
    setRole(user.role);
    setTenantId(user.tenant_id || "");
  };

  const saveEdit = async (id: string) => {
    await supabase
      .from("profiles")
      .update({ role, tenant_id: tenantId || null })
      .eq("id", id);
    setEditing(null);
    // Refresh users
    const { data } = await supabase
      .from("profiles")
      .select("id, full_name, email, role, tenant_id");
    setUsers(data || []);
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">User Management</h2>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Role</th>
            <th className="border px-2 py-1">Tenant ID</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            editing === user.id ? (
              <tr key={user.id}>
                <td className="border px-2 py-1">{user.full_name}</td>
                <td className="border px-2 py-1">{user.email}</td>
                <td className="border px-2 py-1">
                  <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="border px-2 py-1">
                  <input
                    value={tenantId}
                    onChange={(e) => setTenantId(e.target.value)}
                    className="input"
                  />
                </td>
                <td className="border px-2 py-1">
                  <button onClick={() => saveEdit(user.id)} className="btn">Save</button>
                  <button onClick={() => setEditing(null)} className="btn ml-2">Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={user.id}>
                <td className="border px-2 py-1">{user.full_name}</td>
                <td className="border px-2 py-1">{user.email}</td>
                <td className="border px-2 py-1">{user.role}</td>
                <td className="border px-2 py-1">{user.tenant_id}</td>
                <td className="border px-2 py-1">
                  <button onClick={() => startEdit(user)} className="btn">Edit</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminDashboard() {
  const [profile, setProfile] = useState<{ full_name: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
        return;
      }
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, role")
        .eq("id", user.id)
        .single();
      if (error || !data || data.role !== "admin") {
        navigate("/"); // or show "Not authorized"
        return;
      }
      setProfile(data);
      setLoading(false);
    };
    fetchProfile();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-6">Welcome, {profile?.full_name}!</p>
      <TrafficTable />
      <RevenueTable />
      <UserManagement />
    </div>
  );
} 