import React, { Suspense } from 'react'
import ViewAllPostsComp from './ViewAllPosts'
import { fetchGraphQl } from '@/app/api/graphicql'
import { GET_POSTS_LIST_QUERY } from '@/app/api/query'
import { channel_name } from '@/app/api/url'

export async function generateMetadata({params}) {

    // let variable_lista={ "limit": 10, "offset": 0,channelId:72,"categoryId":1}
    // let variable_lista={ "commonFilter": {"limit": 10,"offset": 0}, "entryFilter": { "categorySlug": params.slug,}, "AdditionalData": { "authorDetails": true, "categories": true }}
    

    let variable_lista={
      "commonFilter": {
        "limit": 10,
        "offset": 0,
        "keyword":""
      },
      "entryFilter": {
        "Status": "Publish",
        "categorySlug": params.slug,
         "ChannelName": channel_name
      },
      "AdditionalData": {
        "authorDetails": true,
        "categories": true
      }
    }
    
    
    const dtas=await fetchGraphQl(GET_POSTS_LIST_QUERY,variable_lista)
   let title=''
   let description=''
   dtas?.channelEntriesList?.channelEntriesList.map((response)=>{
    
      if(response.slug==params.slug){
        title = response.metaTitle
        description=response.metaDescription
      }
    })
    
    return {
      title,
      description,
    };
  }

export default function ViewAllAction() {

    
  return (
    <>
           <Suspense fallback={null}>
           <ViewAllPostsComp />
           </Suspense>
    </>
  )
}

