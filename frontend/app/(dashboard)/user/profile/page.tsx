import { User, Mail, Phone, MapPin, Calendar, Camera } from "lucide-react";

export default function ProfilePage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-primary">Profile Settings</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Pictures */}
        <div className="p-6 border rounded-lg bg-surface border-muted">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 rounded-full bg-primary">
                <span className="text-2xl font-bold text-white">M</span>
              </div>
              <button className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 border-2 rounded-full bg-accent border-surface">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <h3 className="font-semibold text-primary">Meron Tadesse</h3>
            <p className="text-sm text-muted">Event Enthusiast</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="p-6 border rounded-lg lg:col-span-2 bg-surface border-muted">
          <h3 className="mb-4 text-lg font-semibold text-primary">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-primary">
                Full Name
              </label>
              <div className="flex items-center p-3 space-x-2 border rounded-lg border-muted">
                <User className="w-4 h-4 text-muted" />
                <input
                  type="text"
                  defaultValue="Meron Tadesse"
                  className="flex-1 bg-transparent outline-none text-primary"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-primary">
                Email
              </label>
              <div className="flex items-center p-3 space-x-2 border rounded-lg border-muted">
                <Mail className="w-4 h-4 text-muted" />
                <input
                  type="email"
                  defaultValue="meron@example.com"
                  className="flex-1 bg-transparent outline-none text-primary"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-primary">
                Phone
              </label>
              <div className="flex items-center p-3 space-x-2 border rounded-lg border-muted">
                <Phone className="w-4 h-4 text-muted" />
                <input
                  type="tel"
                  defaultValue="+251 911 123 456"
                  className="flex-1 bg-transparent outline-none text-primary"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-primary">
                Location
              </label>
              <div className="flex items-center p-3 space-x-2 border rounded-lg border-muted">
                <MapPin className="w-4 h-4 text-muted" />
                <input
                  type="text"
                  defaultValue="Addis Ababa, Ethiopia"
                  className="flex-1 bg-transparent outline-none text-primary"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-primary">
                Date of Birth
              </label>
              <div className="flex items-center p-3 space-x-2 border rounded-lg border-muted">
                <Calendar className="w-4 h-4 text-muted" />
                <input
                  type="date"
                  defaultValue="1995-06-15"
                  className="flex-1 bg-transparent outline-none text-primary"
                />
              </div>
            </div>
          </div>

          <div className="flex mt-6 space-x-4">
            <button className="px-6 py-2 text-white transition-opacity rounded-lg gradient-primary hover:opacity-90">
              Save Changes
            </button>
            <button className="px-6 py-2 transition-colors border rounded-lg border-muted text-primary hover:bg-accent/50">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
