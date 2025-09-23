"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateReservation } from "@/hooks/reservations.hook";
import { Mail, Phone, Users, CalendarDays, Clock } from "lucide-react";

interface ReservationCardProps {
  _id: string;
  customerName: string;
  email: string;
  phone: string;
  headCount: number;
  status: string;
  date: string;
  time: string;
  onStatusChange: (value: string) => void;
}

export default function ReservationCard({
  _id,
  customerName,
  email,
  phone,
  headCount,
  status,
  date,
  time,
}: ReservationCardProps) {
  const { mutate: handleUpdateReservation } = useUpdateReservation();

  const onStatusChange = (value: string) => {
    handleUpdateReservation({ id: _id, status: value });
  };

  return (
    <Card className="w-full bg-green-100/50 shadow-md rounded-xl overflow-hidden">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold">{customerName}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-secondary" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-secondary" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-secondary" />
          <span>{headCount} People</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-secondary" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-secondary" />
          <span>{time}</span>
        </div>

        {/* Status Dropdown */}
        <div className="pt-2">
          <p className="text-xs text-secondary mb-1">Status</p>
          <Select defaultValue={status} onValueChange={onStatusChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
