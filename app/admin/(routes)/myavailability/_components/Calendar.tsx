"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { format, addMonths, subMonths } from "date-fns";
import { tr } from "date-fns/locale";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Availability = {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
};

export default function CalendarComponent() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [availabilities, setAvailabilities] = useState<Availability[]>([]);
    const [showModal, setShowModal] = useState(false);

    const [newDate, setNewDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [newStartTime, setNewStartTime] = useState("09:00");
    const [newEndTime, setNewEndTime] = useState("09:30");

    const hours = [
        "09:00", "09:30", "10:00", "10:30",
        "11:00", "11:30", "12:00", "12:30",
        "13:00", "13:30", "14:00", "14:30",
        "15:00", "15:30", "16:00", "16:30",
        "17:00",
    ];

    const deleteAvailability = async (id: number) => {
        try {
            const res = await fetch(`/api/event/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const errorData = await res.json();
                alert(`Silme hatası: ${errorData.error || "Bilinmeyen hata"}`);
                return;
            }

            setAvailabilities((prev) => prev.filter((a) => a.id !== id));
        } catch (error) {
            console.error("Silme hatası:", error);
            alert("Sunucuya bağlanırken hata oluştu.");
        }
    };

    useEffect(() => {
        const fetchAvailabilities = async () => {
            try {
                const res = await fetch("/api/event", { method: "GET" });
                if (!res.ok) {
                    const errorData = await res.json();
                    console.error("Veri çekme hatası:", errorData.error || "Bilinmeyen hata");
                    return;
                }

                const data: Availability[] = await res.json();
                setAvailabilities(data);
            } catch (error) {
                console.error("Veri çekilirken hata oluştu:", error);
            }
        };

        fetchAvailabilities();
    }, []);

    const handleEventSubmit = async () => {
        try {
            const res = await fetch("/api/event", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    date: newDate,
                    startTime: newStartTime,
                    endTime: newEndTime,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                alert(`Hata: ${errorData.error || "Bilinmeyen hata"}`);
                return;
            }

            const createdEvent = await res.json();
            setAvailabilities((prev) => [
                ...prev,
                {
                    id: createdEvent.id,
                    date: createdEvent.date,
                    startTime: createdEvent.startTime,
                    endTime: createdEvent.endTime,
                },
            ]);
            setShowModal(false);
        } catch (error) {
            console.error(error);
            alert("İstek gönderilirken hata oluştu.");
        }
    };

    const filteredDate = format(currentDate, "yyyy-MM-dd");

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <Button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>{"←"}</Button>
                    <div className="text-xl font-semibold">
                        {format(currentDate, "MMMM yyyy", { locale: tr })}
                    </div>
                    <Button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>{"→"}</Button>
                </div>

                <Dialog open={showModal} onOpenChange={setShowModal}>
                    <DialogTrigger asChild>
                        <Button>Yeni Müsaitlik Ekle</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Yeni Müsaitlik Ekle</DialogTitle>
                        </DialogHeader>

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (newStartTime >= newEndTime) {
                                    alert("Başlangıç saati bitiş saatinden önce olmalı.");
                                    return;
                                }
                                handleEventSubmit();
                            }}
                            className="space-y-4 mt-4"
                        >
                            <div>
                                <Label htmlFor="date">Tarih</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={newDate}
                                    onChange={(e) => setNewDate(e.target.value)}
                                    min={format(new Date(), "yyyy-MM-dd")}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="startTime">Başlangıç Saati</Label>
                                    <Select value={newStartTime} onValueChange={setNewStartTime}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {hours.map((h) => (
                                                <SelectItem key={h} value={h}>{h}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="endTime">Bitiş Saati</Label>
                                    <Select value={newEndTime} onValueChange={setNewEndTime}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {hours.map((h) => (
                                                <SelectItem key={h} value={h}>{h}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <DialogFooter>
                                <Button type="submit">Kaydet</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div>
                <h3 className="font-semibold mb-2">
                    {format(currentDate, "dd MMMM yyyy", { locale: tr })}
                </h3>
                <div className="grid grid-cols-4 gap-4">
                    {hours.slice(0, -1).map((hour, i) => {
                        const nextHour = hours[i + 1];
                        const isAvailable = availabilities.some(
                            (a) =>
                                format(new Date(a.date), "yyyy-MM-dd") === filteredDate &&
                                a.startTime === hour &&
                                a.endTime === nextHour
                        );

                        return (
                            <div
                                key={hour}
                                className={`p-3 rounded border cursor-default ${isAvailable ? "bg-green-200 border-green-500" : "bg-gray-100"
                                    }`}
                            >
                                {hour} - {nextHour}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-2">Müsaitlikler</h3>
                <ul className="space-y-2">
                    {availabilities
                        .filter((a) => format(new Date(a.date), "yyyy-MM-dd") === filteredDate)
                        .map((a) => (
                            <li key={a.id} className="flex justify-between items-center border rounded p-3">
                                <div>
                                    {a.date} {a.startTime} - {a.endTime}
                                </div>
                                <Button variant="destructive" size="sm" onClick={() => deleteAvailability(a.id)}>
                                    Sil
                                </Button>
                            </li>
                        ))}
                    {!availabilities.some((a) => format(new Date(a.date), "yyyy-MM-dd") === filteredDate) && (
                        <p className="text-gray-500">Bu tarihte müsaitlik bulunmamaktadır.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}
