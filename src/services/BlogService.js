// Initial seed data to populate the blog if empty
const SEED_DATA = [
    {
        id: '1',
        title: 'Study in Malta: Your Smart Choice for Europe',
        subtitle: 'Affordable Education & Schengen Access',
        image: '/images/study-malta.png', // Using the public images
        content: `
# Study in Malta

Europe works hard, but you can study smarter. Malta offers a unique blend of high-quality education and a relaxed Mediterranean lifestyle.

## Why Malta?
- **English Speaking:** One of the few European countries where English is an official language.
- **Schengen Member:** Travel freely across 27 European countries.
- **Affordable:** Compared to UK or USA, tuition and living costs are significantly lower.

## Key Facts
- **Intakes:** January, April, July, October
- **Work Rights:** 20 hours per week while studying.
- **Fees:** €3,000 - €8,000 per year.
        `,
        date: '2024-01-15'
    },
    {
        id: '2',
        title: 'New Zealand: 2025 Education Updates',
        subtitle: 'New Work Rights & PR Pathways',
        image: '/images/study-new-zealand.png',
        content: `
# Study in New Zealand

The land of the long white cloud is calling. With new policies for 2025, it's a better time than ever to choose NZ.

## What's New?
1. **Work Rights:** Now eligible to work up to **25 hours/week** (New Rule).
2. **Post-Study Visa:** Stay for 1-3 years after graduation.
3. **Family:** Family accompany policy available for specific masters/PhD courses.

## Opportunities
New Zealand lists high-demand skills regularly, offering a clear pathway to Permanent Residency (PR) for graduates in IT, Engineering, and Healthcare.
        `,
        date: '2024-01-18'
    }
];

const STORAGE_KEY = 'astoria_blog_posts_v2'; // Changed key to force reset with new image paths

export const BlogService = {
    // Get all posts
    getAll: () => {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            // Initialize with seed data if fresh
            localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
            return SEED_DATA;
        }
        return JSON.parse(data);
    },

    // Get single post by ID
    getById: (id) => {
        const posts = BlogService.getAll();
        return posts.find(p => p.id === id);
    },

    // Create new post
    create: (post) => {
        const posts = BlogService.getAll();
        const newPost = {
            ...post,
            id: Date.now().toString(), // Simple ID generation
            date: new Date().toISOString().split('T')[0]
        };
        posts.unshift(newPost); // Add to top
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
        return newPost;
    },

    // Update existing post
    update: (id, updatedData) => {
        const posts = BlogService.getAll();
        const index = posts.findIndex(p => p.id === id);
        if (index !== -1) {
            posts[index] = { ...posts[index], ...updatedData };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
            return posts[index];
        }
        return null;
    },

    // Delete post
    delete: (id) => {
        const posts = BlogService.getAll();
        const filtered = posts.filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        return true;
    },

    // Reset to default (helper for admin)
    reset: () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
        return SEED_DATA;
    }
};
