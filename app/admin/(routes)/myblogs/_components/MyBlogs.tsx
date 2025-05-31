"use client"
import React, { useEffect } from 'react'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useBlogStore } from '@/stores/useBlogStore'
import Image from 'next/image'
import { ArrowRight, Calendar1Icon, Edit, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


const MyBlogsComponent = () => {

    const { blogPosts, setBlogPosts } = useBlogStore();

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const res = await fetch('/api/blog');
                if (!res.ok) throw new Error("Bloglar Yüklenmedi")
                const data = await res.json();
                setBlogPosts(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchBlogs();
    }, [setBlogPosts])

    const handleDelete = async (id: number) => {
        const confirmDelete = confirm("Bu blogu silmek istediğinize emin misiniz?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/editblog/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error("Silme işlemi başarısız");

            setBlogPosts(blogPosts.filter(blog => blog.id !== id)); // doğru kullanım
        } catch (error) {
            console.error("Blog silinirken hata oluştu:", error);
        }
    };


    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-7xl mx-auto px-4'>
            {blogPosts.map((blog) => (

                <Card key={blog.id} className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className='flex items-center justify-end space-x-3 pr-2'>
                        <Link href={`/admin/blogedit/${blog.id}`}>
                            <Edit className="cursor-pointer text-blue-600 hover:text-blue-800" />
                        </Link>
                        <div
                            onClick={() => handleDelete(blog.id)}
                            className="cursor-pointer w-5 h-5 flex items-center justify-center"
                        >
                            <Trash className="w-8 h-8 text-red-500 hover:text-red-700" />
                        </div>
                    </div>


                    <CardHeader className='flex flex-col space-y-4 p-4'>
                        <Image
                            src={blog.imageUrl ?? ''}
                            alt={blog.title}
                            width={400}
                            height={250}
                            className="rounded-lg object-cover"
                        />

                        <div className='flex items-center space-x-2 text-gray-500 text-sm'>
                            <Calendar1Icon className="w-5 h-5" />
                            <span>{new Date(blog.date).toLocaleDateString()}</span>
                        </div>

                        <CardTitle className="text-lg font-semibold text-gray-900">{blog.title}</CardTitle>
                        <CardDescription className="text-gray-700">{blog.summary}</CardDescription>
                    </CardHeader>

                    <div className='border-t border-gray-200 mx-4'></div>

                    <CardFooter className='flex items-center justify-between px-4 py-3'>
                        <p className="text-sm text-gray-600 italic">{blog.author}</p>
                        <Button className='flex items-center space-x-2 py-6 px-4 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md'>
                            <span>Devamını Oku</span>
                            <div className='flex items-center justify-center bg-white p-1 rounded-full'>
                                <ArrowRight className='w-4 h-4 text-blue-600' />
                            </div>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>

    )
}

export default MyBlogsComponent