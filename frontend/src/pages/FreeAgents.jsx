import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, MapPin, Mail, Briefcase, Download } from "lucide-react";

const FreeAgents = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        console.log('Fetching users with token:', token);
        const response = await fetch('/api/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || data.details || 'Failed to fetch users');
        }

        console.log('Users fetched:', data);
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Free Agents</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                  {user.title && (
                    <p className="text-gray-600 flex items-center mt-1">
                      <Briefcase className="w-4 h-4 mr-2" />
                      {user.title}
                    </p>
                  )}
                </div>
              </div>

              {user.location && (
                <p className="text-gray-600 flex items-center mb-3">
                  <MapPin className="w-4 h-4 mr-2" />
                  {user.location}
                </p>
              )}

              <p className="text-gray-600 flex items-center mb-3">
                <Mail className="w-4 h-4 mr-2" />
                {user.email}
              </p>

              {user.bio && (
                <p className="text-gray-700 mb-4 line-clamp-3">{user.bio}</p>
              )}

              {user.skills && user.skills.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {user.hasResume && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={async () => {
                      try {
                        const token = localStorage.getItem('token');
                        const response = await fetch(`/api/users/${user._id}/resume`, {
                          headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/pdf,application/msword'
                          },
                          credentials: 'include'
                        });
                        if (!response.ok) {
                          const errorData = await response.text();
                          console.error('Resume download failed:', {
                            status: response.status,
                            statusText: response.statusText,
                            error: errorData
                          });
                          throw new Error(`Failed to download resume: ${response.status} ${response.statusText}`);
                        }
                        const blob = await response.blob();
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `${user.name}-resume${response.headers.get('content-type') === 'application/pdf' ? '.pdf' : '.doc'}`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        window.URL.revokeObjectURL(url);
                      } catch (err) {
                        console.error('Error downloading resume:', err);
                        alert('Failed to download resume. Please try again.');
                      }
                    }}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    <span className="mr-2">Download Resume</span>
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreeAgents;
