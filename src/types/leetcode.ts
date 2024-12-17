export interface LeetCodeStats {
  totalSolved: number;
  totalSubmissions: {
    difficulty: string;
    count: number;
    submissions: number;
  }[];
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  contributionPoint: number;
  reputation: number;
  submissionCalendar: Record<string, number>;
  recentSubmissions: {
    title: string;
    titleSlug: string;
    timestamp: number;
    statusDisplay: string;
    lang: string;
  }[];
  matchedUserStats: {
    acSubmissionNum: {
      difficulty: string;
      count: number;
      submissions: number;
    }[];
  };
}
