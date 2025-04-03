import React from 'react'
import BlogsList from "./BlogsList";
import { getAllBlogs } from '../lib/blogs';

export default async function Page() {

    const allBlogList = await getAllBlogs();

    return <BlogsList allBlogList={allBlogList?.results?.data} />
}
