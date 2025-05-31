"use client";

import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isToday,
    getDay,
} from "date-fns";
import { tr } from "date-fns/locale";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Calendar1Icon } from "lucide-react";

type Event = {
    title: string;
    time: string;
    date: string;
};

export default function CalendarMonthView() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch("/api/event");
                const data = await res.json();

                const formattedEvents: Event[] = data.map((item: any) => ({
                    title: "Dolu", // Varsayılan başlık (dilerseniz backend'e ekleyebilirsiniz)
                    time: `${item.startTime} - ${item.endTime}`,
                    date: format(new Date(item.date), "yyyy-MM-dd"),
                }));

                setEvents(formattedEvents);
            } catch (error) {
                console.error("Etkinlikler alınırken hata oluştu:", error);
            }
        };

        fetchEvents();
    }, []);

    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });
    const firstWeekDay = getDay(start) || 7;
    const paddingDays = Array.from({ length: firstWeekDay - 1 });

    const eventsByDate = events.reduce((acc, event) => {
        if (!acc[event.date]) acc[event.date] = [];
        acc[event.date].push(event);
        return acc;
    }, {} as Record<string, Event[]>);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-semibold tracking-tight">
                    {format(currentDate, "MMMM yyyy", { locale: tr })}
                </h2>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() =>
                            setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))
                        }
                    >
                        ←
                    </Button>
                    <Button variant="ghost" onClick={() => setCurrentDate(new Date())}>
                        <Calendar1Icon className="w-8 h-8" />
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() =>
                            setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))
                        }
                    >
                        →
                    </Button>
                </div>
            </div>

            {/* Hafta Başlıkları */}
            <div className="grid grid-cols-7 text-center text-gray-500 font-medium">
                {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((day) => (
                    <div className="bg-violet-200 p-5 text-black" key={day}>{day}</div>
                ))}
            </div>

            {/* Takvim Grid */}
            <motion.div
                className="grid grid-cols-7"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {paddingDays.map((_, i) => (
                    <div key={`pad-${i}`} className="rounded-lg p-2 min-h-[100px]" />
                ))}

                {days.map((day) => {
                    const dateStr = format(day, "yyyy-MM-dd");
                    const events = eventsByDate[dateStr] || [];

                    return (
                        <motion.div
                            key={dateStr}
                            whileHover={{ scale: 1.02 }}
                            className={cn(
                                "border p-3 min-h-[100px] flex flex-col gap-2 shadow-sm transition-all hover:shadow-md bg-white",
                                isToday(day) && "border-violet-400 bg-violet-50"
                            )}
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">{format(day, "d")}</span>
                                {isToday(day) && (
                                    <span className="text-xs text-black font-bold">Bugün</span>
                                )}
                            </div>
                            {events.map((event, i) => (
                                <div
                                    key={i}
                                    className="text-xs bg-violet-100 text-black-800 rounded-xl px-2 py-1"
                                >
                                    <div className="font-semibold truncate">{event.title}</div>
                                    <div className="text-[15px]">{event.time}</div>
                                </div>
                            ))}
                        </motion.div>
                    );
                })}
            </motion.div>

            <div className="mt-2 text-3xl text-left">
                <p>Bu takvimde mevcut aylık programımı görebilirsiniz. Uygun olduğum zaman dilimlerinde özel dersler verebilirim.</p>
            </div>
        </div>
    );
}
