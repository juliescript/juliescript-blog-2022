import { getSinglePost, getPosts } from "../lib/posts";

export default function PostPage(props) {
  const {
    post
  } = props;
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  )
}

export async function getStaticPaths() {
  const posts = await getPosts();

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps(context) {
  const post = await getSinglePost(context.params.slug);

  if(!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post }
  };
}