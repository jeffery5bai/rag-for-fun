import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-16 bg-gradient-to-b from-orange-500 via-black to-black from-0% via-50% to-100%">
      <div className="flex items-center justify-center gap-16">
        <Image src="/cat-shock.jpg" alt="cat-shock" width={350} height={350} className="rounded-full" draggable={false} />
        <Image src="/dog-sting.jpg" alt="dog-sting" width={350} height={350} className="rounded-full" draggable={false} />
      </div>
      <div className="flex flex-col items-center justify-center gap-8">
        <h2 className="text-4xl font-bold">Buckle Up!</h2>
        <p className="text-2xl">The ride is about to start!</p>
        <Link href="/auth" className="bg-orange-500 text-white px-4 py-2 rounded-md">Join Waitlist</Link>
      </div>
    </div>
  );
}
