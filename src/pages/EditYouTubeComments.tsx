import React from 'react';
import { Button } from "@/components/ui/button";

// EditYouTubeComments component
const EditYouTubeComments = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Your YouTube Comments</h1>
      
      {/* Video ID input */}
      <div className="mb-6">
        <label htmlFor="videoId" className="block text-sm font-medium text-gray-700 mb-2">
          YouTube Video ID
        </label>
        <input
          type="text"
          id="videoId"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter YouTube Video ID"
        />
      </div>
      
      {/* Fetch Comments button */}
      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-lg mb-8">
        Fetch Comments
      </Button>
      
      {/* Comments table placeholder */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Placeholder row */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Placeholder comment text
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                John Doe
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</Button>
                <Button className="text-red-600 hover:text-red-900">Delete</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditYouTubeComments;