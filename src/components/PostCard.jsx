import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import appwriteService from "../appwrite/config";
import { Pencil, Trash2 } from "lucide-react";

function PostCard({ $id, title, featuredImage, userid }) {
    const userData = useSelector((state) => state.auth.userData);

    // Delete handler
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (confirmDelete) {
            const status = await appwriteService.deletePost($id);
            if (status) {
                alert("Post deleted.");
                window.location.reload(); // Or use a callback to update state if you're avoiding reload
            }
        }
    };

    return (
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <Link to={`/post/${$id}`}>
                    <img
                        src={appwriteService.getFileView(featuredImage)}
                        alt={title}
                        className="w-full h-48 object-cover rounded-t-lg"
                    />
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

export default PostCard;
