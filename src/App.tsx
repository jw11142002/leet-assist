import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LeetCodeStats } from './types/leetcode';

function App() {
  const [username, setUsername] = useState<string>('');
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchStats = async () => {
    if (!username) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get<LeetCodeStats>(`http://localhost:5001/api/leetcode/stats/${username}`);
      setStats(response.data);
    } catch (err) {
      setError('Error fetching LeetCode stats. Please check the username and try again.');
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col space-y-4">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter LeetCode username"
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={fetchStats}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {loading ? 'Loading...' : 'Get Stats'}
                  </button>
                </div>

                {error && (
                  <div className="text-red-500 mt-4">
                    {error}
                  </div>
                )}

                {stats && (
                  <div className="mt-8 space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900">LeetCode Statistics</h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold">Total Solved</h3>
                        <p>{stats.totalSolved}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold">Ranking</h3>
                        <p>{stats.ranking}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold">Easy Solved</h3>
                        <p>{stats.easySolved} / {stats.totalEasy}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold">Medium Solved</h3>
                        <p>{stats.mediumSolved} / {stats.totalMedium}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold">Hard Solved</h3>
                        <p>{stats.hardSolved} / {stats.totalHard}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold">Contribution Points</h3>
                        <p>{stats.contributionPoint}</p>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">Recent Submissions</h3>
                      <div className="space-y-4">
                        {stats.recentSubmissions.map((submission, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold">{submission.title}</h4>
                            <p className="text-sm text-gray-600">
                              {new Date(submission.timestamp * 1000).toLocaleDateString()} - {submission.lang}
                            </p>
                            <p className={`text-sm ${
                              submission.statusDisplay === 'Accepted' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {submission.statusDisplay}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
