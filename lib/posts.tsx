// lib/posts.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'data/posts');

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'hello-world'
  //     }
  //   },
  //   ...
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    };
  });
}

export type PostData = {
  id: string;
  contentHtml: string;
  title: string;
  date: string;
  excerpt: string;
  imgSrc: string;
  publishedTime: string;
  author: string;
  section: string;
  tags: string[];
};

export function getPostData(fileNameWithoutExt:string):PostData | null {
  const fullPath = path.join(postsDirectory, `${fileNameWithoutExt}.md`);
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = remark().use(html).processSync(matterResult.content).toString();
    // Combine the data with the id and contentHtml
    return {
      id: fileNameWithoutExt,
      contentHtml: processedContent,
      title: matterResult.data.title || '',
      date: matterResult.data.date || '',
      excerpt: matterResult.data.excerpt || '',
      imgSrc: matterResult.data.imgSrc || '',
      publishedTime: matterResult.data.publishedTime || '',
      author: matterResult.data.author || '',
      section: matterResult.data.section || '',
      tags: matterResult.data.tags || []
    };
  } catch (error) {
    // 파일 읽기 실패 시 처리할 오류 처리 로직
    console.error('Error reading file:', error);
    return null
  }
}

export function getAllPosts() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Get the post data
    const postData = getPostData(id);

    return postData;
  });
}
