const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');
const RSS = require('rss');

const postsDirectory = path.join(process.cwd(), 'posts');

const siteUrl = 'https://blog.birdinforest.com';

async function generateRSSFeed(activePostsData) {
  // Create a new feed object
  const feed = new RSS({
    title: "RSS feed of Derek's blog",
    description: 'All blog posts.',
    feed_url: `${siteUrl}/rss.xml`,
    site_url: `${siteUrl}`,
    copyright: '(c) 2023 Derek Wang',
  });

  activePostsData.forEach(post => {
    feed.item({
      title: post.title,
      date: new Date(post.date),
      URL: `${siteUrl}/posts/${post.id}?utm_source=rss&utm_medium=feed`,
    })
  })
  // The path should be /public/rss.xml folder.
  // The public folder in Next.js is used to store static assets like images and downloadable files.
  const fullFilePath = path.join(process.cwd(), 'public', 'rss.xml');
  // Remove the old file
  if (fs.existsSync(fullFilePath)) {
    await fs.promises.unlink(fullFilePath)
  }
  fs.writeFile(fullFilePath, feed.xml(), err => {
    if (err) {
      console.log('RSS Generate Error: ', err)
    }
    console.log('RSS Generate successes at ', fullFilePath)
  });
}

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

  // // Generate rss feed
  // await generateRSSFeed(activePostsData);

  return activePostsData;
}

async function main() {
  let activePostsData = await getSortedPostsData();
  await generateRSSFeed(activePostsData);
}

main();
