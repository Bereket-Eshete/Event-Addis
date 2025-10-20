"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader } from "lucide-react";

export default function BookingResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const trxRef = searchParams.get("trx_ref");
    const paymentStatus = searchParams.get("status");
    
    console.log('URL params:', { trxRef, paymentStatus });
    console.log('Full URL:', window.location.href);

    if (trxRef && paymentStatus === "success") {
      // Verify payment with backend
      verifyPayment(trxRef);
    } else if (paymentStatus === "failed" || paymentStatus === "cancelled") {
      setStatus("failed");
    } else {
      // If no status param, try to verify anyway if we have trxRef
      if (trxRef) {
        console.log('No status param, but have trxRef, attempting verification');
        verifyPayment(trxRef);
      } else {
        setStatus("failed");
      }
    }
  }, [searchParams]);

  const verifyPayment = async (txRef: string) => {
    try {
      console.log('Verifying payment for txRef:', txRef);
      const response = await fetch(`http://localhost:3001/api/verify-payment/${txRef}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Verification response status:', response.status);
      const responseData = await response.text();
      console.log('Verification response data:', responseData);
      
      if (response.ok || response.status === 201) {
        console.log('Payment verification successful!');
        setStatus("success");
      } else {
        console.error('Verification failed with status:', response.status);
        setStatus("failed");
      }
    } catch (error) {
      console.error('Payment verification failed:', error);
      setStatus("failed");
    }
  };

  const handleContinue = () => {
    router.push("/user/tickets");
  };

  const handleRetry = () => {
    router.push("/user/browse");
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <h2 className="text-xl font-semibold text-primary mb-2">Processing Payment</h2>
          <p className="text-muted">Please wait while we verify your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full bg-surface rounded-lg p-8 text-center">
        {status === "success" ? (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-2">Payment Successful!</h2>
            <p className="text-muted mb-6">
              Your booking has been confirmed. You will receive a confirmation email shortly.
            </p>
            <button
              onClick={handleContinue}
              className="w-full py-3 text-white rounded-lg gradient-primary hover:opacity-90"
            >
              View My Tickets
            </button>
          </>
        ) : (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-2">Payment Failed</h2>
            <p className="text-muted mb-6">
              Unfortunately, your payment could not be processed. Please try again.
            </p>
            <div className="space-y-3">
              <button
                onClick={handleRetry}
                className="w-full py-3 text-white rounded-lg gradient-primary hover:opacity-90"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push("/user")}
                className="w-full py-3 border border-muted rounded-lg text-primary hover:bg-accent/50"
              >
                Go to Dashboard
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}