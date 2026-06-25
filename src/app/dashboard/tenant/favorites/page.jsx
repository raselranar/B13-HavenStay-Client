import { protectedFetch } from "@/lib/core/server";
import { getUserSession } from "@/lib/core/session";
import { Heart } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
const FavoritesTable = dynamic(() => import("./FavoritesTable.client"));

const favoritesPreview = [
  {
    name: "Coastal Retreat",
    location: "Malibu, California",
    price: "$245",
    beds: 3,
    baths: 2,
    sqft: 1200,
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Pine Forest Cabin",
    location: "Aspen, Colorado",
    price: "$180",
    beds: 2,
    baths: 1,
    sqft: 850,
    img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Modern City Loft",
    location: "Brooklyn, New York",
    price: "$310",
    beds: 1,
    baths: 1,
    sqft: 728,
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=500&q=80",
  },
];
// meta data
export const metadata = {
  title: "My Favorites",
  description: "Your favorite properties",
};

const FavoritesPage = async () => {
  const session = await getUserSession();
  console.log(session);
  const favorites = await protectedFetch(
    `/api/properties/favorites/?userId=${session?.session?.userId}`,
  );
  console.log(favorites);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-wide">
          Favorites
        </h2>
      </div>

      {!favorites || favorites.length === 0 ? (
        <div className="py-20 text-center">
          <Heart className="mx-auto mb-4 w-12 h-12 text-gray-300" />
          <p className="text-gray-500">You have no favorites yet.</p>
        </div>
      ) : (
        <div>
          {/* Client component renders a table and handles removal */}
          <FavoritesTable
            initialFavorites={favorites}
            userId={session?.session?.userId}
          />
        </div>
      )}
    </div>
  );
};
export default FavoritesPage;
