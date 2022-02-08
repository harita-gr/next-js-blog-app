import Head from "next/head";
import { getPost, getSlugs } from "../../lib/posts";

//For dynamic routing
export async function getStaticPaths() {
  const slugs = await getSlugs();
  return {
    paths: slugs.map((slug) => ({
       params: {slug},
    })),
    // paths: [ 
    //   { params: { slug: "first-post" } },
    //   { params: { slug: "second-post" } },
    // ],
    fallback: false, //if none of the paths matched => 404
  };
};

//Loading data asynchronously
export async function getStaticProps({params: {slug}}) {
  const post = await getPost(slug);
  return {
    props: { post },
  };
}

const FirstPostPage = ({ post }) => {
  console.log("[FirstPostPage] render:", post);
  return (
    <>
      <Head>
        <title>{post.title} - My Blog</title>
        <meta name="description" value=" This is my blog" />F
      </Head>
      <h1>{post.title} </h1>
      <p>{post.date}</p>
      {/* Okay to use dangerouslySetInnerHTML as the data is injected by developer, not user. */}
      <article dangerouslySetInnerHTML={{ __html: post.body }} />
    </>
  );
};

export default FirstPostPage;
