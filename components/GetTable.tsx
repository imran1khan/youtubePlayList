"use client"
import { GetPlaylist } from '@/TypesDeceration/Responce';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
// import Image from 'next/image'; //UC7XjeM_qAiqWoD57JXlpOdQ
function GetTable() {
    const [data, setData] = useState<GetPlaylist | null>(null);
    const [inputval, setInputVal] = useState('');
    const SearchFunction = async () => {
        if (inputval.length <= 0) {
            return;
        }
        try {
            const responce = await fetch(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${inputval}&key=AIzaSyB0BxsW6wV82Q9PNvOFY1G8fDbmyj3eTjY`, {
                method: "GET",
                headers: {
                    Accept: "application/json"
                }
            });
            const Res_data = await responce.json() as GetPlaylist;
            setData(Res_data);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <InputDiv inputval={inputval} SearchFunction={SearchFunction} setInputVal={setInputVal} placeholder='channel_Id'/>
            <CenterDiv className=''>
                <h1 className="bg-[#006663] w-[50%] py-5 my-2 rounded-sm text-center text-xl"> All public playlist </h1>
            </CenterDiv>
            <CenterDiv>
                <ul className='bg-[#12343b] space-y-2 w-[50%] rounded-md'>
                    {data && data.items ? (
                        data.items.map((val, i) => (
                            <li key={val.etag} className={`flex justify-between px-3 py-4 ${i !== 0 ? "border-t-2 border-[#26616e]" : ""}`}>
                                <div className='bg-[#1e837f] flex-1 rounded-tl-md rounded-bl-md'>
                                    <img
                                        alt=''
                                        className='rounded-md'
                                        src={val.snippet.thumbnails.default?.url}
                                        width={val.snippet.thumbnails.default?.width}
                                        height={val.snippet.thumbnails.default?.height}
                                    />
                                </div>
                                <Link href={`/dashboard/${val.id}`} target='_blank' className='w-[25%] text-wrap bg-[#006663] rounded-tr-md rounded-br-md'>
                                    <CenterDiv className='w-full h-full'>
                                        <h1>{val.snippet.title}</h1>
                                    </CenterDiv>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li className='text-center text-white py-4'>No playlists found</li>
                    )}
                </ul>
            </CenterDiv>
        </>
    )
}

export default GetTable

export function CenterDiv({ className, children }: { className?: string, children: React.ReactNode }) {
    return (<div className={`flex justify-center items-center ${className}`}>
        {children}
    </div>)
}

export function InputDiv({inputval,setInputVal,SearchFunction,iconShow=true,placeholder}:
    {inputval:string,placeholder?:string,setInputVal:(d:string)=>void,SearchFunction?:()=>void, iconShow?:boolean}) {
    return (
        <CenterDiv className='bg-[#30606cee]'>
            <input type="text" value={inputval} onChange={(e) => setInputVal(e.target.value)} className='text-black w-[45%] px-2 py-2 my-2 rounded-md' name="" id="" placeholder={placeholder || "text"} />
            {
                iconShow && <button onClick={SearchFunction} className='p-3 bg-[#006663] hover:bg-[#28706d] rounded-sm ml-1'><Search height={18} width={18} /></button>
            }
        </CenterDiv>
    )
}

