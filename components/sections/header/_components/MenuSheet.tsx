import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Book, BookIcon, Calendar1Icon, GraduationCap, Home, Menu, User, Workflow } from 'lucide-react'
import Link from 'next/link'
import { FcAbout } from 'react-icons/fc'
import { SiAboutdotme, SiMariadbfoundation } from 'react-icons/si'
const MenuSheet = () => {
    return (
        <div className='flex md:hidden'>
            <Sheet>
                <SheetTrigger><Menu /></SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetDescription>
                            <nav className="flex flex-col space-y-6 mt-10 font-bold  ">
                                <div className='flex items-center space-x-2'>
                                    <Home />
                                    <Link
                                        href="/"
                                        className="hover:text-blue-600 transition-colors duration-200"
                                    >
                                        Anasayfa
                                    </Link>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <GraduationCap />
                                    <Link
                                        href="/lessonsandservices"
                                        className="hover:text-blue-600 transition-colors duration-200"
                                    >
                                        Dersler & Hizmetler
                                    </Link>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <Calendar1Icon />
                                    <Link
                                        href="/availability"
                                        className="hover:text-blue-600 transition-colors duration-200"
                                    >
                                        Müsaitlik
                                    </Link>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <BookIcon />
                                    <Link
                                        href="/blog"
                                        className="hover:text-blue-600 transition-colors duration-200"
                                    >
                                        Blog
                                    </Link>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <User />
                                    <Link
                                        href="/hakkımda"
                                        className="hover:text-blue-600 transition-colors duration-200"
                                    >
                                        Hakkımda
                                    </Link>
                                </div>

                            </nav>
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MenuSheet