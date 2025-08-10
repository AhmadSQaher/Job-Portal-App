import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Save,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Upload,
  Download,
  Trash2,
} from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { user, userResume, updateResume, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const resume = userResume;
  const fileInputRef = useRef();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    title: "",
    bio: "",
    skills: [],
    experience: [],
    education: [],
  });

  // Initialize profile with user data
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        title: user.title || "",
        bio: user.bio || "",
        skills: user.skills || [],
        experience: user.experience || [],
        education: user.education || [],
      });
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmSave = async () => {
    try {
      const result = await updateUser(profile);
      if (result.success) {
        setIsEditing(false);
        setShowConfirmation(false);
      } else {
        alert("Failed to save changes: " + result.error);
      }
    } catch (error) {
      alert("An error occurred while saving changes");
    }
  };

  const handleCancelSave = () => {
    setShowConfirmation(false);
  };

  const handleDeleteAccount = async () => {
    try {
      const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';
      const response = await fetch(`${API_BASE}/api/users/${user._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        alert("Account deleted successfully. " + (result.deletedJobs || ""));
        logout(); // Sign out the user
        navigate('/'); // Redirect to home page
        // Don't close dialog here - component will unmount
      } else {
        const error = await response.json();
        alert("Failed to delete account: " + error.error);
        setShowDeleteConfirmation(false);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert("An error occurred while deleting the account");
      setShowDeleteConfirmation(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <button
              onClick={isEditing ? handleSaveClick : handleEdit}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </>
              )}
            </button>
          </div>

          {/* Confirmation Dialog */}
          {showConfirmation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Save Changes?</h2>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to save these changes to your profile?
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleCancelSave}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Confirmation Dialog */}
          {showDeleteConfirmation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4 text-red-600">Delete Account?</h2>
                <p className="text-gray-600 mb-6">
                  <strong>This action cannot be undone.</strong> Are you sure you want to permanently delete your account?
                  {user?.role === 'employer' && (
                    <span className="block mt-2 text-red-600 font-medium">
                      This will also delete all jobs you have posted.
                    </span>
                  )}
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowDeleteConfirmation(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) =>
                  setProfile({ ...profile, location: e.target.value })
                }
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </div>
          </div>

          {/* Professional Title */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Professional Title
            </label>
            <input
              type="text"
              value={profile.title}
              onChange={(e) =>
                setProfile({ ...profile, title: e.target.value })
              }
              disabled={!isEditing}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
            />
          </div>

          {/* Bio */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              disabled={!isEditing}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
            />
          </div>

          {/* Resume */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Resume
            </label>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {resume ? (
                  <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 text-blue-600 mr-2" />
                      <div>
                        <span className="text-gray-700">{resume.originalName || resume.name}</span>
                        {resume.uploadDate && (
                          <p className="text-gray-500 text-xs">
                            Uploaded on {new Date(resume.uploadDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        // Download resume from server if available, otherwise use local file
                        if (resume.filename && user?._id) {
                          const token = localStorage.getItem('token');
                          if (token) {
                            window.open(`/api/users/${user._id}/resume`, '_blank');
                            return;
                          }
                        }
                        
                        // Fallback to local file download if it's a File object
                        if (resume instanceof File) {
                          const url = URL.createObjectURL(resume);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = resume.name;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                        }
                      }}
                      className="ml-4 flex items-center text-blue-600 hover:text-blue-700"
                    >
                      <Download className="w-5 h-5 mr-1" />
                      Download
                    </button>
                  </div>
                ) : (
                  <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                    <p className="text-orange-700 font-medium">⚠ No resume uploaded</p>
                    <p className="text-orange-600 text-sm">Upload your resume to improve your job application success rate</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    updateResume(file);
                  }
                }}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="ml-4 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Upload className="w-4 h-4 mr-2" />
                {resume ? 'Update Resume' : 'Upload Resume'}
              </button>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills (separate with commas)
            </label>
            {isEditing ? (
              <textarea
                value={profile.skills.join(", ")}
                onChange={(e) => {
                  const skillsArray = e.target.value
                    .split(",")
                    .map(skill => skill.trim())
                    .filter(skill => skill.length > 0);
                  setProfile({ ...profile, skills: skillsArray });
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="e.g., JavaScript, React, Node.js"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Experience */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Experience
            </h3>
            <div className="space-y-6">
              {profile.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) => {
                            const newExp = [...profile.experience];
                            newExp[index] = { ...exp, title: e.target.value };
                            setProfile({ ...profile, experience: newExp });
                          }}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const newExp = [...profile.experience];
                            newExp[index] = { ...exp, company: e.target.value };
                            setProfile({ ...profile, experience: newExp });
                          }}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                        <input
                          type="text"
                          value={exp.duration}
                          onChange={(e) => {
                            const newExp = [...profile.experience];
                            newExp[index] = { ...exp, duration: e.target.value };
                            setProfile({ ...profile, experience: newExp });
                          }}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., 2020 - Present"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          value={exp.description}
                          onChange={(e) => {
                            const newExp = [...profile.experience];
                            newExp[index] = { ...exp, description: e.target.value };
                            setProfile({ ...profile, experience: newExp });
                          }}
                          rows={4}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      {profile.experience.length > 1 && (
                        <button
                          onClick={() => {
                            const newExp = profile.experience.filter((_, i) => i !== index);
                            setProfile({ ...profile, experience: newExp });
                          }}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove this experience
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      <h4 className="font-semibold text-gray-900">{exp.title}</h4>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.duration}</p>
                      <p className="text-gray-700 mt-2">{exp.description}</p>
                    </>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={() => {
                    setProfile({
                      ...profile,
                      experience: [
                        ...profile.experience,
                        { title: "", company: "", duration: "", description: "" }
                      ]
                    });
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-800"
                >
                  + Add another experience
                </button>
              )}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <GraduationCap className="w-5 h-5 mr-2" />
              Education
            </h3>
            <div className="space-y-6">
              {profile.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => {
                            const newEdu = [...profile.education];
                            newEdu[index] = { ...edu, degree: e.target.value };
                            setProfile({ ...profile, education: newEdu });
                          }}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
                        <input
                          type="text"
                          value={edu.school}
                          onChange={(e) => {
                            const newEdu = [...profile.education];
                            newEdu[index] = { ...edu, school: e.target.value };
                            setProfile({ ...profile, education: newEdu });
                          }}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                        <input
                          type="text"
                          value={edu.duration}
                          onChange={(e) => {
                            const newEdu = [...profile.education];
                            newEdu[index] = { ...edu, duration: e.target.value };
                            setProfile({ ...profile, education: newEdu });
                          }}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g., 2016 - 2020"
                        />
                      </div>
                      {profile.education.length > 1 && (
                        <button
                          onClick={() => {
                            const newEdu = profile.education.filter((_, i) => i !== index);
                            setProfile({ ...profile, education: newEdu });
                          }}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove this education
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                      <p className="text-gray-600">{edu.school}</p>
                      <p className="text-sm text-gray-500">{edu.duration}</p>
                    </>
                  )}
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={() => {
                    setProfile({
                      ...profile,
                      education: [
                        ...profile.education,
                        { degree: "", school: "", duration: "" }
                      ]
                    });
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-800"
                >
                  + Add another education
                </button>
              )}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-red-600 mb-3">Danger Zone</h3>
            <p className="text-gray-600 text-sm mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button
              onClick={handleDeleteClick}
              className="flex items-center px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
