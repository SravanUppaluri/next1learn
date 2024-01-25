import Link from "next/link";
import ProductCard from "./components/ProductCard/ProductCard";
import {getServerSession} from "next-auth";
import {authOptions} from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <div>Hello {session && <span>{session?.user?.name}</span>}</div>

      <Link href="/users"> userS page </Link>
      <ProductCard />
    </main>
  );
}
