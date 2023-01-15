import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { Feed } from "feed";
// import {getSortedPostsData, getPostData, PostMeta} from './lib/posts';
import {remark} from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), 'posts');

const siteUrl = 'https://blog.birdinforest.com';

async function generateRSSFeed(activePostsData) {
  // Create a new feed object
  const feed = new Feed({
    title: "Derek's blog",
    description: 'All blog posts.',
    link: `${siteUrl}`,
    id: `${siteUrl}`,
    // TODO: Add favicon.ico
    // favicon: "http://example.com/favicon.ico",
    copyright: "All rights reserved 2023, Derek Wang.",
    feedLinks: {
      json: `${siteUrl}/json`,
      atom: `${siteUrl}/atom`,
    },
    author: {
      name: "Derek Wang",
      email: "birdinforest@gmail.com",
      // TODO: link profile
      // link: "https://example.com/johndoe"
    },
  });

  activePostsData.forEach(post => {
    const postData = getPostData(post.id).then(postData => {
      feed.addItem({
        title: post.title,
        id: `${siteUrl}/posts/${post.id}?utm_source=rss&utm_medium=feed`,
        link: `${siteUrl}/posts/${post.id}?utm_source=rss&utm_medium=feed`,
        date: new Date(post.date),
        description: post.description,
        content: postData.contentHtml,
      })
    });
  })
  // The path should be /public/rss.xml folder.
  // The public folder in Next.js is used to store static assets like images and downloadable files.
  const fullFilePathAtom = path.join(process.cwd(), 'public', 'atom.xml');
  const fullFilePathRSS2 = path.join(process.cwd(), 'public', 'rss.xml');
  // Remove the old file
  if (fs.existsSync(fullFilePathAtom)) {
    await fs.promises.unlink(fullFilePathAtom)
  }
  if (fs.existsSync(fullFilePathRSS2)) {
    await fs.promises.unlink(fullFilePathRSS2)
  }
  fs.writeFile(fullFilePathAtom, feed.atom1(), err => {
    if (err) {
      console.log('Atom Generate Error: ', err)
    }
    console.log('Atom Generate successes at ', fullFilePathAtom)
  });
  fs.writeFile(fullFilePathRSS2, feed.rss2(), err => {
    if (err) {
      console.log('RSS2 Generate Error: ', err)
    }
    console.log('RSS2 Generate successes at ', fullFilePathRSS2)
  });
}

// TODO: Find a way to import this function from `./lib/posts.tsx`
async function getSortedPostsData() {
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
    }
  });

  const activePostsData = allPostsData.filter(d => d.date !== undefined);

  // Sort posts by date
  activePostsData.sort(((a, b) => {
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

  return activePostsData;
}

// TODO: Find a way to import this function from `./lib/posts.tsx`
async function getPostData(id) {
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

async function main() {
  let activePostsData = await getSortedPostsData();
  await generateRSSFeed(activePostsData);
}

main();
