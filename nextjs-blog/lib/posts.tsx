import fs from 'fs';
import path from 'path';
// Parse md metadata section
import matter from 'gray-matter';
// Parse md and convert to html
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts');

export type PostMeta = {
  title: string,
  id: string,
  description: string,
  contentHtml: string,
  date: string,
  time?: string,
}

export async function getSortedPostsData(): Promise<PostMeta[]> {
  // Get file names under `/posts`
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(filename => {
    // Remove `.md` from file name to get id
    const id = filename.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    } as PostMeta;
  });

  const activePostsData = allPostsData.filter(d => d.date !== undefined);

  // Sort posts by date
  return activePostsData.sort(((a, b) => {
    // @ts-ignore
    if (a.date < b.date) {
      return 1;
      // @ts-ignore
    } else if(a.date > b.date) {
      return -1;
    } else {
      return 0;
    }
  }));
}

/**
 * Fetch all IDs from posts directory.
 * Be noted that the returned data structure is requested by
 * dynamic routes and `/pages/[id].tsx#getStaticProps`:
 * Each object in the array must have the `params` key and
 * contain an object with the `id` key (because we’re using `[id]` in the post page file name).
 */
export function getAllPostIds(): {params: {id: string}}[] {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map(filename => {
    return {
      params: {
        id: filename.replace(/\.md$/, ''),
      }
    }
  })
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContent);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
