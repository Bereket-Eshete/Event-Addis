"use client";

import { useState, useEffect } from "react";
import {
  DollarSign,
  TrendingUp,
  Download,
  CreditCard,
  Smartphone,
  Building,
  Calendar,
  Filter,
  Loader,
} from "lucide-react";
import { dashboardAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function PaymentsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  // Mock payout methods - in real app, this would come from backend
  const payoutMethods = [
    {
      id: 1,
      type: "Bank Transfer",
      account: "**** **** **** 1234",
      status: "active"
    },
    {
      id: 2,
      type: "Mobile Money",
      account: "+251 9** *** 567",
      status: "active"
    }
  ];

  useEffect(() => {
    fetchPayments();
  }, [pagination.page]);

  // Auto-refresh functionality
  useEffect(() => {
    const handleFocus = () => {
      fetchPayments();
    };
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchPayments();
      }
    };
    
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchPayments();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await dashboardAPI.getOrganizerPayments({ 
        page: pagination.page, 
        limit: 10 
      });
      setPayments(response.data.payments);
      setPagination({
        page: response.data.page,
        pages: response.data.pages,
        total: response.data.total
      });
    } catch (error) {
      toast.error('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = payments.filter((payment: any) => {
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    return matchesStatus;
  });

  const totalRevenue = payments.reduce((sum: number, t: any) => sum + (t.totalAmount || 0), 0);
  const pendingPayments = payments
    .filter((t: any) => t.status === "pending")
    .reduce((sum: number, t: any) => sum + (t.totalAmount || 0), 0);
  const completedPayments = payments
    .filter((t: any) => t.status === "confirmed")
    .reduce((sum: number, t: any) => sum + (t.totalAmount || 0), 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case "Chapa":
        return <CreditCard className="w-4 h-4" />;
      case "Mobile Money":
        return <Smartphone className="w-4 h-4" />;
      case "Bank Transfer":
        return <Building className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Payments & Transactions
          </h1>
          <p className="mt-1 text-muted">
            Manage your revenue and payout methods
          </p>
        </div>
        <button className="flex items-center px-4 py-2 mt-4 space-x-2 rounded-lg btn-primary sm:mt-0">
          <Download className="w-5 h-5" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="p-6 card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Total Revenue</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {totalRevenue.toLocaleString()} ETB
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
            <span className="text-sm text-muted">+12% from last month</span>
          </div>
        </div>

        <div className="p-6 card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">
                Completed Payments
              </p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {completedPayments.toLocaleString()} ETB
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="p-6 card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Pending Payments</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {pendingPayments.toLocaleString()} ETB
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Payout Methods */}
      <div className="p-6 card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primary">Payout Methods</h2>
          <button className="px-4 py-2 text-sm rounded-lg btn-primary">
            Add Method
          </button>
        </div>

        <div className="grid gap-4">
          {payoutMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 border rounded-lg border-muted"
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  {getPaymentIcon(method.type)}
                </div>
                <div>
                  <div className="font-medium text-primary">{method.type}</div>
                  <div className="text-sm text-muted">{method.account}</div>
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  method.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {method.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 card">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          <select
            className="px-4 py-2 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          <select
            className="px-4 py-2 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
          >
            <option value="all">All Methods</option>
            <option value="Chapa">Chapa</option>
            <option value="Mobile Money">Mobile Money</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Free Event">Free Event</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-hidden card">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted">Loading payments...</span>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="py-12 text-center">
            <DollarSign className="w-12 h-12 mx-auto mb-4 text-muted" />
            <h3 className="mb-2 text-lg font-medium text-primary">No payments found</h3>
            <p className="text-muted">Payments will appear here once customers book your events</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="border-b bg-surface border-muted">
                <tr>
                  <th className="px-4 sm:px-6 py-4 font-medium text-left text-primary">
                    Event
                  </th>
                  <th className="px-4 sm:px-6 py-4 font-medium text-left text-primary">
                    User
                  </th>
                  <th className="px-4 sm:px-6 py-4 font-medium text-left text-primary">
                    Amount
                  </th>
                  <th className="px-4 sm:px-6 py-4 font-medium text-left text-primary">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-4 font-medium text-left text-primary">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((payment: any) => (
                  <tr
                    key={payment._id}
                    className="border-b border-muted hover:bg-surface/50"
                  >
                    <td className="px-4 sm:px-6 py-4">
                      <div className="font-medium text-primary truncate max-w-[150px]">
                        {payment.eventId?.title || 'Unknown Event'}
                      </div>
                      <div className="text-sm text-muted truncate max-w-[150px]">
                        {payment.eventId?.venue || 'No location'}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="font-medium text-primary truncate max-w-[120px]">
                        {payment.userId?.fullName || 'Unknown User'}
                      </div>
                      <div className="text-sm text-muted truncate max-w-[120px]">
                        {payment.userId?.email || 'No email'}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="font-semibold text-primary">
                        {(payment.totalAmount || 0).toLocaleString()} ETB
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          payment.status
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="text-primary text-sm">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
