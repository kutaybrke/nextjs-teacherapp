"use client"
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

const WriteBlogPage = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [image, setImage] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        summary: "",
        content: "",
    });

    // Görsel seçildiğinde
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    // Form gönderimi
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let imageUrl = "";

        try {
            if (image) {
                // 1. Resmi backend API'ye yükle
                const uploadData = new FormData();
                uploadData.append("image", image);

                const uploadResponse = await fetch("/api/upload", {
                    method: "POST",
                    body: uploadData,
                });

                if (!uploadResponse.ok) {
                    throw new Error("Resim yükleme başarısız");
                }

                const uploadResult = await uploadResponse.json();
                imageUrl = uploadResult.secure_url; // Cloudinary'den dönen resim URL'si
            }

            // 2. Blog verisini backend'e gönder
            const form = new FormData();
            form.append("title", formData.title);
            form.append("summary", formData.summary);
            form.append("content", formData.content);
            form.append("date", date?.toISOString() || "");
            form.append("imageUrl", imageUrl);

            const response = await fetch("/api/writeblog", {
                method: "POST",
                body: form,
            });

            if (response.ok) {
                alert("Blog başarıyla gönderildi!");
                setFormData({ title: "", summary: "", content: "", })
                setImage(null);
                setDate(new Date());
            } else {
                alert("Bir hata oluştu.");
            }
        } catch (error) {
            console.error("Hata:", error);
            alert("Sunucu hatası veya yükleme başarısız!");
        }
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto p-8 space-y-8 bg-white rounded-lg shadow-md"
        >
            <h1 className="text-3xl font-extrabold mb-6 text-indigo-700">
                Yeni Blog Yazısı
            </h1>

            <div className="space-y-2">
                <label htmlFor="title" className="block text-lg font-semibold">
                    Başlık
                </label>
                <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    id="title"
                    placeholder="Blog başlığınızı yazın..."
                    className="max-w-full"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="summary" className="block text-lg font-semibold">
                    Ön Açıklama
                </label>
                <Input
                    value={formData.summary}
                    onChange={(e) =>
                        setFormData({ ...formData, summary: e.target.value })
                    }
                    id="summary"
                    placeholder="Kısa ön açıklama girin..."
                    className="max-w-full"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="content" className="block text-lg font-semibold">
                    Blog Yazısı
                </label>
                <Textarea
                    id="content"
                    placeholder="Blog yazınızı buraya yazın..."
                    className="min-h-[200px]"
                    value={formData.content}
                    onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                    }
                />
            </div>

            <div className="space-y-2 w-[250px]">
                <label className="block text-lg font-semibold mb-1">Yayın Tarihi</label>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border border-gray-300"
                />
            </div>

            <div className="space-y-2 max-w-sm">
                <label htmlFor="image-upload" className="block text-lg font-semibold">
                    Görsel Ekle
                </label>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-600
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-indigo-100 file:text-indigo-700
                     hover:file:bg-indigo-200
                     cursor-pointer"
                />
                {image && (
                    <p className="mt-2 text-green-600 font-medium">
                        Seçilen görsel: {image.name}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-semibold"
            >
                Kaydet
            </Button>
        </form>
    );
};

export default WriteBlogPage;
