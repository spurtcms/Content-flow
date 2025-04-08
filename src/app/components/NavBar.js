'use client'
import React, { useEffect } from 'react'
import { useState, useRef } from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { postes_Redux_Func } from '@/StoreConfiguration/slices/customer';

export default function NavBar({ postes, setBannerShow, bannerShow, activeIndex, setActiveIndex, setscrollX, scrollX }) {
  // const searchParams = useSearchParams()
  const router = useRouter()
  let scrl = useRef(null);
  const [scrolEnd, setscrolEnd] = useState(true);
  let scroll = 0

  const slide = (shift) => {
    scrl.current.scrollLeft += shift;

    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };
  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };
  useEffect(() => {
    if (scroll != null) {
      if (scrl.current) {
        scrl.current.scrollLeft = scroll;
      }
    } else {
      if (scrl.current) {
        scrl.current.scrollLeft = 0;
      }
    }
  }, [scroll, scrl])
  useEffect(() => {
    if (scrl.current) {
      if (
        Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
        scrl.current.offsetWidth
      ) {
        setscrolEnd(true);
      } else {

        setscrolEnd(false);
      }
    }
  }, [scrl])

  
  const handleActive = (id) => {
    setActiveIndex(id)
    setBannerShow([])
    if (id == null) {
      router.push(`/`)
    } else {
      router.push(`/?cateId=${id}&scroll=${scrollX}`)

    }
  }

  const dispatch = useDispatch();

  console.log(postes, "njnjjjjjj")

  useEffect(()=>{
    const postData = postes
    dispatch(postes_Redux_Func(postData))
    console.log(dispatch(postes_Redux_Func(postData)), "lklklklk")
    console.log(postData, "njnjjjjjjjjjjjj")
  },[postes])

  

  return (
    <>
      <div className="flex flex-nowrap flex-row gap-x-2 pb-4 mb-4 justify-start items-center relative">
        {scrollX !== 0 && (
          <button
            onClick={() => slide(-50)}
            className="w-2 h-2 absolute top-[0.625rem] left-[-1.438rem]"
          >
            <Image src="/img/arrow-left-colour.svg" alt="arrow-left" width={15}
              height={15}
              priority
            />
          </button>
        )}



        {postes?.CategoryList?.categorylist && <>

          <ul ref={scrl} onScroll={scrollCheck} className='flex flex-nowrap flex-row gap-x-2 justify-start items-center overflow-scroll scrollbar-style'>      
         <li onClick={() => handleActive(null)} className={`whitespace-nowrap px-6 py-2 rounded-3xl border-[1px] font-base leading-4 hover:text-white hover:bg-gray-500 hover:border-gray-500 cursor-pointer ${activeIndex == null ? 'border-cyan-500 text-info' : 'border-gray-200 text-gray-600'}`}>
        All
    </li>
    {postes?.CategoryList?.categorylist?.map((data) => (
        <Link key={data.categorySlug} href={`/?cateId=${data.categorySlug}`}>
            <li onClick={() => handleActive(data.categorySlug)}  className={`whitespace-nowrap px-6 py-2 rounded-3xl border-[1px] font-base leading-4 hover:text-white hover:bg-gray-500 hover:border-gray-500 cursor-pointer ${activeIndex == data.categorySlug ? 'border-cyan-500 text-info' : 'border-gray-200 text-gray-600'}`}>
                {data.categoryName}
            </li>
        </Link>
    ))}
</ul>

          {/* <ul ref={scrl} onScroll={scrollCheck} className='flex flex-nowrap flex-row gap-x-2 justify-start items-center overflow-scroll scrollbar-style'>      
            <li onClick={() => handleActive(null)} className={`whitespace-nowrap px-6 py-2 rounded-3xl border-[1px] font-base  leading-4 hover:text-white hover:bg-gray-500 hover:border-gray-500 cursor-pointer ${activeIndex == null ?'border-cyan-500 text-info':'border-gray-200 text-gray-600'}`}> All</li>
            {postes?.CategoryList?.categorylist?.map((data, index) => (
              <li key={index} onClick={() => handleActive(data.categorySlug)} className={`whitespace-nowrap px-6 py-2 rounded-3xl border-[1px] font-base  leading-4 hover:text-white hover:bg-gray-500 hover:border-gray-500 cursor-pointer ${activeIndex == data.categorySlug ?'border-cyan-500 text-info':'border-gray-200 text-gray-600'}`}> {data.categoryName} </li>
            ))}
          </ul> */}
   
        </>

        }

        {!scrolEnd && (
          <button
            onClick={() => slide(+50)}
            className="w-2 h-2 absolute top-[0.625rem] right-[-1.438rem]"
          >
            <Image src="/img/arrow-right-colour.svg" alt="arrow-right" width={15}
              height={15}
              priority
            />
          </button>
        )}
      </div>

    </>
  )
}