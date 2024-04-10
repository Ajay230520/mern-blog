import React, { useEffect, useState } from "react";
import { Button, Select, TextInput } from "flowbite-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import PostCard from "../components/PostCard";
export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(sidebarData);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length > 0) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = async (e) => {
    if (e.target.id === "searchTerm") {
      const data = e.target.value;
      setSidebarData({
        ...sidebarData,
        searchTerm: data,
      });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({
        ...sidebarData,
        sort: order,
      });
    }
    if (e.target.id === "category") {
      const order = e.target.value || "uncategorized";

      setSidebarData({
        ...sidebarData,
        category: order,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category || 'uncategorized');
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async(e)=>{
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex',startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${
        searchQuery
    }`);
    if(!res.ok){
        return;
    }
    if(res.ok){
        const data = await res.json();
        setPosts([...posts,...data.posts]);
        if(data.posts.length === 9){
            setShowMore(true);
        }else{
            setShowMore(false);
        }
    }
  }
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label
              htmlFor=""
              className="whitespace-nowrap">
              Search Tearm:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label
              htmlFor=""
              className="font-semibold ">
              Sort:
            </label>
            <Select
              onChange={handleChange}
              value={sidebarData.sort}
              id="sort">
              <option value="desc"> Latest</option>
              <option value="asc">oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label
              htmlFor="category"
              className="font-semibold ">
              Category:
            </label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id="category">
              <option value="uncategorized">Uncategorized</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
              <option value="javascript">Javascript</option>
            </Select>
          </div>
          <Button
            gradientDuoTone="purpleToBlue"
            outline
            type="submit">
            Apply filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:boder-b border-gray-500 p-3 mt-5">
          Posts results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-200">No posts found</p>
          )}
          {loading && <p className="text-xl text-gray-500">Loading....</p>}
          {!loading && posts && posts.map((post) => <PostCard key={post._id} post={post} />)}
          {
            showMore && <button onClick={handleShowMore}  className="text-teal-500 hover:underline p-7 w-full">Show More</button>
          }
        </div>
      </div>
    </div>
  );
}
