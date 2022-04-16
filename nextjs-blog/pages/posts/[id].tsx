import Layout from '../../components/layout';
import Head from 'next/head'
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

/**
 * Get a list of possible value for id
 */
export async function getStaticPaths() {
  // Learn more about `paths` key:
  // https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required
  const paths = getAllPostIds();

  return {
    paths,
    // ref: https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required
    // `false`: Paths not returned by `getStaticPaths` will result in a 404 page.
    fallback: false
  }
}

/**
 * Fetch necessary data for the blog post using `params.id`
 * @param params
 */
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export default function Post({
  postData
}: {
  postData: {
    title: string,
    id: string,
    contentHtml: string,
    date: string,
  }
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
