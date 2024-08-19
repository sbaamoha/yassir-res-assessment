import { useEffect, useState } from "react";
import { fetchJsonContent } from "./lib/api";

function App() {
  const [data, setData] = useState<Reservation[]>([]);

  useEffect(() => {
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
  console.log(data);
  return (
    <main>
      <header>
        <nav className="flex mx-6 justify-between">
          <h1 className="text-bold ">Yassir Restaurent</h1>
        </nav>
      </header>
      {data.map((reserv) => (
        <h2>{reserv.customer.firstName}</h2>
      ))}
    </main>
  );
}

export default App;
