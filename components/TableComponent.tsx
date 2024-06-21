"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CenterDiv, InputDiv } from './GetTable'
import Link from 'next/link'
import { PlaylistData } from '@/TypesDeceration/PlaylistData'
import { Menu } from 'lucide-react'

function TableComponent({ data }: { data: PlaylistData | undefined }) {
    const menuItems=[
        {
            content:'A-Z',
            func:AtoZ
        },
        {
            content:'views',
            func:SortByViews
        },
        {
            content:'likes',
            func:SortByLikes
        },
        {
            content:'Date published (newest)',
            func:SortByDatePublishedAssending
        },
        {
            content:'Date published (oldest)',
            func:SortByDatePublishedDessending
        },
        {
            content:'Reset',
            func:()=>{setNewData(data)}
        }
    ];
    const [input, setInput] = useState('');
    const [newData, setNewData] = useState<PlaylistData | undefined>(data);
    const [showMenu,setShowMenu] = useState(false);
    // const divRef=useRef(null)
    useEffect(() => {
        const searchData = () => {
            if (!data) {
                return;
            }
            const itme_list = data.items.filter(v => {
                return v.snippet.title.toLowerCase().includes(input);
            })
            setNewData({ ...data, items: itme_list });
        }
        searchData();
    }, [input]);
    function SortByDatePublishedDessending(){
        setNewData(p => {
            if (!p) return p;
            const sortedItems = p?.items.sort((a, b) => {
                const dateA = new Date(a.snippet.publishedAt).getTime();
                const dateB = new Date(b.snippet.publishedAt).getTime();
                return dateB-dateA
            });
            return { ...p, items: sortedItems };
        });
    }
    function SortByDatePublishedAssending(){
        setNewData(p => {
            if (!p) return p;
            const sortedItems = p?.items.sort((a, b) => {
                const dateA = new Date(a.snippet.publishedAt).getTime();
                const dateB = new Date(b.snippet.publishedAt).getTime();
                return dateA-dateB
            });
            return { ...p, items: sortedItems };
        });
    }
    function AtoZ () {
        setNewData(p => {
            if (!p) return p;
            const sortedItems = p?.items.sort((a, b) => {
                return a.snippet.title.toLowerCase().localeCompare(b.snippet.title.toLowerCase());
            });
            return { ...p, items: sortedItems };
        });
    };
    function SortByViews() {
        setNewData(p => {
            if (!p) return p;
            const sortedItems = p.items.sort((a, b) => {
                if (a.snippet.videoStats && b.snippet.videoStats) {
                    const viewCountA = parseInt(a.snippet.videoStats.viewCount, 10);
                    const viewCountB = parseInt(b.snippet.videoStats.viewCount, 10);
                    return viewCountB - viewCountA;
                }
                if (a.snippet.videoStats) return 1;
                if (b.snippet.videoStats) return -1;
                return 0;
            });
            return { ...p, items: sortedItems };
        });
    }
    function SortByLikes() {
        setNewData(p=>{
            if (!p) return p;
            const sortedItems = p.items.sort((a,b)=>{
                if (a.snippet.videoStats && b.snippet.videoStats) {
                    const likeA = parseInt(a.snippet.videoStats?.likeCount,10);
                    const likeB = parseInt(b.snippet.videoStats?.likeCount,10);
                    return likeB-likeA;
                }
                if (a.snippet.videoStats) return -1;
                if(b.snippet.videoStats) return 1;
                return 0;
            });
            return { ...p, items: sortedItems };
        })
    }
    return (
        <>
            <InputDiv inputval={input} setInputVal={setInput} iconShow={false} placeholder='title' />
            <CenterDiv className='h-auto'>
                <div className='bg-[#1e838074] p-2 w-[50%] h-auto rounded-md relative'>
                    <Menu className='cursor-pointer' onClick={()=>setShowMenu(p=>!p)}/>
                    <div onClick={()=>setShowMenu(false)} className={`${showMenu?'absolute':"hidden"} top-[2rem] bg-black rounded-md p-4`}>
                        {
                            menuItems.map((v,i)=>(
                                <div key={i+v.content} onClick={v.func} className='hover:bg-[#1a4543d7] cursor-pointer p-2 rounded-md'>{v.content}</div>
                            ))
                        }
                    </div>
                </div>
            </CenterDiv>
            <CenterDiv className='h-[88%]'>
                <ul className='bg-[#12343b] space-y-2 w-[50%] h-full overflow-hidden overflow-y-scroll rounded-md'>
                    {newData && newData.items ? (
                        newData.items.map((val, i) => (
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
                                <Link href={`/dashboard/${val.id}`} target='_blank' className='w-[75%] text-wrap bg-[#006663] rounded-tr-md rounded-br-md'>
                                    <CenterDiv className='w-full h-full'>
                                        <h1>{val.snippet.title}</h1>
                                    </CenterDiv>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li className='text-center text-white py-4'>No videos</li>
                    )}
                </ul>
            </CenterDiv>
        </>
    )
}

export default TableComponent