import { CreditCard, Calendar, CheckCircle, Clock } from 'lucide-react'

export default function PaymentsPage() {
  const payments = [
    {
      id: 1,
      event: 'Tech Conference 2024',
      amount: 2500,
      date: 'Dec 10, 2024',
      method: 'Chapa',
      status: 'completed',
      transactionId: 'TXN123456789'
    },
    {
      id: 2,
      event: 'Music Festival',
      amount: 800,
      date: 'Dec 12, 2024',
      method: 'Bank Transfer',
      status: 'pending',
      transactionId: 'TXN987654321'
    }
  ]

  const totalSpent = payments.reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Payment History</h1>
        <div className="bg-surface border border-muted rounded-lg p-4">
          <p className="text-sm text-muted">Total Spent</p>
          <p className="text-xl font-bold text-primary">{totalSpent} ETB</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {payments.map((payment) => (
          <div key={payment.id} className="bg-surface border border-muted rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-primary">{payment.event}</h3>
                <p className="text-sm text-muted">Transaction ID: {payment.transactionId}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">{payment.amount} ETB</p>
                <div className="flex items-center space-x-1 mt-1">
                  {payment.status === 'completed' ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-yellow-500" />
                  )}
                  <span className={`text-xs font-medium ${
                    payment.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {payment.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm text-muted">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4" />
                <span>{payment.method}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{payment.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}