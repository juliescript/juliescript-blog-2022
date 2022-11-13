import Link from 'next/link';

import { getPosts } from '../lib/posts';

export async function getStaticProps(context) {
  const posts = await getPosts();

  if (!posts) {
    return {
      notFound: true,
    };
  }

  return {
    props: { posts }
  };
}

export default function Home(props) {
  const { posts } = props;

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link href={`/${post.slug}`}>
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
