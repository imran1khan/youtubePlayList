import { PlaylistData } from '@/TypesDeceration/PlaylistData';
import { VideoStats } from '@/TypesDeceration/VideoStats';
import TableComponent from '@/components/TableComponent'
import React from 'react'

const getStr=(Res_data:PlaylistData)=>{
  let id_list:string='';
  for (let i = 0; i < Res_data.items.length; i++) {
    if (i===0) {
      id_list=id_list+Res_data.items[i].snippet.resourceId.videoId;
    }
    else{
      id_list=id_list+'%2C'+Res_data.items[i].snippet.resourceId.videoId;
    }
  }
  return id_list;
}
const getPlayListdata=async(playlistId:string,maxResult:number=99999999)=>{
  try {
    const responce = await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResult}&playlistId=${playlistId}&key=AIzaSyB0BxsW6wV82Q9PNvOFY1G8fDbmyj3eTjY`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });
    const Res_data = await responce.json() as PlaylistData;
    const id_list=getStr(Res_data);
    const responce1 = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${id_list}&key=AIzaSyB0BxsW6wV82Q9PNvOFY1G8fDbmyj3eTjY`,{
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });
    const Res1_data = await responce1.json() as VideoStats;
    for (let i = 0; i < Res_data.items.length; i++) {
      Res_data.items[i].snippet.videoStats=Res1_data.items[i].statistics;
    }
    return Res_data;
  } catch (error) {
    console.log(error)
    return undefined
  }
}



async function AllVideos({ params }: { params: { id: string } }) {
  const data = await getPlayListdata(params.id);
  return (
    <div className='bg-[#2d545e] h-screen text-white'><TableComponent data={data}/></div>
  )
}

export default AllVideos