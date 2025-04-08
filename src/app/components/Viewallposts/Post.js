'use client'
import React from 'react'
import Link from 'next/link'
import moment from "moment";
import Image from 'next/image';
import { imageUrl, imageUrlAlt } from '@/app/utilities/ImagePath';
import DOMPurify from 'dompurify';
export default function Post({ data, activeIndex, scrollX }) {

  const imageLoader = ({ src }) => {
    return src
  }

  const sanitizeHTML = (html) => {
    const sanitized = DOMPurify.sanitize(html, {
        // FORBID_TAGS: ['h1', 'img'], // Remove <h1> and <img> tags
        FORBID_ATTR: ['style'], // Remove inline styles for consistency
    });
    // Remove first <img> tag found in the sanitized HTML
    return sanitized
        .replace(/<br\s*\/?>/g, " ") // Replace <br> tags with spaces
            .replace(/<div className="card[^"]*"(.*?)<\/div>/g, '') // Remove specific <div> tags
            .replace(/<img[^>]*>/g, "") // Remove all <img> tags
            .replace(/<h1[^>]*>.*?<\/h1>/, "") // Remove the first <h1> tag and its content
            .replace(/p-\[24px_60px_10px\]/g, "") // Remove specific styles
            .replace(/<\/?[^>]+(>|$)/g, "") // Remove all remaining HTML tags
            .split(/\s+/) // Split text into words
            // .slice(0, 32) // Limit to the first 35 words
            .join(" ") // Join the words back into a string
            .concat("...") // Add ellipsis if text is truncated
};

  return (
    <>

      <div className="flex flex-col">
        <Link href={`/posts/${data.slug}`}>
          <div className="mb-6 block h-[236px]">
            {data.coverImage ?
              <img
                loader={imageLoader}
                src={`${data.coverImage}`}
                alt="spurtCMS card image"
                width={1000}
                height={1000}
                priority
                layout="responsive"
                blurDataURL={`${data.coverImage}`}
                className='h-full-imp'
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "/img/no-image.png";
                }}
              />
              :

              <Image
                loader={imageLoader}
                src={`/img/no-image.png`}
                alt="spurtCMS card image"
                width={1000}
                height={1000}
                priority
                layout="responsive"
                className='h-full-imp'
              />
            }
          </div>
          <h1 className="text-3xxl font-bold  text-black dark:text-white hover:underline line-clamp-1 overflow-hidden  leading-[2.625rem] "> {data.title}</h1></Link>
        <p className="text-base text-black dark:text-white my-3">{moment(data.createdOn).format("MMM DD, YYYY")} </p>
        <div className="text-lg text-current  font-light line-clamp-3 mb-3 desc">
          {/* <div dangerouslySetInnerHTML={{ __html: data?.description.replaceAll("<br>", "").replaceAll(/<img[^>]*>/g, "").replace(/p-\[24px_60px_10px\]/g, "") }}></div> */}
          <div className="dark:text-white text-black  text-lg font-light line-clamp-3 overflow-hidden mb-3 desc "
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHTML(data?.description)
                                }}
                            ></div>
        </div>
        <div className="flex items-center gap-x-2 mt-auto">
          <div className="flex items-center justify-center relative h-8 w-8 overflow-hidden rounded-full bg-slate-300 dark:text-white">
            {data?.authorDetails?.profileImagePath == "" || data?.authorDetails?.profileImagePath == null ?
              <>
                {data?.authorDetails?.FirstName ?
                  <span className="text-3xxl text-white">{data?.authorDetails?.firstName == "" || data?.authorDetails?.firstName == null ? data?.authorDetails?.firstName?.[0] : ""}</span>
                  :
                  <Image
                    loader={imageLoader}
                    src={`/img/user1.jpg`}
                    alt="spurtCMS Profile Image"
                    width={32}
                    height={32}
                    priority
                  />}</>
              : <img
                loader={imageLoader}
                src={`${imageUrl}${data?.authorDetails?.profileImagePath}`}
                alt="spurtCMS Profile Image"
                width={32}
                height={32}
                priority

              />
            }
          </div>
          <div className="">
            <a className="text-primary text-base"> {data?.authorDetails?.firstName} {data?.authorDetails?.lastName} </a>
          </div>
        </div>
      </div>

    </>
  )
}
