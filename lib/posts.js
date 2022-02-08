import { readFile, readdir } from "fs/promises";
import matter from "gray-matter"; // to get meta data from md.file
import { marked } from "marked"; // to convert md into html

//JSON

// export async function getPost(slug) {
//   const data = await readFile(`contents/posts/${slug}.json`, "utf-8");
//   return JSON.parse(data);
// }

//MARKDOWN

export async function getPost(slug) {
  const source = await readFile(`contents/posts/${slug}.md`, "utf-8");
  const {
    data: { date, title },
    content,
  } = matter(source); // data = meta data ; content = body;
  const body = marked(content); //convert md data from source to html
  return {
    title,
    date,
    body,
  };
}

export async function getSlugs() {
  const files = await readdir("contents/posts"); //Get array of files
  const suffix = ".md";
  return files
    .filter((file) => file.endsWith(suffix))
    .map((file) => file.slice(0, -suffix.length));
}

export async function getPosts() {
  const slugs = await getSlugs();
  const posts =[];
  for(const slug of slugs) {
    const post = await getPost(slug);
    posts.push({slug,...post});
  }
  return  posts;

}