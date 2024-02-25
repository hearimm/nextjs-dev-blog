import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Image  } from "@nextui-org/react";

import { getAllPostIds, getPostData } from '@/lib/posts';
import "./article.css";

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false // Can be set to 'blocking' if you prefer
    };
}

export default async function Page({
    params: { id },
  }: {
    params: { id: string }
  }) {
    const postData = await getPostData(id)
    if (!postData) {
        return <div>Loading...</div>; // Add a loading state
    }
    return (
        <div className='bg-white'>
            <Navbar />
            <div className='flex flex-col items-center'>
                <Image
                    // as={NextImage}
                    alt="Post Thumbnail"
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