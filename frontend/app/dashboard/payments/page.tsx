"use client"

import { useState } from 'react'
import { DollarSign, TrendingUp, Download, CreditCard, Smartphone, Building, Calendar, Filter } from 'lucide-react'

const transactions = [
  {
    id: 1,
    eventName: 'Tech Startup Workshop',
    paymentDate: '2024-12-10',
    amount: 22500,
    paymentMethod: 'Chapa',
    status: 'completed',
    attendeeCount: 45,
    ticketPrice: 500
  },
  {
    id: 2,
    eventName: 'Business Networking Event',
    paymentDate: '2024-12-12',
    amount: 106800,
    paymentMethod: 'Mobile Money',
    status: 'completed',
    attendeeCount: 89,
    ticketPrice: 1200
  },
  {
    id: 3,
    eventName: 'Private Company Meeting',
    paymentDate: '2024-12-14',
    amount: 0,
    paymentMethod: 'Free Event',
    status: 'completed',
    attendeeCount: 25,
    ticketPrice: 0
  },
  {
    id: 4,
    eventName: 'Cultural Heritage Exhibition',
    paymentDate: '2024-12-15',
    amount: 15000,
    paymentMethod: 'Bank Transfer',
    status: 'pending',
    attendeeCount: 30,
    ticketPrice: 500
  }
]

const payoutMethods = [
  { id: 1, type: 'Mobile Money', account: '+251911123456', status: 'active' },
  { id: 2, type: 'Bank Account', account: 'CBE - ****1234', status: 'active' },
  { id: 3, type: 'PayPal', account: 'bereket@email.com', status: 'pending' }
]

export default function PaymentsPage() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [methodFilter, setMethodFilter] = useState('all')

  const filteredTransactions = transactions.filter(transaction => {
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter
    const matchesMethod = methodFilter === 'all' || transaction.paymentMethod === methodFilter
    return matchesStatus && matchesMethod
  })

  const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0)
  const pendingPayments = transactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0)
  const completedPayments = transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'Chapa': return <CreditCard className="h-4 w-4" />
      case 'Mobile Money': return <Smartphone className="h-4 w-4" />
      case 'Bank Transfer': return <Building className="h-4 w-4" />
      default: return <DollarSign className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Payments & Transactions</h1>
          <p className="text-muted mt-1">Manage your revenue and payout methods</p>
        </div>
        <button className="btn-primary px-4 py-2 rounded-lg flex items-center space-x-2 mt-4 sm:mt-0">
          <Download className="h-5 w-5" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-primary mt-1">{totalRevenue.toLocaleString()} ETB</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-sm text-muted">+12% from last month</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-medium">Completed Payments</p>
              <p className="text-2xl font-bold text-primary mt-1">{completedPayments.toLocaleString()} ETB</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-medium">Pending Payments</p>
              <p className="text-2xl font-bold text-primary mt-1">{pendingPayments.toLocaleString()} ETB</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Payout Methods */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primary">Payout Methods</h2>
          <button className="btn-primary px-4 py-2 rounded-lg text-sm">
            Add Method
          </button>
        </div>
        
        <div className="grid gap-4">
          {payoutMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border border-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  {getPaymentIcon(method.type)}
                </div>
                <div>
                  <div className="font-medium text-primary">{method.type}</div>
                  <div className="text-sm text-muted">{method.account}</div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                method.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {method.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <select
            className="px-4 py-2 border border-muted rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          <select
            className="px-4 py-2 border border-muted rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
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
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface border-b border-muted">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-primary">Event</th>
                <th className="text-left py-4 px-6 font-medium text-primary">Date</th>
                <th className="text-left py-4 px-6 font-medium text-primary">Amount</th>
                <th className="text-left py-4 px-6 font-medium text-primary">Method</th>
                <th className="text-left py-4 px-6 font-medium text-primary">Status</th>
                <th className="text-left py-4 px-6 font-medium text-primary">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-muted hover:bg-surface/50">
                  <td className="py-4 px-6">
                    <div className="font-medium text-primary">{transaction.eventName}</div>
                    <div className="text-sm text-muted">{transaction.attendeeCount} attendees</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-primary">{new Date(transaction.paymentDate).toLocaleDateString()}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-primary">{transaction.amount.toLocaleString()} ETB</div>
                    {transaction.ticketPrice > 0 && (
                      <div className="text-sm text-muted">{transaction.ticketPrice} ETB per ticket</div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      {getPaymentIcon(transaction.paymentMethod)}
                      <span className="text-primary">{transaction.paymentMethod}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="text-accent hover:text-primary font-medium text-sm">
                      View Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}