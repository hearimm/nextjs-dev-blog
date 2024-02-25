import { getAllPosts } from '../lib/posts';
import { Card, CardBody, Image } from "@nextui-org/react";
import {Link} from "@nextui-org/react";

const list = getAllPosts()
export const CardList = () => {
    return (
        <div className="gap-2 min-h-screen">
            {list.map((item, index) => (
                <div key={index} className={`${index > 0 ? 'mt-20' : ''}`}> 
                <Link className="w-full" href={`/article/${item.id}`}>
                <Card className="w-full max-h-64" key={index} isPressable>
                    <CardBody className="overflow-hidden flex">
                        <div className='flex flex-row gap-2'>
                            <div className="basis-1/3">
                                <Image
                                    // as={NextImage}
                                    alt="Album cover"
                                    className="object-cover rounded-2xl"
                                    src={item.imgSrc}
                                    // radius='lg'
                                    width={240}
                                    height={240}
                                    style={{ width: "240px", height:"240px",objectFit:"cover"}}
                                />
                            </div>

                            <div className='basis-2/3 flex flex-col justify-center text-left'>
                                <h1 className="text-3xl text-gray-800 font-bold mb-3.5">{item.title}</h1>
                                <p className="text-base text-gray-500 mb-3">{item.excerpt}</p>
                                <p className="text-sm text-gray-400">{item.date}</p> 
                            </div>
                        </div>
                    </CardBody>
                </Card>
                </Link>
                </div>
            ))}
        </div>
    )
}
