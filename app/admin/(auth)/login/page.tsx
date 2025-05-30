"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AdminLogin() {
    const [userInfo, setUserInfo] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        console.log("Login attempt started");
        console.log("Form data:", {
            username: userInfo.username,
            password: userInfo.password
        });

        try {
            const res = await signIn("credentials", {
                username: userInfo.username,
                password: userInfo.password,
                redirect: false,
            });

            console.log("SignIn response:", {
                ok: res?.ok,
                error: res?.error,
                status: res?.status,
                url: res?.url
            });

            if (res?.error) {
                console.log("Login failed with error:", res.error);
                setError("Kullanıcı adı veya şifre hatalı");
            } else if (res?.ok) {
                console.log("Login successful, redirecting to dashboard");
                window.location.href = "/admin/dashboard";
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Bir hata oluştu");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 p-6 border rounded shadow">
            <h2 className="text-2xl mb-4">Admin Girişi</h2>
            {error && <p className="text-red-600 mb-2">{error}</p>}
            <input
                type="text"
                placeholder="Kullanıcı Adı"
                value={userInfo.username}
                onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                className="w-full mb-3 p-2 border rounded"
            />
            <input
                type="password"
                placeholder="Şifre"
                value={userInfo.password}
                onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                className="w-full mb-3 p-2 border rounded"
            />
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Giriş Yap
            </button>
        </form>
    );
}
