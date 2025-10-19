"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Globe,
  Building,
  Camera,
  Save,
  Eye,
  EyeOff,
  Bell,
  Shield,
} from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Bereket Tadesse",
    email: "bereketeshete63@gmail.com",
    phone: "+251953386120",
    organizationName: "Tech Events Ethiopia",
    organizationWebsite: "https://techevents.et",
    bio: "Passionate event organizer focused on bringing the tech community together in Addis Ababa.",
    location: "Addis Ababa, Ethiopia",
    socialMedia: {
      twitter: "@berekettech",
      linkedin: "bereket-eshete",
      facebook: "techeventseth",
    },
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    emailBookings: true,
    emailMessages: true,
    emailMarketing: false,
    pushBookings: true,
    pushMessages: true,
    pushMarketing: false,
  });

  const tabs = [
    { id: "profile", name: "Profile Information", icon: User },
    { id: "security", name: "Security", icon: Shield },
    { id: "notifications", name: "Notifications", icon: Bell },
  ];

  const handleProfileUpdate = () => {
    console.log("Updating profile:", profileData);
  };

  const handlePasswordChange = () => {
    console.log("Changing password");
  };

  const handleNotificationUpdate = () => {
    console.log("Updating notifications:", notifications);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Profile & Settings</h1>
        <p className="mt-1 text-muted">
          Manage your account information and preferences
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="p-6 card">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary">
              <span className="text-2xl font-bold text-white">B</span>
            </div>
            <button className="absolute flex items-center justify-center w-8 h-8 transition-colors rounded-full -bottom-1 -right-1 bg-accent hover:bg-accent/80">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-primary">
              {profileData.fullName}
            </h2>
            <p className="text-muted">{profileData.organizationName}</p>
            <div className="flex items-center mt-2 space-x-4 text-sm text-muted">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                {profileData.email}
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                {profileData.phone}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted">Member since</div>
            <div className="font-semibold text-primary">January 2024</div>
          </div>
        </div>
      </div>

      {/* Tabs and Content */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="p-4 card">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-left ${
                      activeTab === tab.id
                        ? "bg-primary text-white"
                        : "text-primary hover:bg-surface"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="p-6 card">
            {/* Profile Information Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-primary">
                  Profile Information
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-primary">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-muted" />
                      <input
                        type="text"
                        className="w-full py-3 pl-10 pr-4 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                        value={profileData.fullName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            fullName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-primary">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-muted" />
                      <input
                        type="email"
                        className="w-full py-3 pl-10 pr-4 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-primary">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-muted" />
                      <input
                        type="tel"
                        className="w-full py-3 pl-10 pr-4 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-primary">
                      Organization Name
                    </label>
                    <div className="relative">
                      <Building className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-muted" />
                      <input
                        type="text"
                        className="w-full py-3 pl-10 pr-4 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                        value={profileData.organizationName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            organizationName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-primary">
                      Website
                    </label>
                    <div className="relative">
                      <Globe className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-muted" />
                      <input
                        type="url"
                        className="w-full py-3 pl-10 pr-4 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                        value={profileData.organizationWebsite}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            organizationWebsite: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2 text-sm font-medium text-primary">
                      Bio
                    </label>
                    <textarea
                      className="w-full p-4 border rounded-lg resize-none border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={4}
                      value={profileData.bio}
                      onChange={(e) =>
                        setProfileData({ ...profileData, bio: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleProfileUpdate}
                    className="flex items-center px-6 py-3 space-x-2 rounded-lg btn-primary"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-primary">
                  Security Settings
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-primary">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full py-3 pl-4 pr-10 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                        value={securityData.currentPassword}
                        onChange={(e) =>
                          setSecurityData({
                            ...securityData,
                            currentPassword: e.target.value,
                          })
                        }
                      />
                      <button
                        type="button"
                        className="absolute transform -translate-y-1/2 right-3 top-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5 text-muted" />
                        ) : (
                          <Eye className="w-5 h-5 text-muted" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-primary">
                      New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                      value={securityData.newPassword}
                      onChange={(e) =>
                        setSecurityData({
                          ...securityData,
                          newPassword: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-primary">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                      value={securityData.confirmPassword}
                      onChange={(e) =>
                        setSecurityData({
                          ...securityData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handlePasswordChange}
                    className="px-6 py-3 rounded-lg btn-primary"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-primary">
                  Notification Preferences
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="mb-4 font-semibold text-primary">
                      Email Notifications
                    </h4>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span className="text-primary">
                          New bookings and cancellations
                        </span>
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded text-primary focus:ring-primary border-muted"
                          checked={notifications.emailBookings}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              emailBookings: e.target.checked,
                            })
                          }
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-primary">
                          Messages from attendees
                        </span>
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded text-primary focus:ring-primary border-muted"
                          checked={notifications.emailMessages}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              emailMessages: e.target.checked,
                            })
                          }
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-primary">
                          Marketing and promotions
                        </span>
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded text-primary focus:ring-primary border-muted"
                          checked={notifications.emailMarketing}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              emailMarketing: e.target.checked,
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-4 font-semibold text-primary">
                      Push Notifications
                    </h4>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span className="text-primary">
                          New bookings and cancellations
                        </span>
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded text-primary focus:ring-primary border-muted"
                          checked={notifications.pushBookings}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              pushBookings: e.target.checked,
                            })
                          }
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-primary">
                          Messages from attendees
                        </span>
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded text-primary focus:ring-primary border-muted"
                          checked={notifications.pushMessages}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              pushMessages: e.target.checked,
                            })
                          }
                        />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-primary">
                          Marketing and promotions
                        </span>
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded text-primary focus:ring-primary border-muted"
                          checked={notifications.pushMarketing}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              pushMarketing: e.target.checked,
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleNotificationUpdate}
                    className="flex items-center px-6 py-3 space-x-2 rounded-lg btn-primary"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Preferences</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
