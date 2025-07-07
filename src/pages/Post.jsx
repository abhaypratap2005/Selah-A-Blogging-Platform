import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-12">
            <Container>
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="relative">
                        <img
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-[400px] object-cover"
                        />
                        {isAuthor && (
                            <div className="absolute top-4 right-4 flex gap-3">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button
                                        bgColor="bg-blue-600"
                                        className="text-sm px-4 py-2 hover:bg-blue-700"
                                    >
                                        ✏️ Edit
                                    </Button>
                                </Link>
                                <Button
                                    bgColor="bg-red-600"
                                    className="text-sm px-4 py-2 hover:bg-red-700"
                                    onClick={deletePost}
                                >
                                    🗑️ Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            {post.title}
                        </h1>
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
