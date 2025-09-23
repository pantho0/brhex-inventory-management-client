import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, BadgeCheck, ArchiveRestore } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { useDeleteMenu } from "@/hooks/menu.hook";
import { toast } from "sonner";

export interface MenuItemCardProps {
  _id?: string;
  category: {
    _id?: string;
    catName: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  itemName: string;
  price: number;
  description: string;
  image: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function MenuItemCard({
  _id,
  image,
  itemName,
  category,
  price,
  description,
  isDeleted,
}: MenuItemCardProps) {
  const { mutate: handleDeleteRestore } = useDeleteMenu();

  const handleDelete = (_id: string) => {
    handleDeleteRestore(_id, {
      onSuccess: () => {
        toast.success("Menu item deleted successfully", { duration: 2000 });
      },
    });
  };

  const handleRestore = (_id: string) => {
    handleDeleteRestore(_id, {
      onSuccess: () => {
        toast.success("Menu item restored successfully", { duration: 2000 });
      },
    });
  };

  return (
    <Card className="w-full max-w-xs shadow-md rounded-xl overflow-hidden">
      {/* Image Section */}
      <div className="h-44 w-full overflow-hidden">
        <Image
          src={image}
          alt="Item Image"
          width={400}
          height={400}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content Section */}
      <CardHeader className="px-3">
        <CardTitle className="text-base font-semibold">{itemName}</CardTitle>
        <div className="mt-1">
          <Badge
            variant="secondary"
            className="bg-blue-500 text-white dark:bg-blue-600 text-xs px-2 py-0.5"
          >
            <BadgeCheck className="w-3 h-3 mr-1" />
            {category.catName}
          </Badge>
        </div>
        <p className="text-sm font-bold text-green-600">${price.toFixed(2)}</p>
      </CardHeader>

      <CardContent className="px-3">
        <p className="text-xs text-black line-clamp-2 mb-3">{description}</p>
        <div className="flex gap-2">
          {!isDeleted && (
            <Link href={`/admin-management/all-items/${_id}`}>
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-1 text-xs text-white cursor-pointer hover:bg-black/90 hover:text-white"
              >
                <Pencil className="w-3 h-3" />
                Update
              </Button>
            </Link>
          )}
          {!isDeleted ? (
            <Button
              onClick={() => handleDelete(_id!)}
              size="sm"
              variant="destructive"
              className="flex items-center gap-1 text-xs cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </Button>
          ) : (
            <Button
              onClick={() => handleRestore(_id!)}
              size="sm"
              variant="default"
              className="flex items-center gap-1 text-xs cursor-pointer bg-green-700 hover:bg-green-700/90"
            >
              <ArchiveRestore className="w-3 h-3" />
              Restore
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
