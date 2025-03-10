import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Hero from "../../components/Hero"; // Assuming you have a Hero component


const BlogPage = () => {
  const { blogId } = useParams();  // Get the blogId from the URL
  const [post, setPost] = useState(null);  // State to store the post data
  const [loading, setLoading] = useState(true);  // Loading state

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`);
      const data = await res.json();
      setPost(data);
      setLoading(false);
    };

    fetchPost();
  }, [blogId]);  // The effect will run when blogId changes

  if (loading) {
    return <p>Loading...</p>;  // Show loading text while the data is being fetched
  }


  return (
    <>
      <Hero title={post.title} subTitle={`Blog ${post.id}`}  gradientColor1="from-red-400" gradientColor2="to-amber-300" />


      <div className="content-container">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="card w-full bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className='badge badge-primary badge-lg'>{post.id}</div>
                  <h2 className="card-title">{post.title}</h2>
                  <p>{post.body}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogPage;
