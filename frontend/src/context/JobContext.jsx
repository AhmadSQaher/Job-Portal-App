import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAuth } from './AuthContext';

const JobContext = createContext();

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobContext must be used within a JobContextProvider');
  }
  return context;
};

export const JobContextProvider = ({ children }) => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const saved = localStorage.getItem('favoriteIds');
    return saved ? JSON.parse(saved) : [];
  });
  const [appliedIds, setAppliedIds] = useState(() => {
    const saved = localStorage.getItem('appliedIds');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Add initial load tracking
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Refresh jobs when auth state changes
  useEffect(() => {
    if (user) {
      console.log('Auth state changed, refreshing jobs...');
      refreshJobs();
    }
  }, [user]);

  const refreshJobs = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const addToFavorites = (jobId) => {
    const newFavoriteIds = [...favoriteIds, jobId];
    localStorage.setItem('favoriteIds', JSON.stringify(newFavoriteIds));
    setFavoriteIds(newFavoriteIds);
    toast.success('Added to favorites');
  };

  const removeFromFavorites = (jobId) => {
    const newFavoriteIds = favoriteIds.filter(id => id !== jobId);
    localStorage.setItem('favoriteIds', JSON.stringify(newFavoriteIds));
    setFavoriteIds(newFavoriteIds);
    toast.success('Removed from favorites');
  };

  const applyToJob = async (jobId) => {
    if (!appliedIds.includes(jobId)) {
      try {
        // You can add an API call here to submit the application to the backend
        // For now, we'll just update the local state
        const newAppliedIds = [...appliedIds, jobId];
        localStorage.setItem('appliedIds', JSON.stringify(newAppliedIds));
        setAppliedIds(newAppliedIds);
        
        // Dispatch a custom event to notify other components
        window.dispatchEvent(new CustomEvent('applicationUpdated', {
          detail: { jobId, action: 'apply' }
        }));
        
        toast.success('Application submitted successfully');
        return true;
      } catch (error) {
        console.error('Error applying to job:', error);
        toast.error('Failed to submit application');
        return false;
      }
    }
    toast.error('You have already applied to this job');
    return false;
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        console.log('Fetching jobs...');
        const token = localStorage.getItem('token');
        const response = await fetch('/api/jobs', {
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
          }
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            console.log('Unauthorized, trying public endpoint...');
            // If unauthorized, try fetching without auth token as some routes might be public
            const publicResponse = await fetch('/api/jobs');
            if (publicResponse.ok) {
              const data = await publicResponse.json();
              console.log('Public jobs fetched successfully:', data.length, 'jobs');
              setJobs(Array.isArray(data) ? data : []);
              return;
            }
          }
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        console.log('Jobs fetched successfully:', data.length, 'jobs');
        setJobs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast.error('Failed to load jobs');
        setJobs([]); // Set empty array on error
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
    };

    // Fetch jobs on mount or when dependencies change
    fetchJobs();
  }, [refreshTrigger]);

  return (
    <JobContext.Provider 
      value={{ 
        jobs, 
        loading,
        refreshJobs,
        favoriteIds,
        appliedIds,
        addToFavorites,
        removeFromFavorites,
        applyToJob,
        isJobFavorited: (jobId) => favoriteIds.includes(jobId),
        hasAppliedToJob: (jobId) => appliedIds.includes(jobId)
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export default JobContextProvider;
