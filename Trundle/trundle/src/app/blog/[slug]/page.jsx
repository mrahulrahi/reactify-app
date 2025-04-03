import React from 'react'
import BlogById from "./BlogById";
import { getBlogsById, getRecentBlogs } from '../../lib/blogs';

export default async function Page({ params }) {

    const { slug } = params;

    let blogDetails;

    let recentBlogsList;

    try {
        blogDetails = await getBlogsById(slug);
        recentBlogsList = await getRecentBlogs();
    } catch (error) {
        throw error;
    }

    return <BlogById
        recentBlogsList={recentBlogsList?.data}
        blogDetails={blogDetails?.data}
    />
}
