// Project data for Kaizen Art
export const projectsData = [
    {
        id: 1,
        slug: "modern-villa",
        title: "Modern Villa",
        location: "Kalkan, Antalya",
        category: "Villa",
        year: "2024",
        area: "450 m²",
        status: "Tamamlandı",
        featured: true,
        mainImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop"
        ],
        description: "Akdeniz'in eşsiz manzarasına hakim, modern mimari çizgileriyle öne çıkan lüks villa projesi. Doğayla bütünleşen tasarımı, geniş cam yüzeyleri ve minimalist yaklaşımıyla zamansız bir yaşam alanı.",
        features: [
            "Sonsuzluk havuzu",
            "Akıllı ev sistemi",
            "Panoramik deniz manzarası",
            "Özel bahçe peyzajı",
            "Enerji verimli tasarım",
            "Geniş teraslar"
        ],
        details: {
            rooms: "5+1",
            bathrooms: "4",
            parking: "3 araç",
            garden: "600 m²"
        }
    },
    {
        id: 2,
        slug: "luks-rezidans",
        title: "Lüks Rezidans",
        location: "Lara, Antalya",
        category: "Rezidans",
        year: "2023",
        area: "320 m²",
        status: "Tamamlandı",
        featured: true,
        mainImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop"
        ],
        description: "Şehrin kalbinde, lüks ve konforu bir araya getiren modern rezidans. Premium malzemeler, özenle seçilmiş detaylar ve fonksiyonel tasarımıyla konforlu bir yaşam sunuyor.",
        features: [
            "Merkezi konum",
            "7/24 güvenlik",
            "Kapalı otopark",
            "Fitness merkezi",
            "Sosyal alanlar",
            "Yüksek tavan"
        ],
        details: {
            rooms: "4+1",
            bathrooms: "3",
            parking: "2 araç",
            floor: "12. kat"
        }
    },
    {
        id: 3,
        slug: "loft-ofis",
        title: "Loft Ofis",
        location: "Konyaaltı, Antalya",
        category: "Ticari",
        year: "2024",
        area: "280 m²",
        status: "Devam Ediyor",
        featured: true,
        mainImage: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2000&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2000&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2000&auto=format&fit=crop"
        ],
        description: "Endüstriyel estetiği modern dokunuşlarla harmanlayan, yaratıcı çalışma alanları için tasarlanmış loft ofis projesi. Açık plan, yüksek tavanlar ve doğal ışık.",
        features: [
            "Açık plan tasarım",
            "Yüksek tavanlar",
            "Geniş pencereler",
            "Esnek alan kullanımı",
            "Modern altyapı",
            "Toplantı odaları"
        ],
        details: {
            rooms: "Açık plan",
            bathrooms: "2",
            parking: "4 araç",
            ceiling: "4.5 m"
        }
    }
];

export const getProjectBySlug = (slug) => {
    return projectsData.find(project => project.slug === slug);
};

export const getFeaturedProjects = () => {
    return projectsData.filter(project => project.featured);
};
