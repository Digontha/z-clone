import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface JobItem {
  id: string;
  title: string;
  rate: string;
  rateType: 'Hourly' | 'Fixed';
  experience: 'Entry' | 'Intermediate' | 'Expert';
  category: string;
  timePosted: string;
  duration: string;
  description: string;
  skills: string[];
  clientName: string;
  country: string;
  paymentVerified: boolean;
  bookmarked?: boolean;
}

export function useJobs() {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      if (data && data.length > 0) {
        const formatted: JobItem[] = data.map((item) => ({
          id: item.id,
          title: item.title,
          rate: item.rate,
          rateType: (item.rate_type || 'Hourly') as 'Hourly' | 'Fixed',
          experience: (item.experience || 'Intermediate') as 'Entry' | 'Intermediate' | 'Expert',
          category: item.category,
          timePosted: item.time_posted,
          duration: item.duration,
          description: item.description,
          skills: Array.isArray(item.skills) ? item.skills : [],
          clientName: item.client_name,
          country: item.country,
          paymentVerified: !!item.payment_verified,
          bookmarked: !!item.bookmarked,
        }));
        setJobs(formatted);
      }
    } catch (err: any) {
      console.error('Error fetching jobs from Supabase:', err);
      setError(err.message || 'Failed to load jobs from database');
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = async (jobId: string, currentBookmarked: boolean) => {
    // Optimistic UI update
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, bookmarked: !currentBookmarked } : job
      )
    );

    try {
      const { error: updateError } = await supabase
        .from('jobs')
        .update({ bookmarked: !currentBookmarked })
        .eq('id', jobId);

      if (updateError) throw updateError;
    } catch (err: any) {
      console.error('Error updating bookmark:', err);
      // Revert if error
      setJobs((prev) =>
        prev.map((job) =>
          job.id === jobId ? { ...job, bookmarked: currentBookmarked } : job
        )
      );
    }
  };

  const submitProposal = async (jobId: string, bidRate: string, coverLetter: string) => {
    const { data, error: insertError } = await supabase
      .from('proposals')
      .insert({
        job_id: jobId,
        bid_rate: bidRate,
        cover_letter: coverLetter,
        freelancer_name: 'Elena Rostova',
      })
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }
    return data;
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    jobs,
    loading,
    error,
    fetchJobs,
    toggleBookmark,
    submitProposal,
  };
}