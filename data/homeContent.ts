// /data/homeContent.ts

// types/homeContent.ts

export type FeaturedSubject = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

export type Testimonial = {
  id: number;
  name: string;
  relation: string;
  quote: string;
  rating: number;
  avatar?: string;
};

export type HomeContent = {
  welcomeMessage: string;
  bio: string;
  featuredSubjects: FeaturedSubject[];
  testimonials: Testimonial[];
};

export const homeContent = {
  welcomeMessage: "Öğrenmeye Hoş Geldiniz! 👋",
  bio: "Merhaba! Ben Ayşe Yılmaz. 10 yılı aşkın süredir Matematik ve Fen Bilimleri alanında öğrencilere birebir ve grup dersleri vermekteyim. Öğrencilerime sadece sınav başarısı değil, aynı zamanda öğrenme sevgisi kazandırmayı amaçlıyorum.",

  featuredSubjects: [
    {
      id: 1,
      title: "Matematik (Lise & TYT)",
      description: "Temel kavramlardan ileri düzeye kadar birebir destek.",
      icon: "📐",
    },
    {
      id: 2,
      title: "Fen Bilimleri (Ortaokul)",
      description: "Kavrama, deney ve soru çözüm odaklı ders anlatımı.",
      icon: "🔬",
    },
    {
      id: 3,
      title: "Online Özel Ders",
      description: "Zoom üzerinden interaktif ders seçenekleri.",
      icon: "💻",
    },
  ],

  testimonials: [
    {
      id: 1,
      name: "Zeynep K.",
      relation: "12. Sınıf Öğrencisi",
      quote:
        "Ayşe Öğretmen sayesinde TYT netlerim 15'ten 30'a çıktı! Dersi anlatma şekli çok açık ve motive edici.",
      rating: 5,
      avatar: "/avatars/zeynep.png", // ya da boş bırakılabilir
    },
    {
      id: 2,
      name: "Murat Bey",
      relation: "Veli",
      quote:
        "Kızımın ders başarısında gözle görülür bir artış oldu. Disiplinli ama bir o kadar da sevecen bir öğretmen.",
      rating: 5,
      avatar: "/avatars/murat.png",
    },
    {
      id: 3,
      name: "Emir T.",
      relation: "8. Sınıf Öğrencisi",
      quote:
        "Fen derslerini artık çok daha iyi anlıyorum. Dersler hem eğlenceli hem öğretici.",
      rating: 4,
      avatar: "",
    },
  ],
};
