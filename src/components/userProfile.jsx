import { getUserSession } from "@/lib/core/session";
import { User, Mail } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { timeFormat } from "@/lib/utils";

export default async function UserProfilePage({ userData }) {
  const avatarUrl = userData?.image || null;
  const initials =
    userData?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "User";

  return (
    <main className="min-h-screen py-10 px-4 md:px-8 max-w-4xl mx-auto text-gray-900">
      {/* Page Header Section */}
      <div className="mb-8 pb-4 border-b border-gray-100">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900">
          Your Profile
        </h1>
        <p className="text-xs text-gray-400 font-medium mt-1">
          See your profile details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 *:h-full gap-8 items-start">
        {/* Left Side: Avatar Panel */}
        <Card className="p-6 text-center space-y-4">
          <Avatar className="w-28 h-28 mx-auto">
            <AvatarImage src={avatarUrl} alt="Profile Identity" />
            <AvatarFallback className="text-4xl">{initials}</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="text-sm font-bold text-gray-900">
              {userData?.name || "HavenStay Member"}
            </h3>
          </div>
        </Card>

        {/* Right Side: Profile Info Display */}
        <Card className="md:col-span-2 p-6">
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name Display */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <User className="text-gray-400 size-4 flex-shrink-0" />
                  <p className="text-xs font-medium text-gray-900">
                    {userData?.name || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Email Display */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <Mail className="text-gray-400 size-4 flex-shrink-0" />
                  <p className="text-xs font-medium text-gray-900">
                    {userData?.email || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Location Display */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Role
                </label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <User className="text-gray-400 size-4 shrink-0" />
                  <p className="text-xs font-medium text-gray-900">
                    {userData?.role || "Not provided"}
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Member Since
                </label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <User className="text-gray-400 size-4 shrink-0" />
                  <p className="text-xs font-medium text-gray-900">
                    {timeFormat(userData?.createdAt) || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
