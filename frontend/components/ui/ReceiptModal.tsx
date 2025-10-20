"use client";

import { X, CheckCircle, Calendar, MapPin, CreditCard } from "lucide-react";

interface ReceiptModalProps {
  payment: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReceiptModal({ payment, isOpen, onClose }: ReceiptModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-muted">
          <h2 className="text-xl font-bold text-primary">Payment Receipt</h2>
          <button onClick={onClose} className="p-2 hover:bg-accent/50 rounded-full">
            <X className="w-5 h-5 text-muted" />
          </button>
        </div>

        {/* Receipt Content */}
        <div className="p-6 space-y-4">
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-primary">Payment Successful</h3>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Event:</span>
              <span className="text-primary font-medium">{payment.eventId?.title}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted">Date:</span>
              <span className="text-primary">{new Date(payment.eventId?.startAt).toLocaleDateString()}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted">Venue:</span>
              <span className="text-primary">{payment.eventId?.venue}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted">Quantity:</span>
              <span className="text-primary">{payment.quantity} ticket(s)</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted">Booking Ref:</span>
              <span className="text-primary font-mono">EA-{payment._id.slice(-6).toUpperCase()}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted">Transaction ID:</span>
              <span className="text-primary font-mono text-xs">{payment.paymentInfo?.reference}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted">Payment Date:</span>
              <span className="text-primary">{new Date(payment.updatedAt).toLocaleDateString()}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted">Payment Method:</span>
              <span className="text-primary">Chapa</span>
            </div>
            
            <hr className="border-muted" />
            
            <div className="flex justify-between text-lg font-bold">
              <span className="text-primary">Total Amount:</span>
              <span className="text-primary">{payment.totalAmount} ETB</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 text-white rounded-lg gradient-primary hover:opacity-90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}