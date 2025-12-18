import PostCard from "../PostCard/PostCard";
import posts from "../../../../data/posts";

function Posts() {
    return (
        <div className="grid gap-4 relative z-20">

        {posts.map((post) => (
          <PostCard
            key={post.id}
            fullName={post.fullName}
            username={post.username}
            date={post.date}
            likes={post.likes}
            content={post.content}
          />
        ))}

        </div>
    )
}

export default Posts;
