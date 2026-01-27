// Configuración centralizada de categorías
export interface Category {
    slug: string;
    name: string;
    description: string;
    color: string;
    icon?: string;
}

export const CATEGORIES: Record<string, Category> = {
    amor: {
        slug: "amor",
        name: "Amor & Emociones",
        description:
            "Versos que exploran los matices del corazón, desde la pasión ardiente hasta la ternura más sutil",
        color: "#e91e63",
        icon: "💕",
    },
    melancolia: {
        slug: "melancolia",
        name: "Melancolía & Silencio",
        description:
            "Reflexiones en la quietud, donde el silencio habla más fuerte que las palabras",
        color: "#3f51b5",
        icon: "🌙",
    },
    lucha: {
        slug: "lucha",
        name: "Lucha Interior",
        description:
            "Batallas del alma, resistencia y la fuerza que nace de la adversidad",
        color: "#ff5722",
        icon: "⚔️",
    },
    "salud-mental": {
        slug: "salud-mental",
        name: "Salud Mental",
        description:
            "Ansiedad, depresión y estados internos: poemas sobre la mente, sus sombras y su recuperación",
        color: "#00bcd4",
        icon: "🧠",
    },
    reflexion: {
        slug: "reflexion",
        name: "Reflexión & Sueños",
        description:
            "Pensamientos profundos, introspección y exploraciones de la mente y los sueños",
        color: "#9c27b0",
        icon: "🌟",
    },
    sociedad: {
        slug: "sociedad",
        name: "Sociedad & Mundo",
        description:
            "Crítica social, injusticias, guerra y el espejo colectivo: el mundo que habitamos y construimos",
        color: "#4caf50",
        icon: "🌍",
    },
    existencial: {
        slug: "existencial",
        name: "Existencial",
        description:
            "Cuestionamientos sobre la vida, la muerte, el propósito y la esencia del ser",
        color: "#607d8b",
        icon: "🤔",
    },
    religion: {
        slug: "religion",
        name: "Fe & Religión",
        description:
            "Diálogos con lo sagrado: dudas, crítica, fe, ausencia y la búsqueda de sentido",
        color: "#ffc107",
        icon: "⛪",
    },
} as const;

// Tipos derivados para autocompletado
export type CategorySlug = keyof typeof CATEGORIES;

// Funciones auxiliares
export const getCategoryBySlug = (slug: string): Category | undefined => {
    return CATEGORIES[slug as CategorySlug];
};

export const getAllCategories = (): Category[] => {
    return Object.values(CATEGORIES);
};

export const getCategoriesWithCount = (
    poems: any[],
): Array<Category & { count: number }> => {
    const categoriesWithCount = getAllCategories().map((category) => ({
        ...category,
        count: 0,
    }));

    poems.forEach((poem) => {
        const categorias = poem.data.categorias || ["existencial"];
        categorias.forEach((categoria: string) => {
            const categoryIndex = categoriesWithCount.findIndex(
                (c) => c.slug === categoria,
            );
            if (categoryIndex !== -1) {
                categoriesWithCount[categoryIndex].count++;
            }
        });
    });

    return categoriesWithCount.filter((category) => category.count > 0);
};

// Validación para usar en el schema de content
export const validateCategory = (category: string): boolean => {
    return category in CATEGORIES;
};

export const getCategoryNames = (): string[] => {
    return Object.keys(CATEGORIES);
};
