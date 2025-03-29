import moment from 'moment'
import Image from 'next/image'
import React from 'react'
import { imageUrl, imageUrlAlt } from '../utilities/ImagePath'

export default function Banner({ bannerShow, router }) {

  const imageLoader = ({ src }) => {
    return src
  }
  const handleNavigation = (slug) => {
    router.push(`/posts/${slug}`)
  }


  return (
    <>
    
      {bannerShow?.length != 0 &&
        <div className="block">
          <div className='h-[512px]'>
            <img
              src={`${bannerShow?.[0]?.coverImage}`}
              alt="spurtCMS Banner"
              className="cursor-pointer h-full w-image"
              width={1200}
              height={1000}
              priority
              onClick={() => handleNavigation(bannerShow?.[0]?.slug)}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "/img/no-image.png";
              }}
            />
          </div>
          <div className="flex sm:flex-row flex-col mt-8 gap-x-2 gap-y-4 pb-10 mb-8 border-b border-gray-200">
            <div className="w-full max-w-full mt-0 sm:w-7/12">
              <h1 className="text-4xl2 font-bold text-black line-clamp-2 cursor-pointer" onClick={() => handleNavigation(bannerShow?.[0]?.slug)}>{bannerShow?.[0]?.title}</h1>
              <p className="text-base text-black my-3">{moment(bannerShow?.[0]?.createdOn).format("MMM DD, YYYY")}</p>
              <div className="flex items-center gap-x-2">
                <div className="flex items-center justify-center relative h-8 w-8 overflow-hidden rounded-full bg-slate-300 ">
                  {bannerShow?.[0] ?
                    <>
                      {bannerShow?.[0]?.authorDetails?.firstName?.[0] ?
                        <span className="text-3xxl text-white ">{bannerShow?.[0]?.authorDetails?.firstName?.[0]}</span>
                        :
                        <>
                          <img
                            loader={imageLoader}
                            src={`/img/user1.jpg`}
                            alt="spurtCMS Profile Image"
                            width={32}
                            height={32}
                            priority
                          />
                        </>}
                    </>
                    : <img
                      loader={imageLoader}
                      src={`${imageUrl}${bannerShow?.[0]?.authorDetails?.profileImagePath}`}
                      alt="spurtCMS Profile Image"
                      width={32}
                      height={32}
                      priority
                    />}
                </div>
                <div className="">
                  <a className="text-primary text-base">{bannerShow?.[0]?.authorDetails?.firstName} {bannerShow?.[0]?.authorDetails?.lastName} </a>
                </div>
              </div>
            </div>
            <div className=" max-w-full w-full sm:w-5/12">
              <div className="text-lg text-current font-light line-clamp-4 desc">
                <div dangerouslySetInnerHTML={{ __html: bannerShow?.[0]?.description.replaceAll("<br>", " ").replace(/p-\[24px_60px_10px\]/g, "") }} />
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
