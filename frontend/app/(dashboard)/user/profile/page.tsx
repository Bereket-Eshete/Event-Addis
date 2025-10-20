"use client";

import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Calendar, Camera } from "lucide-react";
import { profileAPI } from "@/lib/api";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    dateOfBirth: ''
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
        phone: userData.phone || '',
        location: userData.location || '',
        dateOfBirth: userData.dateOfBirth ? userData.dateOfBirth.split('T')[0] : ''
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
      await profileAPI.updateProfile(formData);
      toast.success('Profile updated successfully');
      fetchProfile();
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-primary">
                Full Name
              </label>
              <div className="flex items-center p-3 space-x-2 border rounded-lg border-muted">
                <User className="w-4 h-4 text-muted" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
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
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
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
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
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
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
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
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="flex-1 bg-transparent outline-none text-primary"
                />
              </div>
            </div>
          </div>

          <div className="flex mt-6 space-x-4">
            <button 
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 text-white transition-opacity rounded-lg gradient-primary hover:opacity-90 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              onClick={() => setFormData({
                fullName: profile?.fullName || '',
                email: profile?.email || '',
                phone: profile?.phone || '',
                location: profile?.location || '',
                dateOfBirth: profile?.dateOfBirth ? profile.dateOfBirth.split('T')[0] : ''
              })}
              className="px-6 py-2 transition-colors border rounded-lg border-muted text-primary hover:bg-accent/50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
