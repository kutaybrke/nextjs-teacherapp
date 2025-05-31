"use client"
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useBlogStore } from '@/stores/useBlogStore'

const BlogEditPage = () => {
    const params = useParams()
    const router = useRouter()
    const blogId = params.blogId as string
    const { blogPosts } = useBlogStore()
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        content: '',

    })

    useEffect(() => {
        // Blog verilerini bul
        const blog = blogPosts.find(blog => blog.id.toString() === blogId)
        if (blog) {
            setFormData({
                title: blog.title,
                summary: blog.summary,
                content: blog.content,
            })
        }
    }, [blogId, blogPosts])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch(`/api/editblog/${blogId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                router.push('/admin/myblogs')
            }
        } catch (error) {
            console.error('Blog güncellenirken hata oluştu:', error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="container mx-auto py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Blog Düzenle</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Başlık</label>
                            <Input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Blog başlığı"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Özet</label>
                            <Textarea
                                name="summary"
                                value={formData.summary}
                                onChange={handleChange}
                                placeholder="Blog özeti"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">İçerik</label>
                            <Textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Blog içeriği"
                                required
                                className="min-h-[200px]"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push('/admin/myblogs')}
                            >
                                İptal
                            </Button>
                            <Button type="submit">
                                Kaydet
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default BlogEditPage 