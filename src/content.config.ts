import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const artists = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artists' }),
  schema: z.object({
    name: z.string(),
    photo: z.string(),
    genres: z.array(z.string()),
    location: z.string().optional(),
    bio_short: z.string(),
    featured: z.boolean().default(false),
    social: z.object({
      instagram: z.string().optional(),
      spotify: z.string().optional(),
      apple_music: z.string().optional(),
      soundcloud: z.string().optional(),
      tiktok: z.string().optional(),
      youtube: z.string().optional(),
      website: z.string().optional(),
    }).optional(),
    order: z.number().default(0),
  }),
});

const releases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/releases' }),
  schema: z.object({
    title: z.string(),
    artist: z.string(),
    artist_slug: z.string(),
    cover: z.string(),
    release_date: z.coerce.date(),
    type: z.enum(['Single', 'EP', 'LP', 'Compilation']),
    genres: z.array(z.string()).optional(),
    tracklist: z.array(z.object({
      number: z.number(),
      title: z.string(),
      duration: z.string().optional(),
      featured: z.string().optional(),
    })).optional(),
    streaming: z.object({
      spotify: z.string().optional(),
      apple_music: z.string().optional(),
      amazon_music: z.string().optional(),
      bandcamp: z.string().optional(),
      soundcloud: z.string().optional(),
      youtube: z.string().optional(),
    }).optional(),
    catalog_number: z.string().optional(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    venue: z.string(),
    city: z.string(),
    address: z.string().optional(),
    is_showcase: z.boolean().default(false),
    lineup: z.array(z.string()).optional(),
    ticket_url: z.string().optional(),
    banner: z.string().optional(),
    status: z.enum(['upcoming', 'past']).default('upcoming'),
  }),
});

export const collections = { artists, releases, events };
