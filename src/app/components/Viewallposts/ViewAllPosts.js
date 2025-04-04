'use client'
import React, { Fragment, useEffect, useState } from 'react'
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { GET_POSTS_LIST_QUERY } from '../../api/query';
import Post from './Post';
import ViewAllSkeleton from '../../utilities/Skeleton/ViewAllSkeleton';
import { fetchGraphQl, fetchGraphQls } from '../../api/graphicql';
import { PostFilterApi } from '@/app/api/ServerSide/Post';
import { channel_name, defaultCategorySlug } from '@/app/api/url';


export default function ViewAllPostsComp() {
  const params = useSearchParams()
  const router = useRouter()
  let page = params.get("page")
  const [postes, setPostes] = useState([])
  const [loader, setLoader] = useState(false)
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
         "ChannelName": channel_name
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

  useEffect(() => {
    const fetchData = async () => {
      const posts = await PostFilterApi(6, page, defaultCategorySlug);
      setPostes(posts);
      setLoader(true);
    };

    fetchData();

  }, [page]);

  const handlePrevious = () => {
    let nextPage = parseInt(page) - 6
    router.push(`/view-all-posts?page=${nextPage}`)
  }
  const handleNext = () => {
    let nextPage = parseInt(page) + 6
    router.push(`/view-all-posts?page=${nextPage}`)
  }


  return (
    <>
      <div className="md:lg-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8 dark:text-white mb-10">
          {loader == true ? <> {postes?.ChannelEntriesList?.channelEntriesList?.map((data, index) => (<Fragment key={index}>
            <Post data={data} activeIndex={0} />

          </Fragment>))}</> :
            <>
              <ViewAllSkeleton />
            </>
          }

        </div>
        {postes?.ChannelEntriesList?.count > 6 &&
          <div className="mb-10 flex items-center justify-center">
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination"><button onClick={() => handlePrevious()} disabled={parseInt(page) > 0 ? false : true} className="relative inline-flex items-center gap-1 rounded-l-md border border-gray-300 bg-white px-3 py-2 pr-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300">
              <Image
                src="/img/arrow-left-colour.svg"
                alt="spurtCMS Profile Image"
                width={5}
                height={5}
                priority
              /><span>Previous</span></button>
              <button disabled={parseInt(page) == postes?.ChannelEntriesList?.count || parseInt(page) + parseInt(page) >= postes?.ChannelEntriesList?.count ? true : false} onClick={() => handleNext()} className={`relative inline-flex items-center gap-1 rounded-r-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium disabled:pointer-events-none disabled:opacity-40 text-gray-500 hover:bg-gray-50 focus:z-2 dark:bg-gray-800 dark:text-gray-300`}><span>Next</span>
                <Image
                  src="/img/arrow-right-colour.svg"
                  alt="spurtCMS Profile Image"
                  width={5}
                  height={5}
                  priority

                /></button></nav>
          </div>
        }
      </div>

    </>
  )
}
