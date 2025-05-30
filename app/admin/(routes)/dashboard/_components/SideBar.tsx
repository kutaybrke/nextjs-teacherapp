"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useState } from 'react'
import { LuPanelRightClose, LuPanelLeftClose } from "react-icons/lu";

const SideBar = () => {
    const [open, setOpen] = useState(true);

    const toggleOpen = () => setOpen(prev => !prev);

    return (
        <>
            {open && (
                <aside className='bg-black border-2 border-gray-400 min-h-screen w-1/2 md:w-1/6 p-4'>
                    <h1 className='font-bold text-2xl text-orange-300 mb-6'>Admin Panel</h1>
                    <nav className='flex flex-col space-y-3 font-bold text-xl'>
                        <Link href='/admin/writeblog' passHref>
                            <Button className='bg-orange-300 text-black font-bold w-full'>Blog Yaz</Button>
                        </Link>
                        <Link href='/admin/myblogs' passHref>
                            <Button className='bg-orange-300 text-black font-bold w-full'>Mevcut Bloglarım</Button>
                        </Link>
                        <Link href='/admin/myavailability' passHref>
                            <Button className='bg-orange-300 text-black font-bold w-full'>Müsaitlik Durumlarım</Button>
                        </Link>
                    </nav>
                </aside>
            )}
            <div>
                <button
                    onClick={toggleOpen}
                    className="ml-2 mt-4 text-orange-300 hover:text-orange-400 focus:outline-none"
                >
                    {open ? <LuPanelLeftClose size={32} /> : <LuPanelRightClose size={32} />}
                </button>
            </div>

        </>
    );
}

export default SideBar;
