"use client";

import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Globe,
  Building,
  Camera,
  Save,
  Loader,
} from "lucide-react";
import { profileAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    organizationName: "",
    organizationWebsite: "",
    role: "",
    createdAt: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [originalData, setOriginalData] = useState<any>({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await profileAPI.getProfile();
      const userData = response.data;
      setProfileData({
        fullName: userData.fullName || '',
        email: userData.email || '',
        contactNumber: userData.contactNumber || '',
        organizationName: userData.organizationName || '',
        organizationWebsite: userData.organizationWebsite || '',
        role: userData.role || '',
        createdAt: userData.createdAt || '',
      });
      setOriginalData(userData);
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      setSaving(true);
      await profileAPI.updateProfile({
        fullName: profileData.fullName,
        contactNumber: profileData.contactNumber,
        organizationName: profileData.organizationName,
        organizationWebsite: profileData.organizationWebsite,
      });
      toast.success('Profile updated successfully');
      setIsEditing(false);
      fetchProfile(); // Refresh data
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setProfileData({
      fullName: originalData.fullName || '',
      email: originalData.email || '',
      contactNumber: originalData.contactNumber || '',
      organizationName: originalData.organizationName || '',
      organizationWebsite: originalData.organizationWebsite || '',
      role: originalData.role || '',
      createdAt: originalData.createdAt || '',
    });
    setIsEditing(false);
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

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 text-muted">Loading profile...</span>
        </div>
      ) : (
        <>
          {/* Profile Overview Card */}
          <div className="p-6 card">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary">
                  <span className="text-2xl font-bold text-white">
                    {profileData.fullName?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <button className="absolute flex items-center justify-center w-8 h-8 transition-colors rounded-full -bottom-1 -right-1 bg-accent hover:bg-accent/80">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-primary">
                  {profileData.fullName || 'No name set'}
                </h2>
                <p className="text-muted">{profileData.organizationName || 'No organization'}</p>
                <div className="flex items-center mt-2 space-x-4 text-sm text-muted">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {profileData.email}
                  </div>
                  {profileData.contactNumber && (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      {profileData.contactNumber}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted">Member since</div>
                <div className="font-semibold text-primary">
                  {profileData.createdAt ? new Date(profileData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Unknown'}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="p-6 card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-primary">Profile Information</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm rounded-lg btn-primary"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 text-sm border rounded-lg border-muted text-muted hover:bg-surface"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleProfileUpdate}
                    disabled={saving}
                    className="flex items-center px-4 py-2 space-x-2 text-sm rounded-lg btn-primary disabled:opacity-50"
                  >
                    {saving && <Loader className="w-4 h-4 animate-spin" />}
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-primary">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-muted" />
                  <input
                    type="text"
                    className={`w-full py-3 pl-10 pr-4 border rounded-lg border-muted text-primary focus:outline-none focus:ring-2 focus:ring-primary ${
                      isEditing ? 'bg-surface' : 'bg-gray-50 cursor-not-allowed'
                    }`}
                    value={profileData.fullName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        fullName: e.target.value,
                      })
                    }
                    disabled={!isEditing}
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
                    className="w-full py-3 pl-10 pr-4 border rounded-lg border-muted bg-gray-50 text-primary cursor-not-allowed"
                    value={profileData.email}
                    disabled
                  />
                </div>
                <p className="mt-1 text-xs text-muted">Email cannot be changed</p>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-primary">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-muted" />
                  <input
                    type="tel"
                    className={`w-full py-3 pl-10 pr-4 border rounded-lg border-muted text-primary focus:outline-none focus:ring-2 focus:ring-primary ${
                      isEditing ? 'bg-surface' : 'bg-gray-50 cursor-not-allowed'
                    }`}
                    value={profileData.contactNumber}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        contactNumber: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-primary">
                  Role
                </label>
                <div className="relative">
                  <User className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-muted" />
                  <input
                    type="text"
                    className="w-full py-3 pl-10 pr-4 border rounded-lg border-muted bg-gray-50 text-primary cursor-not-allowed capitalize"
                    value={profileData.role}
                    disabled
                  />
                </div>
                <p className="mt-1 text-xs text-muted">Role cannot be changed</p>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-primary">
                  Organization Name
                </label>
                <div className="relative">
                  <Building className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-muted" />
                  <input
                    type="text"
                    className={`w-full py-3 pl-10 pr-4 border rounded-lg border-muted text-primary focus:outline-none focus:ring-2 focus:ring-primary ${
                      isEditing ? 'bg-surface' : 'bg-gray-50 cursor-not-allowed'
                    }`}
                    value={profileData.organizationName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        organizationName: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    placeholder="Enter organization name"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-primary">
                  Organization Website
                </label>
                <div className="relative">
                  <Globe className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-muted" />
                  <input
                    type="url"
                    className={`w-full py-3 pl-10 pr-4 border rounded-lg border-muted text-primary focus:outline-none focus:ring-2 focus:ring-primary ${
                      isEditing ? 'bg-surface' : 'bg-gray-50 cursor-not-allowed'
                    }`}
                    value={profileData.organizationWebsite}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        organizationWebsite: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
