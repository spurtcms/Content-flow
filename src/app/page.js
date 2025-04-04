
import { fetchGraphQl } from "./api/graphicql";
import { GET_POSTS_CATEGORYLIST_QUERY, GET_POSTS_LIST_QUERY } from "./api/query";
import { channel_name, defaultCategorySlug } from "./api/url";
import HomeServerAction from "./components/Home";


export default async function Home() {
  let variable_category={"categoryFilter":{ "categoryGroupSlug": defaultCategorySlug,"excludeParent": true},"commonFilter":{"limit":10,"offset":0}}
  
  // {
  //   "commonFilter": {
  //   "limit":50,
  //   "offset":0},
  //   "categoryFilter": {
  //     "categoryGroupId": 1,
  //   }
  // }
 let  variable_list={ "commonFilter": {"limit": 10,"offset": 0}, "entryFilter": { "categorySlug": defaultCategorySlug,  "ChannelName": channel_name}, "AdditionalData": { "authorDetails": false, "categories": true }
}
//  { "commonFilter":{"limit": 10, "offset": 0},"additionalData": {
//     "authorDetails": true}, "entryFilter": {"categoryId":1}}

  const [Listdata,postdatas]=await Promise.all([fetchGraphQl(GET_POSTS_CATEGORYLIST_QUERY,variable_category),fetchGraphQl(GET_POSTS_LIST_QUERY,variable_list)])
// const Listdata=await fetchGraphQl(GET_POSTS_CATEGORYLIST_QUERY,variable_category)
// let postdatas=await fetchGraphQl(GET_POSTS_LIST_QUERY,variable_list)
// console.log(postdatas?.channelEntriesList?.channelEntriesList,"postdatas0907");


  console.log(Listdata,"csdd")
  return (
    <>
    
    <HomeServerAction Listdata={Listdata} postdatas={postdatas}/>
    
    </>
  );
}
