import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ReservationListProps {
  reservations: Reservation[];
}

export const ReservationList: React.FC<ReservationListProps> = ({
  reservations,
}) => {
  const [sortField, setSortField] = useState<
    keyof Reservation | "fullName" | null
  >("start"); // change it depend on the real reserved date start or businessDate
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const sortedReservations = useMemo(() => {
    if (!sortField) return reservations;

    return [...reservations].sort((a, b) => {
      if (sortField === "fullName") {
        const aName = `${a.customer.firstName} ${a.customer.lastName}`;
        const bName = `${b.customer.firstName} ${b.customer.lastName}`;
        return sortDirection === "asc"
          ? aName.localeCompare(bName)
          : bName.localeCompare(aName);
      }

      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [reservations, sortField, sortDirection]);

  const handleSort = (field: keyof Reservation | "fullName") => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead onClick={() => handleSort("fullName")}>
            Guest Name
          </TableHead>
          <TableHead onClick={() => handleSort("quantity")}>
            Guest Number
          </TableHead>
          <TableHead onClick={() => handleSort("businessDate")}>Date</TableHead>
          <TableHead onClick={() => handleSort("status")}>Status</TableHead>
          <TableHead onClick={() => handleSort("shift")}>Shift</TableHead>
          <TableHead onClick={() => handleSort("area")}>Area</TableHead>
          <TableHead onClick={() => handleSort("start")}>Start Time</TableHead>
          <TableHead onClick={() => handleSort("end")}>End Time</TableHead>
          <TableHead>Guest Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedReservations.map((reservation) => (
          <TableRow key={reservation.id}>
            <TableCell>{`${reservation.customer.firstName} ${reservation.customer.lastName}`}</TableCell>
            <TableCell>{reservation.quantity}</TableCell>
            <TableCell>{reservation.businessDate}</TableCell>
            <TableCell>{reservation.status}</TableCell>
            <TableCell>{reservation.shift}</TableCell>
            <TableCell>{reservation.area}</TableCell>
            <TableCell>{reservation.start}</TableCell>
            <TableCell>{reservation.end}</TableCell>
            <TableCell>{reservation.guestNotes}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
