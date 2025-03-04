/* eslint-disable react/prop-types */

const BlogPage = async ({ params: { id } }) => {

    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const post = await res.json();
    return (
        <>
            <h1>{post.id} <br />{post.title}</h1>

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

export default BlogPage