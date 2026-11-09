export interface Freelancer {
  id: string;
  name: string;
  handle: string;
  title: string;
  avatar: string;
  hourlyRate: number;
  rating: number;
  reviewsCount: number;
  completedJobs: number;
  earnedAmount: string;
  location: string;
  countryCode: string;
  verified: boolean;
  topRated: boolean;
  bio: string;
  skills: string[];
  availability: 'Available Now' | 'Part-time' | 'In 2 weeks';
}

export interface JobGig {
  id: string;
  title: string;
  clientName: string;
  clientVerified: boolean;
  budgetType: 'Fixed' | 'Hourly';
  budgetAmount: string;
  level: 'Intermediate' | 'Expert' | 'Entry';
  timePosted: string;
  proposalsCount: number;
  category: string;
  description: string;
  tags: string[];
  location: string;
}

export interface TalentCategory {
  id: string;
  name: string;
  description: string;
  talentCount: string;
  startingRate: string;
  skills: string[];
}