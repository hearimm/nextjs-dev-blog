import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Image as ImageUI  } from "@nextui-org/react";

import { getAllPostIds, getPostData } from '@/lib/posts';
import "./article.css";

import type { Metadata, ResolvingMetadata } from 'next'
import mime from 'mime-types';
import { notFound } from 'next/navigation'

export async function generateMetadata({
    params: { id },
  }: {
    params: { id: string }
  }): Promise<Metadata> {

    const postData = await getPostData(id);
    if(!postData) {
        return {}
    }
    const host = process.env.NEXT_PUBLIC_HOST || 'localhost:3000';
    const url = `${process.env.NEXT_PUBLIC_PROTOCOL || 'http'}://${host}/article/${id}`;
    // 이미지 URL
    const imageUrl = host + postData.imgSrc;
    // 이미지의 MIME 타입
    const mimeType = mime.lookup(imageUrl);
    // 이미지의 실제 크기를 가져오는 비동기 함수 호출
    const image = {
        url: imageUrl,
        secureUrl: imageUrl,
        alt: "Article Thumbnail",
        type: mimeType || '', // MIME 타입
    };

    return {
        title: postData.title,
        description: postData.excerpt,
        openGraph: {
            title: postData.title,
            url: url,
            type: "article",
            images : [image],
            publishedTime: postData.publishedTime,
            authors: postData.author,
            section: postData.section,
            tags: postData.tags,
        },
    };
}

export async function generateStaticParams() {
    const paths = getAllPostIds();
    return paths
}
   

export default async function Page({
    params: { id },
  }: {
    params: { id: string }
  }) {
    const postData = await getPostData(id)
    if (!postData) {
        return notFound()
    }
    return (
        <div className='bg-white'>
            <Navbar />
            <div className='flex flex-col items-center px-12'>
                <ImageUI
                    // as={NextImage}
                    alt="Article Thumbnail"
                    className="object-cover rounded-2xl mt-9"
                    src={postData.imgSrc}
                    // radius='lg'
                    width={640}
                    // height={240}
                    // style={{ width: "240px", height:"240px",objectFit:"cover"}}
                />
                <div className='mx-auto max-w-2xl'
                dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </div>
            <Footer />
        </div>
    )
  }