import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const EditYouTubeComments = () => {
  const [user, setUser] = useState(null);
  const [channel, setChannel] = useState(null);
  const [videoId, setVideoId] = useState('');
  const [comments, setComments] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
    scope: 'https://www.googleapis.com/auth/youtube.force-ssl'
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          setChannel(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const fetchComments = async () => {
    if (!user || !videoId) return;

    try {
      const response = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&access_token=${user.access_token}`
      );
      
      // Filter comments to only include those by the authenticated user
      const userComments = response.data.items.filter(
        item => item.snippet.topLevelComment.snippet.authorChannelId.value === channel.id
      );
      
      setComments(userComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Your YouTube Comments</h1>
      
      {!user ? (
        <Button onClick={() => login()} className="bg-red-600 hover:bg-red-700 text-white mb-4">
          Sign in with YouTube
        </Button>
      ) : (
        <div className="mb-4">
          <p>Logged in as: {channel?.name}</p>
          <Button onClick={() => setUser(null)} className="bg-gray-600 hover:bg-gray-700 text-white mt-2">
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