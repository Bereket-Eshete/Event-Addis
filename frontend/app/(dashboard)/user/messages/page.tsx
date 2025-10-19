import { MessageSquare, Clock, User } from 'lucide-react'

export default function MessagesPage() {
  const messages = [
    {
      id: 1,
      from: 'EventAddis Support',
      subject: 'Welcome to EventAddis!',
      preview: 'Thank you for joining EventAddis. Here\'s how to get started...',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      from: 'Tech Conference Organizer',
      subject: 'Event Update: Tech Conference 2024',
      preview: 'Important updates regarding the upcoming conference...',
      time: '1 day ago',
      read: true
    },
    {
      id: 3,
      from: 'EventAddis Team',
      subject: 'Your ticket is confirmed',
      preview: 'Your ticket for Music Festival has been confirmed...',
      time: '3 days ago',
      read: true
    }
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Messages</h1>
      
      <div className="space-y-2">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`bg-surface border border-muted rounded-lg p-4 cursor-pointer hover:bg-accent/50 transition-colors ${
              !message.read ? 'border-l-4 border-l-primary' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className={`font-medium ${!message.read ? 'text-primary font-semibold' : 'text-primary'}`}>
                    {message.from}
                  </h3>
                  <p className={`text-sm ${!message.read ? 'text-primary font-medium' : 'text-muted'}`}>
                    {message.subject}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted">
                <Clock className="h-3 w-3" />
                <span>{message.time}</span>
              </div>
            </div>
            
            <p className="text-sm text-muted ml-11 line-clamp-2">
              {message.preview}
            </p>
            
            {!message.read && (
              <div className="ml-11 mt-2">
                <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}