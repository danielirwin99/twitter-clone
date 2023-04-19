import Head from "next/head";
import Sidebar from "@/components/Sidebar";
import PostFeed from "@/components/PostFeed";
import Trending from "@/components/Trending";
import BottomerBanner from "@/components/BottomerBanner";

export default function Home() {
  return (
    <>
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="bg-black min-h-screen text-[#e7e9ea] max-w-[1500px] ml-auto mr-auto flex overflow-y-hidden">
          <Sidebar />
          <PostFeed />
          <Trending />
        </div>
        <BottomerBanner />
      </div>
    </>
  );
}
