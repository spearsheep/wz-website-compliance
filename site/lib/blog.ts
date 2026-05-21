import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  readingTime: number
}

export interface Post extends PostMeta {
  content: string
}

const POSTS_DIR = path.join(process.cwd(), "content", "blog")

function readPostFile(filename: string): Post | null {
  if (!filename.endsWith(".mdx") && !filename.endsWith(".md")) return null
  const fullPath = path.join(POSTS_DIR, filename)
  const raw = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(raw)
  const slug = filename.replace(/\.mdx?$/, "")
  const words = content.split(/\s+/).length
  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || new Date().toISOString().slice(0, 10),
    author: data.author || "Jobs Junior",
    tags: data.tags || [],
    readingTime: Math.max(1, Math.round(words / 200)),
    content,
  }
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  const files = fs.readdirSync(POSTS_DIR)
  const posts = files
    .map((f) => readPostFile(f))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
  return posts.map(({ content, ...meta }) => meta)
}

export function getPostBySlug(slug: string): Post | null {
  const tryMdx = path.join(POSTS_DIR, `${slug}.mdx`)
  const tryMd = path.join(POSTS_DIR, `${slug}.md`)
  const filename = fs.existsSync(tryMdx) ? `${slug}.mdx` : fs.existsSync(tryMd) ? `${slug}.md` : null
  if (!filename) return null
  return readPostFile(filename)
}
