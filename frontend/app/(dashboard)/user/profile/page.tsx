import { User, Mail, Phone, MapPin, Calendar, Camera } from 'lucide-react'

export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">Profile Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture */}
        <div className="bg-surface border border-muted rounded-lg p-6">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">M</span>
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center border-2 border-surface">
                <Camera className="h-4 w-4 text-white" />
              </button>
            </div>
            <h3 className="font-semibold text-primary">Meron Tadesse</h3>
            <p className="text-sm text-muted">Event Enthusiast</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="lg:col-span-2 bg-surface border border-muted rounded-lg p-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Personal Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Full Name</label>
              <div className="flex items-center space-x-2 p-3 border border-muted rounded-lg">
                <User className="h-4 w-4 text-muted" />
                <input 
                  type="text" 
                  defaultValue="Meron Tadesse"
                  className="flex-1 bg-transparent text-primary outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Email</label>
              <div className="flex items-center space-x-2 p-3 border border-muted rounded-lg">
                <Mail className="h-4 w-4 text-muted" />
                <input 
                  type="email" 
                  defaultValue="meron@example.com"
                  className="flex-1 bg-transparent text-primary outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Phone</label>
              <div className="flex items-center space-x-2 p-3 border border-muted rounded-lg">
                <Phone className="h-4 w-4 text-muted" />
                <input 
                  type="tel" 
                  defaultValue="+251 911 123 456"
                  className="flex-1 bg-transparent text-primary outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Location</label>
              <div className="flex items-center space-x-2 p-3 border border-muted rounded-lg">
                <MapPin className="h-4 w-4 text-muted" />
                <input 
                  type="text" 
                  defaultValue="Addis Ababa, Ethiopia"
                  className="flex-1 bg-transparent text-primary outline-none"
                />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-primary mb-2">Date of Birth</label>
              <div className="flex items-center space-x-2 p-3 border border-muted rounded-lg">
                <Calendar className="h-4 w-4 text-muted" />
                <input 
                  type="date" 
                  defaultValue="1995-06-15"
                  className="flex-1 bg-transparent text-primary outline-none"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <button className="px-6 py-2 gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity">
              Save Changes
            </button>
            <button className="px-6 py-2 border border-muted text-primary rounded-lg hover:bg-accent/50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}