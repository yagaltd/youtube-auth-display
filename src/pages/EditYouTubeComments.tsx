import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import axios from 'axios';

// Function to fetch YouTube comments
const fetchYouTubeComments = async (videoId, apiKey) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/commentThreads', {
      params: {
        part: 'snippet',
        videoId: videoId,
        key: apiKey,
        maxResults: 100 // Adjust as needed
      }
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching YouTube comments:', error);
    return [];
  }
};

const EditYouTubeComments = () => {
  const { user, signIn, signOut } = useAuth();
  const [videoId, setVideoId] = useState('');
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Replace with your actual YouTube API key
  const YOUTUBE_API_KEY = 'YOUR_YOUTUBE_API_KEY';

  const handleFetchComments = async () => {
    if (!videoId) {
      setError('Please enter a valid YouTube video ID');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const fetchedComments = await fetchYouTubeComments(videoId, YOUTUBE_API_KEY);
      setComments(fetchedComments);
    } catch (err) {
      setError('Failed to fetch comments. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Your YouTube Comments</h1>
      
      {!user ? (
        <Button onClick={signIn} className="bg-red-600 hover:bg-red-700 text-white mb-4">
          Sign in with Supabase
        </Button>
      ) : (
        <div className="mb-4">
          <p>Logged in as: {user.email}</p>
          <Button onClick={signOut} className="bg-gray-600 hover:bg-gray-700 text-white mt-2">
            Logout
          </Button>
        </div>
      )}
      
      {user && (
        <>
          <div className="mb-6">
            <label htmlFor="videoId" className="block text-sm font-medium text-gray-700 mb-2">
              YouTube Video ID
            </label>
            <Input
              type="text"
              id="videoId"
              value={videoId}
              onChange={(e) => setVideoId(e.target.value)}
              placeholder="Enter YouTube Video ID"
              className="w-full"
            />
          </div>
          
          <Button 
            onClick={handleFetchComments} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-lg mb-8"
            disabled={!videoId || isLoading}
          >
            {isLoading ? 'Fetching Comments...' : 'Fetch Comments'}
          </Button>
          
          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          {comments.length > 0 && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {comments.map((comment) => (
                    <tr key={comment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {comment.snippet.topLevelComment.snippet.authorDisplayName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {comment.snippet.topLevelComment.snippet.textDisplay}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</Button>
                        <Button className="text-red-600 hover:text-red-900">Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EditYouTubeComments;