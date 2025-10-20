export const viewTicket = (ticket: any) => {
  // Create a new window for viewing the ticket
  const ticketWindow = window.open('', '_blank', 'width=700,height=800,scrollbars=yes');
  
  if (!ticketWindow) return;

  const ticketHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>EventAddis Ticket - ${ticket.eventId?.title}</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          margin: 0; 
          padding: 20px; 
          background: #f5f5f5;
        }
        .ticket {
          background: white;
          max-width: 600px;
          margin: 0 auto;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .ticket-header {
          background: linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .ticket-body {
          padding: 30px;
        }
        .event-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .ticket-number {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 20px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin: 20px 0;
        }
        .info-item {
          border-left: 3px solid #8B5CF6;
          padding-left: 15px;
        }
        .info-label {
          font-size: 12px;
          color: #666;
          text-transform: uppercase;
          margin-bottom: 5px;
        }
        .info-value {
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }
        .qr-section {
          text-align: center;
          padding: 20px;
          background: #f8f9fa;
          margin: 20px 0;
          border-radius: 8px;
        }
        .footer {
          text-align: center;
          padding: 20px;
          color: #666;
          font-size: 12px;
          border-top: 1px dashed #ddd;
        }
        .close-btn {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #8B5CF6;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }
        .close-btn:hover {
          background: #7C3AED;
        }
      </style>
    </head>
    <body>
      <button class="close-btn" onclick="window.close()">Close</button>
      
      <div class="ticket">
        <div class="ticket-header">
          <div class="event-title">${ticket.eventId?.title || 'Event'}</div>
          <div class="ticket-number">Ticket #EA-${ticket._id.slice(-6).toUpperCase()}</div>
          <div style="font-size: 14px; opacity: 0.9;">EventAddis Official Ticket</div>
        </div>
        
        <div class="ticket-body">
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Date & Time</div>
              <div class="info-value">
                ${new Date(ticket.eventId?.startAt).toLocaleDateString()}<br>
                ${new Date(ticket.eventId?.startAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
            
            <div class="info-item">
              <div class="info-label">Venue</div>
              <div class="info-value">${ticket.eventId?.venue || 'TBD'}</div>
            </div>
            
            <div class="info-item">
              <div class="info-label">Quantity</div>
              <div class="info-value">${ticket.quantity} Ticket(s)</div>
            </div>
            
            <div class="info-item">
              <div class="info-label">Status</div>
              <div class="info-value" style="color: #10B981; text-transform: capitalize;">
                ${ticket.status}
              </div>
            </div>
            
            <div class="info-item">
              <div class="info-label">Amount Paid</div>
              <div class="info-value">${ticket.totalAmount} ETB</div>
            </div>
            
            <div class="info-item">
              <div class="info-label">Booking Date</div>
              <div class="info-value">${new Date(ticket.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
          
          <div class="qr-section">
            <div style="font-size: 14px; margin-bottom: 10px; color: #666;">
              Present this ticket at the venue
            </div>
            <div style="font-family: monospace; font-size: 12px; background: white; padding: 10px; border-radius: 4px; display: inline-block;">
              ${ticket._id}
            </div>
          </div>
        </div>
        
        <div class="footer">
          <div>EventAddis - Your Gateway to Amazing Events</div>
          <div style="margin-top: 5px;">For support, contact us at support@eventaddis.com</div>
        </div>
      </div>
    </body>
    </html>
  `;

  ticketWindow.document.write(ticketHTML);
  ticketWindow.document.close();
};