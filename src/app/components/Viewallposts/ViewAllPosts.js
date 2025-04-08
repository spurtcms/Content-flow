'use client';
import React, { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { GET_POSTS_LIST_QUERY } from '../../api/query';
import Post from './Post';
import ViewAllSkeleton from '../../utilities/Skeleton/ViewAllSkeleton';
import { fetchGraphQl } from '../../api/graphicql';
import { PostFilterApi } from '@/app/api/ServerSide/Post';
import { channel_name, defaultCategorySlug } from '@/app/api/url';
import NavBar from '../NavBar';
import { useSelector } from 'react-redux';

export default function ViewAllPostsComp() {
  const params = useSearchParams();
  const router = useRouter();
  const page = parseInt(params.get("page")) || 1; // Default to page 1
  const [postesData, setPostesData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [bannerShow, setBannerShow] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [scrollX, setscrollX] = useState(0);
  const postsPerPage = 6;

  const apiserver = async () => {
    // let varia={ "limit": 6, "offset": page,"requireData": {
    //   "authorDetails": true
    // },"categoryId":1}

    // let varia = { "commonFilter": { "limit": 6, "offset": page }, "entryFilter": { "categorySlug": defaultCategorySlug, }, "AdditionalData": { "authorDetails": true, "categories": true } }

    let varia ={
      "commonFilter": {
        "limit": 6,
        "offset": page,
        "keyword":""
      },
      "entryFilter": {
        "Status": "Publish",
        "categorySlug": defaultCategorySlug,
      },
      "AdditionalData": {
        "authorDetails": true,
        "categories": true
      }
    }


    let postdatas = await fetchGraphQl(GET_POSTS_LIST_QUERY, varia)
    setPostes(postdatas)
    console.log(postdatas,"postdatas")
    setLoader(true)
  }
  // apiserver()

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const posts = await PostFilterApi(postsPerPage, page, defaultCategorySlug);
      setPostesData(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const totalPosts = postesData?.ChannelEntriesList?.count || 0;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const currentPosts = postesData?.ChannelEntriesList?.channelEntriesList || [];

  const handlePrevious = () => {
    if (page > 1) {
      router.push(`/view-all-posts?page=${page - 1}`);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      router.push(`/view-all-posts?page=${page + 1}`);
    }
  };

  const post = useSelector((s) => s.customerRedux.postes_Redux_Func);

  return (
    <>
      <NavBar postes={post} setBannerShow={setBannerShow} bannerShow={bannerShow} activeIndex={activeIndex} setActiveIndex={setActiveIndex} scrollX={scrollX} setscrollX={setscrollX} />
      <div className="md:lg-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8 dark:text-white mb-10">
          {loader ? (
            <ViewAllSkeleton />
          ) : (
            currentPosts.map((data, index) => (
              <Fragment key={index}>
                <Post data={data} activeIndex={0} />
              </Fragment>
            ))
          )}
        </div>

        {totalPosts > postsPerPage && (
          <div className="mb-10 flex items-center justify-center">
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button onClick={handlePrevious} disabled={page === 1} className="relative inline-flex items-center gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300">
                <Image src="/img/arrow-left-colour.svg" alt="Previous" width={5} height={5} />
                <span>Previous</span>
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button key={index + 1} onClick={() => router.push(`/view-all-posts?page=${index + 1}`)} className={`relative inline-flex items-center border border-gray-300 bg-white px-3 py-2 text-sm font-medium hover:bg-blue-600  dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300
                  ${page === index + 1 ? 'text-blue-600 hover:bg-blue-500 border-blue-800' : 'text-gray-500 hover:bg-blue-50'} 
                  `}>
                  {index + 1}
                </button>
              ))}

              <button onClick={handleNext} disabled={page >= totalPages} className="relative inline-flex items-center gap-1 rounded-r-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium disabled:pointer-events-none disabled:opacity-40 text-gray-500 hover:bg-gray-50 focus:z-2 dark:bg-gray-800 dark:text-gray-300">
                <span>Next</span>
                <Image src="/img/arrow-right-colour.svg" alt="Next" width={5} height={5} />
              </button>
            </nav>
          </div>
        )}
      </div>
    </>
  );
}
