import React,{useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import CallToAction from '../components/CallToAction.jsx';
import PostCard  from '../components/PostCard.jsx';
export default function Home() {
const [posts,setPosts] = useState([]);

useEffect(()=>{
    try {
      const fetchposts = async ()=>{
            const res = await fetch(`/api/post/getposts`);
            const data = await res.json();

            setPosts(data.posts);
      }
      fetchposts();
    } catch (error) {
      console.log(error);
    }

    
},[])
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Here you'll find a varietty of articles and tutorials on topics such
          as web devlopment, software engineering , and programming languages.
        </p>
      <Link to='/search' className='text-xs sm: text-sm text-teal-500 font-bold hover:underline'>
        View all posts
      </Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {
          posts && posts.length > 0 && (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-center pb-4"> Recent Posts</h2>
              <div className=" flex flex-wrap gap-4 items-center justify-center">
                {
                 posts.map((post)=>(
                  <PostCard key={post._id} post={post}/>
                 ))
                }
              </div>

              <div className="text-center mt-4">

              <Link  to={'/search'} className="text-lg text-teal-500 hover:underline" as={'div'}> View all posts</Link>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}
