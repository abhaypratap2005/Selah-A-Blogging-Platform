import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData); // ✅ Get current user

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((fetchedPost) => {
                if (fetchedPost) {
                    // ✅ Check if logged-in user is the owner
                    if (fetchedPost.userid === userData?.$id) {
                        setPost(fetchedPost);
                    } else {
                        // ❌ Not the owner: redirect or show message
                        alert("You are not authorized to edit this post.");
                        navigate('/');
                    }
                } else {
                    navigate('/');
                }
            });
        } else {
            navigate('/');
        }
    }, [slug, userData, navigate]);

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPost;
