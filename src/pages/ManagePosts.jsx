import React, { useEffect, useState } from 'react';
import { getPosts, deletePost } from '../utils/api';
import { Link } from 'react-router-dom';
import { FileText, Edit, Trash2 } from 'lucide-react';
import BackButton from '../components/BackButton';

export default function ManagePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    // Ask for confirmation before deleting
    if (window.confirm('Are you sure you want to delete this post permanently?')) {
      try {
        await deletePost(id);
        // Remove the post from the UI instantly
        setPosts(posts.filter(p => p._id !== id));
      } catch (err) {
        alert(err.message);
      }
    }
  };

  if (loading) return <p className="p-8 text-center">Loading posts...</p>;

  return (
    <div className="bg-slate-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
       <BackButton />
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-8">
          <FileText className="text-teal-600" />
          Manage Posts
        </h1>

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Created</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{post.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/admin/edit/${post.slug}`} className="text-teal-600 hover:text-teal-900 mr-4">
                      <Edit size={20} className="inline-block" />
                    </Link>
                    <button onClick={() => handleDelete(post._id)} className="text-red-600 hover:text-red-900">
                      <Trash2 size={20} className="inline-block" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}