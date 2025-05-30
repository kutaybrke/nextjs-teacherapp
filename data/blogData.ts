export interface BlogPost {
    id: number;
    title: string;
    summary: string;
    content: string;
    date: string;
    imageUrl?: string;
    author: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: "Bitki Hücrelerinde Fotosentez Süreci",
        summary: "Fotosentez sürecinin bitki hücrelerindeki detaylı mekanizması üzerine yapılan çalışma.",
        content: `
      Fotosentez, bitkilerin ışık enerjisini kimyasal enerjiye dönüştürme sürecidir. Bu çalışma, kloroplastların yapısı ve ışık reaksiyonları üzerine odaklanmaktadır...
      (buraya daha detaylı içerik yazabilirsin)
    `,
        date: "2025-05-15",
        imageUrl: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=800",
        author: "Dr. Biyolog"
    },
    {
        id: 2,
        title: "Deniz Canlılarında Adaptasyon Mekanizmaları",
        summary: "Farklı deniz canlılarının çevresel değişikliklere adaptasyon stratejileri.",
        content: `
      Deniz canlıları, zorlu koşullara karşı farklı adaptasyon mekanizmaları geliştirmiştir. Bu makalede, morfolojik ve fizyolojik adaptasyonlar incelenmiştir...
      (buraya daha detaylı içerik yazabilirsin)
    `,
        imageUrl: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=800",
        date: "2025-04-28",
        author: "Dr. Biyolog"
    },
    {
        id: 3,
        title: "Mikrobiyomun İnsan Sağlığı Üzerindeki Etkileri",
        summary: "İnsan vücudundaki mikrobiyom çeşitliliği ve sağlık üzerindeki etkileri üzerine bir derleme.",
        content: `
      Mikrobiyom, insan sağlığında önemli bir rol oynar. Bağışıklık sistemi, sindirim ve metabolizma üzerinde etkileri detaylandırılmıştır...
      (buraya daha detaylı içerik yazabilirsin)
    `,
        imageUrl: "https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=800",
        date: "2025-03-10",
        author: "Dr. Biyolog"
    }
];
