export const servicesContent = {
  courses: [
    {
      id: 1,
      title: "Fen Bilimleri Özel Ders",
      description:
        "Ortaokul ve lise öğrencilerine yönelik fen bilimleri alanında kavrama ve uygulamalı dersler.",
      level: ["Ortaokul", "Lise"],
      tags: ["TYT", "AYT", "LGS"],
    },
    {
      id: 2,
      title: "Biyoloji Özel Ders",
      description:
        "Biyoloji konularında temel kavramlardan ileri düzeye kadar birebir destek.",
      level: ["Ortaokul", "Lise"],
      tags: ["TYT", "AYT", "LGS"],
    },
  ],

  additionalServices: [
    {
      id: 1,
      title: "Ödev Takibi ve Geri Bildirim",
      description:
        "Ders sonrası verilen ödevlerin takibi ve ayrıntılı geri bildirim ile başarıyı artırma.",
    },
    {
      id: 2,
      title: "Birebir Koçluk",
      description:
        "Öğrencinin öğrenme alışkanlıklarını geliştirmeye yönelik bireysel koçluk seansları.",
    },
  ],

  pricingPlans: [
    {
      id: 1,
      title: "Saatlik Ders Paketi",
      description: "Fen-Biyoloji dersi için birebir özel ders.",
      duration: "40 dakika ders",
      price: "500₺",
      includes: ["Fen", "Biyoloji"],
    },
    {
      id: 2,
      title: "10 Ders + Koçluk Paketi",
      description:
        "Özel dersin yanında birebir koçluk ve geri bildirim hizmeti de içerir.",
      duration: "10 x 40 dakika + Koçluk",
      price: "5.000₺",
      includes: [
        "Fen",
        "Biyoloji",
        "Birebir Koçluk",
        "Ödev Takibi",
        "Geri Bildirim",
      ],
    },
    {
      id: 3,
      title: "10 Derslik Paket",
      description: "Çoklu özel ders paketi ile daha ekonomik eğitim.",
      duration: "10 x 40 dakika",
      price: "4.000₺",
      includes: ["Fen", "Biyoloji"],
    },
  ],
};
