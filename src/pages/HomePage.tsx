import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQuery, useMutation } from '@tanstack/react-query';

const HomePage = () => {
  const { user, signOut } = useAuth();

  const addRandomNumber = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      throw new Error('No active session');
    }

    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/add-random-number`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add random number');
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: addRandomNumber,
    onSuccess: (data) => {
      toast.success(`Random number ${data.data.number} added successfully!`);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
      console.error('Error details:', error);
    },
  });

  const handleTestEdgeFunction = () => {
    mutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          {user && (
            <div className="flex justify-end mb-4">
              <p className="mr-4">Signed in as: {user.email}</p>
              <Button 
                onClick={signOut} 
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm"
              >
                Sign Out
              </Button>
            </div>
          )}
          <p className="text-blue-400 mb-4">Make 💬 Comments Conversational</p>
          <h1 className="text-5xl font-bold mb-6">YouTube Bulk Comments Reply</h1>
          <p className="text-xl mb-8">Respond to all comments efficiently, gain audience insights, and increase engagement. AskReply is your YouTube bulk comment reply tool built in 5 free tokens!</p>
          <div className="flex justify-center space-x-4">
            <Link to="/edit-comments">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg">
                Boost Your YouTube Engagement Today
              </Button>
            </Link>
            <Button 
              onClick={handleTestEdgeFunction}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg"
            >
              Test Edge Fct
            </Button>
          </div>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-16">
          <img src="/images/dashboard-preview.png" alt="Dashboard Preview" className="w-full rounded-lg" />
        </div>

        <div className="text-center mb-16">
          <div className="inline-block bg-gray-800 rounded-full px-6 py-3">
            <p className="text-lg">"I love using AskReply, easy to use and big time saver!"</p>
            <div className="flex items-center justify-center mt-4">
              <img src="/images/user-avatar.png" alt="User Avatar" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="font-bold">Mira</p>
                <p className="text-gray-400">PowerSeller</p>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Bulk Comments Reply to Streamline your Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">All comments are displayed in an Excel-like view</h3>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Write, Copy-paste, Add emoji</h3>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Export to CSV for deeper analysis</h3>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg">
              Manage Comments Faster - Try it Free
            </Button>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">3 Easy Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">1. Sign-in to Google</h3>
              <p>Open AskReply on Google Chrome, click "sign in" with Google account and choose your Channel</p>
              <Button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mt-4">
                Sign in to YouTube
              </Button>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">2. Add Video ID</h3>
              <p>Select the video you want to pull and answer comments by copying the Video ID in the URL of your browser</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">3. Answer Comments</h3>
              <p>In column "Answer", add your text in front of comment or update then once done, click "Insert Replies"</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">There are many apps to help with direct messages or testimonials, but what about comments?</h2>
          <div className="bg-gray-800 p-6 rounded-lg">
            <p className="text-lg mb-4">"Comments are extremely valuable: they serve as testimonials, surface leads, and provide feedback for creators. However, they can be hard to manage, and that's why AskReply YouTube bulk comment reply was created."</p>
            <div className="flex items-center">
              <img src="/images/founder-avatar.png" alt="Founder Avatar" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="font-bold">Aurelien</p>
                <p className="text-gray-400">AskReply Founder</p>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center">
          <h2 className="text-3xl font-bold mb-6">Increase Engagement with Ease</h2>
          <p className="text-xl mb-8">Reply to every comment, and sparking lively conversations around your brand</p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg">
            Unlock Efficient Commenting - Get Started
          </Button>
          <p className="mt-8 text-sm text-gray-400">© 2024 - AskReply.social</p>
          <div className="mt-4">
            <a href="#" className="text-sm text-gray-400 hover:text-white mr-4">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white mr-4">Terms of Service</a>
            <Link to="/edit-comments" className="text-sm text-gray-400 hover:text-white">Edit Your YouTube Comments</Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;