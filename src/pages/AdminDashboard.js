import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const token = localStorage.getItem('admin_token');

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data && data.success) {
        setOrders(data.orders || []);
      } else {
        toast.error('Failed to load orders');
      }
    } catch (err) {
      toast.error('Failed to load orders');
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/email/logs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data && data.success) {
        setLogs(data.logs || []);
      }
    } catch (err) {
      /* noop */
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data && data.success) {
        toast.success('Order status updated');
        setOrders(prev => prev.map(o => (o.id === id ? data.order : o)));
      } else {
        toast.error('Failed to update status');
      }
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchOrders().finally(() => setLoading(false));
    fetchLogs();
  }, []);

  const counts = {
    total: orders.length,
    received: orders.filter(o => o.status === 'received').length,
    pending: orders.filter(o => o.status === 'pending').length,
    completed: orders.filter(o => o.status === 'completed').length,
    failed: orders.filter(o => o.status === 'failed').length,
  };

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <h1 className="text-2xl font-bold text-amber-900 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-600">Total Orders</div>
          <div className="text-2xl font-semibold">{counts.total}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-600">Received</div>
          <div className="text-2xl font-semibold">{counts.received}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-600">Pending</div>
          <div className="text-2xl font-semibold">{counts.pending}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-600">Completed</div>
          <div className="text-2xl font-semibold">{counts.completed}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-600">Failed</div>
          <div className="text-2xl font-semibold">{counts.failed}</div>
        </div>
      </div>

      <div className="bg-white rounded shadow mb-8">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-amber-900">Order Management</h2>
        </div>
        <div className="p-4 overflow-x-auto">
          {loading ? (
            <div>Loading...</div>
          ) : orders.length === 0 ? (
            <div className="text-gray-600">No orders</div>
          ) : (
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-2">ID</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Total</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} className="border-b">
                    <td className="p-2">{o.id}</td>
                    <td className="p-2">{o.name}</td>
                    <td className="p-2">{o.email}</td>
                    <td className="p-2">{o.phone}</td>
                    <td className="p-2 capitalize">{o.status}</td>
                    <td className="p-2">₹{o.totalAmount}</td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <button className="px-2 py-1 bg-yellow-600 text-white rounded" onClick={() => updateStatus(o.id, 'pending')}>Pending</button>
                        <button className="px-2 py-1 bg-green-600 text-white rounded" onClick={() => updateStatus(o.id, 'completed')}>Complete</button>
                        <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={() => updateStatus(o.id, 'failed')}>Fail</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="bg-white rounded shadow">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-amber-900">Email Logs</h2>
        </div>
        <div className="p-4">
          {logs.length === 0 ? (
            <div className="text-gray-600">No logs</div>
          ) : (
            <ul className="space-y-2">
              {logs.map((l, idx) => (
                <li key={idx} className="text-sm text-gray-700">
                  <span className="text-gray-500 mr-2">{new Date(l.ts).toLocaleString()}</span>
                  <span className="font-medium">{l.to}</span>
                  <span className="mx-2">—</span>
                  <span>{l.subject}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
