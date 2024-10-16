import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import axios from 'axios';

const EditYouTubeComments = () => {
  const { user, signIn, signOut } = useAuth();
  const [videoId, setVideoId] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // You may want to fetch user-specific data here if needed
  }, [user]);

  const fetchComments = async () => {
    if (!user || !videoId) return;

    try {
      // This is a placeholder. You'll need to implement the actual YouTube API call
      // using the user's YouTube credentials, which you'll need to link to their Supabase account
      const response = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&access_token=YOUR_ACCESS_TOKEN`
      );
      
      setComments(response.data.items || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
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
            onClick={fetchComments} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-lg mb-8"
            disabled={!videoId}
          >
            Fetch Comments
          </Button>
          
          {comments.length > 0 && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {comments.map((comment) => (
                    <tr key={comment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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