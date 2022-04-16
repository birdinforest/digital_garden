/**
 * Index page (home page).
 */

import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts'

// Get static data and return as prop to `Home` component.
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

// Access prop passed from `getStaticProps`.
export default function Home ({
  allPostsData
}: {
  allPostsData: {
    date: string
    time?: string
    title: string
    id: string
  }[]
}){
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        {/*TODO: Update*/}
        <p>Hello I am Derek. I'm a software engineer. You can contact me via: {' '}
          <a href="https://www.zhihu.com/people/wang-zheng-23-80">知乎</a>,
          {' '}
          <a href="https://www.linkedin.com/in/zheng-wang-derek/">Linkedin</a>, and
          {' '}
          <a href="https://github.com/birdinforest">Github</a>.
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, time, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                {
                  date &&
                  <Date dateString={date} timeString={time} title={title}/>
                }
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
