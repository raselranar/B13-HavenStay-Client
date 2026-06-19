import { ArrowUpRight, Heart, Link } from "lucide-react";
import Image from "next/image";

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

const FavoritesPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-wide">
          Favorites
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {favoritesPreview.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs group">
            <div className="h-44 relative bg-gray-100 overflow-hidden">
              <Image
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                width={300}
                height={300}
              />
              <button className="absolute top-3 right-3 p-1.5 bg-white rounded-full text-red-500 border border-gray-100 shadow-xs cursor-pointer">
                <Heart className="size-3.5 fill-current" />
              </button>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-base font-bold text-gray-900 tracking-wide">
                    {item.name}
                  </h4>
                  <p className=" text-gray-400 font-medium">{item.location}</p>
                </div>
                <span className="text-base font-bold text-primary">
                  {item.price}
                  <span className="text-xs text-gray-400 font-normal">
                    /night
                  </span>
                </span>
              </div>
              <div className="flex gap-3 text-[10px] text-gray-400 font-bold border-t border-gray-50 pt-2">
                <span>🛏️ {item.beds} Beds</span>
                <span>🛁 {item.baths} Baths</span>
                <span>📐 {item.sqft} sqft</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FavoritesPage;
