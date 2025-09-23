"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/context/user.provider";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Image as LucideImg, Lock, Mail } from "lucide-react";
import Link from "next/link";

export interface IUserProfile {
  name: string;
  email: string | undefined;
  avatarUrl: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useUser();

  const userProfile: any = {
    name: user?.fullName,
    email: user?.email,
    avatarUrl: "https://github.com/shadcn.png",
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-4 flex flex-col lg:flex-row gap-4 justify-center items-start lg:items-center">
      <Card className="w-full max-w-md shadow-lg rounded-lg">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <Avatar className="h-24 w-24 border-4 border-purple-500 shadow-md">
              <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
            </Avatar>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            {userProfile.name}
          </CardTitle>
          <CardDescription className="text-gray-600 flex items-center justify-center mt-1">
            <Mail className="h-4 w-4 mr-2 text-secondary" /> {userProfile.email}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />
          <div>
            <Link href="/admin-dashboard/settings">
              <Button
                variant="outline"
                className="w-full bg-green-700 hover:bg-green-700/90 hover:text-white text-white flex items-center justify-start text-lg py-6 cursor-pointer"
              >
                <Lock className="mr-3 h-5 w-5" /> Change Password
              </Button>
            </Link>
          </div>
          <div>
            <Link href="/admin-dashboard/orders">
              <Button
                variant="outline"
                className="w-full bg-blue-700 hover:bg-blue-700/90 hover:text-white text-white flex items-center justify-start text-lg py-6 cursor-pointer"
              >
                <LucideImg className="mr-3 h-5 w-5" /> Change Avatar
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
