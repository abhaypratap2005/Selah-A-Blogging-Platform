// src/components/PostCard.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import appwriteService from "../appwrite/config";
import { Pencil, Trash2 } from "lucide-react";

export default function PostCard({ $id, title, featuredImage, userid }) {
  const userData = useSelector((state) => state.auth.userData);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (!featuredImage) {
      setImageUrl(null);
      return;
    }

    let isMounted = true;
    const loadImage = async () => {
      try {
        // getFileView may return a string URL or an object with .href
        const result = await appwriteService.getFileView(featuredImage);
        const url = (typeof result === 'object' && result.href) ? result.href : result;
        if (isMounted) setImageUrl(url);
      } catch (err) {
        console.error("Failed to load image URL:", err);
        if (isMounted) setImageUrl(null);
      }
    };

    loadImage();
    return () => { isMounted = false };
  }, [featuredImage]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      const ok = await appwriteService.deletePost($id);
      if (ok) {
        alert("Post deleted.");
        window.location.reload();
      } else {
        alert("Failed to delete post.");
      }
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("An error occurred.");
    }
  };

  return (
    <div className='w-full bg-gray-100 rounded-xl p-4'>
      <div className='w-full mb-4'>
        <Link to={`/post/${$id}`}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 animate-pulse rounded-t-lg" />
          )}
        </Link>
      </div>

      <h2 className='text-xl font-bold mb-2'>
        <Link to={`/post/${$id}`} className="hover:underline">
          {title}
        </Link>
      </h2>

      {userData?.$id === userid && (
        <div className="mt-2 flex justify-end gap-2">
          <Link
            to={`/edit-post/${$id}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-800 text-white text-xs font-medium rounded hover:bg-blue-700 transition duration-200"
          >
            <Pencil size={14} />
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700 transition duration-200"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
