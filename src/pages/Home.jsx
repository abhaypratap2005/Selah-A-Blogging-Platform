// Home.jsx
import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import bannerImage from "../components/assets/banner.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService.getPosts().then((res) => {
      if (res) setPosts(res.documents);
    });
  }, []);

  const handleExploreClick = () => {
    navigate("/login");
  };

  // Show banner only when not authenticated
  if (!authStatus) {
    return (
      <div className="w-full min-h-screen bg-gray-900">
        {/* Banner Section */}
        <section className="relative h-screen w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-800/90 z-10"></div>
          <img
            src={bannerImage}
            alt="Hero Banner"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-100 mb-4 drop-shadow-lg">
              Welcome to Selah
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mb-8">
              Discover insightful articles and stories curated for curious minds
            </p>
            <div className="flex gap-4">
              <button 
                className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded-full font-medium transition-all text-lg"
                onClick={handleExploreClick}
              >
                Explore Posts
              </button>
              <button 
                className="px-8 py-3 bg-gray-800/80 hover:bg-gray-700/80 text-gray-100 rounded-full font-medium backdrop-blur-sm transition-all text-lg"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Show all posts when authenticated
  return (
    <div className="w-full min-h-screen bg-gray-900 pt-20">
      <div className="w-full py-0">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">All Blog Posts</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Explore our complete collection of articles
            </p>
          </div>
          
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {posts.map((post) => (
                <PostCard key={post.$id} {...post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 max-w-2xl mx-auto">
              <div className="bg-gray-800 p-10 rounded-2xl shadow-xl border border-gray-700">
                <h2 className="text-3xl font-bold text-gray-100 mb-4">
                  No Posts Yet
                </h2>
                <p className="text-gray-400 mb-8 text-lg">
                  Be the first to create a post!
                </p>
                <button 
                  className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded-full font-medium transition-colors text-lg"
                  onClick={() => navigate("/add-post")}
                >
                  Create Post
                </button>
              </div>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Home;