"use client";

import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Calendar, Camera } from "lucide-react";
import { profileAPI } from "@/lib/api";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await profileAPI.getProfile();
      const userData = response.data;
      setProfile(userData);
      setFormData({
        fullName: userData.fullName || '',
        email: userData.email || '',
        contactNumber: userData.contactNumber || ''
      });
    } catch (error) {
      toast.error('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updateData = {
        fullName: formData.fullName,
        contactNumber: formData.contactNumber
      };
      await profileAPI.updateProfile(updateData);
      toast.success('Profile updated successfully');
      setHasChanges(false);
      fetchProfile();
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-primary">Profile Settings</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Pictures */}
        <div className="p-6 border rounded-lg bg-surface border-muted">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 rounded-full bg-primary">
                <span className="text-2xl font-bold text-white">
                  {profile?.fullName?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <button className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 border-2 rounded-full bg-accent border-surface">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <h3 className="font-semibold text-primary">{profile?.fullName}</h3>
            <p className="text-sm text-muted">Event Enthusiast</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="p-6 border rounded-lg lg:col-span-2 bg-surface border-muted">
          <h3 className="mb-4 text-lg font-semibold text-primary">
            Personal Information
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-primary">
                Full Name
              </label>
              <div className="flex items-center p-3 space-x-2 border rounded-lg border-muted bg-surface">
                <User className="w-4 h-4 text-muted" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="flex-1 bg-transparent outline-none text-primary placeholder-muted"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-primary">
                Email
              </label>
              <div className="flex items-center p-3 space-x-2 border rounded-lg border-muted bg-muted/20">
                <Mail className="w-4 h-4 text-muted" />
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="flex-1 bg-transparent outline-none text-primary cursor-not-allowed"
                />
              </div>
              <p className="mt-1 text-xs text-muted">Email cannot be changed</p>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-primary">
                Phone Number
              </label>
              <div className="flex items-center p-3 space-x-2 border rounded-lg border-muted bg-surface">
                <Phone className="w-4 h-4 text-muted" />
                <input
                  type="tel"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                  className="flex-1 bg-transparent outline-none text-primary placeholder-muted"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row mt-6 gap-3 sm:gap-4">
            <button 
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className="px-6 py-2 text-white transition-opacity rounded-lg gradient-primary hover:opacity-90 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            {hasChanges && (
              <p className="text-xs text-amber-600 mt-1">You have unsaved changes</p>
            )}
            <button 
              onClick={() => {
                setFormData({
                  fullName: profile?.fullName || '',
                  email: profile?.email || '',
                  contactNumber: profile?.contactNumber || ''
                });
                setHasChanges(false);
              }}
              disabled={!hasChanges}
              className="px-6 py-2 transition-colors border rounded-lg border-muted text-primary hover:bg-accent/50 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
