import { useState } from "react";
import PostCard from "../PostCard/PostCard";
import { getPosts } from "../../../../services/getPosts";
import { useEffect } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then((data) => {
        setPosts(data);
      }).catch((error) => {
        console.error("Erro ao buscar posts:", error);
        setPosts([]);
      }).finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null; // or return a loading spinner
  }

  if (posts.length === 0) {
    return (
      <div className="grid gap-4 relative z-20">
        <p className="text-center text-gray-500">CREATE RIGHT NOW A POST FOR YOUR PUBLIC</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 relative z-20">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          fullName={post.fullName}
          username={post.username}
          date={post.created_at}
          likes={post.likes}
          content={post.content}
        />
      ))}
    </div>
  )
}

export default Posts;
