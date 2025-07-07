import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";
import { Query } from "appwrite";
import { useSelector } from 'react-redux';

function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);
    
    // Debug log - keep this to verify data
    console.log("Redux userData:", userData);

    useEffect(() => {
        if (userData?.$id) {
            setLoading(true);
            console.log("Fetching posts for user:", userData.$id);
            
            // FIX: Pass queries correctly - remove extra array
            appwriteService.getPosts([
                Query.equal("userid", userData.$id)
            ])
            .then((res) => {
                console.log("Received posts:", res);
                setPosts(res?.documents || []);
            })
            .catch((err) => {
                console.error("Error fetching posts:", err);
            })
            .finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [userData]);

    if (loading) {
        return (
            <div className='w-full py-8 text-center'>
                <Container>
                    <h2 className='text-xl font-semibold'>Loading your posts...</h2>
                </Container>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className='w-full py-8 text-center'>
                <Container>
                    <h2 className='text-xl font-semibold'>Please log in to view your posts</h2>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className='w-full py-8 text-center'>
                <Container>
                    <h2 className='text-xl font-semibold'>You haven't created any posts yet.</h2>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default MyPosts;