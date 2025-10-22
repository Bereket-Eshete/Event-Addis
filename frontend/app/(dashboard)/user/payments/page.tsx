"use client";

import { useState, useEffect } from 'react';
import { CreditCard, Calendar, CheckCircle, Clock } from 'lucide-react';
import { dashboardAPI } from '@/lib/api';
import { toast } from 'react-hot-toast';
import ReceiptModal from '@/components/ui/ReceiptModal';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await dashboardAPI.getUserPayments();
      setPayments(response.data.payments || []);
    } catch (error) {
      toast.error('Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  };

  const totalSpent = payments.reduce((sum, payment) => sum + payment.totalAmount, 0);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-primary">Payment History</h1>
        <div className="bg-surface border border-muted rounded-lg p-4 text-center sm:text-left">
          <p className="text-sm text-muted">Total Spent</p>
          <p className="text-xl font-bold text-primary">{totalSpent.toLocaleString()} ETB</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {payments.map((payment: any) => (
          <div key={payment._id} className="bg-surface border border-muted rounded-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-primary">{payment.eventId?.title}</h3>
                <p className="text-sm text-muted">Booking Ref: EA-{payment._id.slice(-6).toUpperCase()}</p>
              </div>
              <div className="flex flex-row sm:flex-col sm:text-right items-center sm:items-end justify-between sm:justify-start gap-2">
                <p className="text-lg font-bold text-primary">{payment.totalAmount.toLocaleString()} ETB</p>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {payment.status === 'confirmed' ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-yellow-500" />
                    )}
                    <span className={`text-xs font-medium ${
                      payment.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {payment.status}
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedPayment(payment);
                      setShowReceiptModal(true);
                    }}
                    className="text-xs bg-primary text-white px-2 py-1 rounded hover:bg-primary/90"
                  >
                    Receipt
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-muted gap-2">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span>{payment.paymentMethod || 'Chapa'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(payment.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {payments.length === 0 && (
        <div className="py-12 text-center">
          <h3 className="mb-2 text-lg font-medium text-primary">
            No payments found
          </h3>
          <p className="text-muted">
            You haven't made any payments yet.
          </p>
        </div>
      )}

      {/* Receipt Modal */}
      <ReceiptModal
        payment={selectedPayment}
        isOpen={showReceiptModal}
        onClose={() => {
          setShowReceiptModal(false);
          setSelectedPayment(null);
        }}
      />
    </div>
  )
}