import { useEffect, useMemo, useState } from "react";
import { fetchJsonContent } from "./lib/api";
import { FilterBar, Filters } from "./components/FilterBar";
import SearchBar from "./components/SearchBar";
import { ReservationList } from "./components/ReservationList";
import { switchDateFormat } from "./lib/utils";

function App() {
  const [data, setData] = useState<Reservation[]>([]);
  const [filters, setFilters] = useState<Filters>({
    status: "",
    businessDate: "",
    shift: "",
    area: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReservations = useMemo(() => {
    return data.filter((reservation) => {
      const matchesFilters =
        (!filters.status || reservation.status === filters.status) &&
        (!filters.businessDate ||
          switchDateFormat(reservation.businessDate) ===
            filters.businessDate) &&
        (!filters.shift || reservation.shift === filters.shift) &&
        (!filters.area ||
          reservation.area.toLowerCase().includes(filters.area.toLowerCase()));

      const matchesSearch =
        !searchQuery ||
        `${reservation.customer.firstName} ${reservation.customer.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesFilters && matchesSearch;
    });
  }, [data, filters, searchQuery]);

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    // Data needed just in first render in this case, if there is a backend
    // better to user SWR or React Query
    const fetchData = async () => {
      try {
        const jsonData = await fetchJsonContent();
        setData(jsonData.reservations);
      } catch (error) {
        console.error("Error fetching JSON data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <main>
      <header>
        <nav className="flex mx-6 justify-between">
          <h2 className="text-3xl font-bold m-3">Restaurent</h2>
        </nav>
      </header>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Reservation List</h1>
        <FilterBar onFilterChange={handleFilterChange} filters={filters} />
        <SearchBar onSearch={handleSearch} />
        <ReservationList reservations={filteredReservations} />
      </div>
    </main>
  );
}

export default App;
