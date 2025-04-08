'use client'
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { GET_POSTS_LIST_QUERY } from "../../api/query";
import { fetchGraphQl } from "../../api/graphicql";
import Banner from "../Banner";
// import BannerSkeleton from "../../utilities/Skeleton/BannerSkeleton";
import NavBar from "../NavBar";
import ViewAllSkeleton from "../../utilities/Skeleton/ViewAllSkeleton";
import Post from "../Viewallposts/Post";
import BannerSkeleton from "@/app/utilities/Skeleton/BannerSkeleton";
import NodataImg from "../NodataImg";
import { PostFilterApi } from "@/app/api/ServerSide/Post";
import { defaultCategorySlug } from "@/app/api/url";


export default function HomePage({ Listdata , postdatas }) {
   console.log(Listdata,"Listdata")
  // let cateId=0
  const router = useRouter()
  const searchParams = useSearchParams()
  const [postes, setPostes] = useState([])
  const [postesCategory, setPostesCategory] = useState(Listdata)
  const [bannerShow, setBannerShow] = useState([])
  const [activeIndex, setActiveIndex] = useState(null)
  const [scrollX, setscrollX] = useState(0);
  const [loader, setLoader] = useState(false)
  const [triger, setTriger] = useState(0)
   console.log(searchParams,"seacnsdjkfsd")

  console.log(Listdata, "kkkkkkkkk")
  const popstate = usePathname()
  let cateId = null

  cateId = searchParams.get('cateId')

  // const apiserver = async () => {
  //   let variable_list
  //   if (cateId == null) {
  //     setActiveIndex(cateId)
  //     variable_list = { "commonFilter": { "limit": 10, "offset": 0 }, "entryFilter": { "categorySlug": defaultCategorySlug, }, "AdditionalData": { "authorDetails": true, "categories": true } }
  //     // { "limit": 10, "offset": 0,"requireData": {
  //     //   "authorDetails": true
  //     // },"categoryId":1}
  //   } else {
  //     setActiveIndex(cateId)

  //     //  variable_list={ "limit": 10, "offset": 0,categoryId:parseInt(cateId),"requireData": {
  //     //   "authorDetails": true
  //     // }}

  //     variable_list = { "commonFilter": { "limit": 10, "offset": 0 }, "entryFilter": { "categorySlug": cateId, }, "AdditionalData": { "authorDetails": true, "categories": true } }
  //     // { "commonFilter":{"limit": 10, "offset": 0},"additionalData": {
  //     //   "authorDetails": true}, "entryFilter": {"categoryId":parseInt(cateId)}}
  //   }
  //   let postdat = await fetchGraphQl(GET_POSTS_LIST_QUERY, variable_list)
  //   setPostes(postdat)
  //   setLoader(true)
  // }
  useEffect(() => {

    const fetchData = async (limit, offset, category) => {
      setLoader(false);
      const posts = await PostFilterApi(limit, offset, category)

      handlePostSplit(posts)
    };

    if (cateId) {
      fetchData(10, 0, cateId)
    } else {
      fetchData(10, 0, defaultCategorySlug)
    }

    // if (cateId) {
    //   const posts = PostFilterApi(10, 0, cateId)
    //   handlePostSplit(posts)
    // } else {
    //   const posts = PostFilterApi(10, 0, defaultCategorySlug)
    //   handlePostSplit(posts)
    // }
  }, [cateId])


  // useEffect(() => {
  //   if (postdatas) {
  //     handlePostSplit(postdatas)
  //   }
  // }, [postdatas])


  // useEffect(() => {
  //   handlePostesMore()

  // }, [postes])

  // const handlePostesMore = () => {
  //   let listEntry = []
  //   let banner = []
  //   postes?.ChannelEntriesList?.channelEntriesList?.map((data, i) => {
  //     if (data.featuredEntry == 1 && cateId == null) {
  //       banner.push(data)
  //       setBannerShow(banner)

  //     } else {
  //       listEntry.push(data)
  //     }
  //   })
  //   if (listEntry.length) {
  //     postes.ChannelEntriesList.channelEntriesList = listEntry
  //   }

  // }

  const handlePostSplit = (posts) => {
    if (cateId) {
      setPostes(posts?.ChannelEntriesList?.channelEntriesList)
      setLoader(true)
    } else {
      const banner = posts?.ChannelEntriesList?.channelEntriesList?.filter((post) => post?.featuredEntry == 1)
      setBannerShow(banner)
      setLoader(true)
      const post = posts?.ChannelEntriesList?.channelEntriesList?.filter((post) => post?.featuredEntry !== 1)
      setPostes(post)

    }
  }

  useEffect(() => {
    window.addEventListener('popstate', (e) => {
      if (e) {
        if (popstate === '/') {
          window.location.reload()
        }
      }
    })
    // console.log(e,"user clicked back button")
  }, [popstate])
   

   console.log(postesCategory, "postesCategory")
  return (
    <>
      {loader == true ?
        <>
          {/* <spurt-editor toke=""  data="{}" view="view" ></spurt-editor> */}
      <div className="md:lg-0">

        {postesCategory?.CategoryList?.categorylist &&
          <NavBar postes={postesCategory} setBannerShow={setBannerShow} bannerShow={bannerShow} activeIndex={activeIndex} setActiveIndex={setActiveIndex} scrollX={scrollX} setscrollX={setscrollX} />}
        {postes?.length != 0 ?
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8 mb-10">

              {loader == true ? <>
                {postes?.map((data, index) => (
                  index < 4 &&
                  <Fragment key={index}>
                    <Post data={data} activeIndex={activeIndex} scrollX={scrollX} />
                  </Fragment>

                ))}
              </> : 
              <>
              <ViewAllSkeleton />
              </>
              }

            </div>
            <>
              {postes?.length > 4 && <>
                <div className="border-b border-gray-200 block mb-8 "></div>
                <h1 className="text-3xxl font-bold text-black mb-10"> More Stories </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8 mb-10">
                  {loader == true ? <> {postes?.map((data, index) => (
                    index >= 4 && index < 6 &&
                    <Fragment key={index}>
                      <Post data={data} activeIndex={0} />
                    </Fragment>
                  ))}</> : 
                  <>
                  <ViewAllSkeleton />
                  </>
                  }

                </div>
                {postes?.length > 6 &&
                  <div className="mt-10 mb-10 flex justify-center">

                    <Link href={"/view-all-posts?page=0"} className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 cursor-pointer"><span>View all Posts</span></Link>

                  </div>}

              </>}

            </>
          </>
          :
          <>
            {loader == true &&
              <NodataImg />}
          </>
        }
      </div>
          
        </>
        : <><BannerSkeleton /></>
      }






    </>
  );
}
