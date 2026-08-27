"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCarStocks } from "../services/carStockService";
import CarStockCard from "./CarStockCard";

export default function CarStockList() {
  const [carStocks, setCarStocks] = useState([]);
  const [pagination, setPagination] = useState(null);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchCarStocks() {
      try {
        setLoading(true);

        const result = await getCarStocks(page, search, status);

        setCarStocks(Array.isArray(result.data) ? result.data : []);
        setPagination(result);
      } catch (error) {
        console.error("Gagal mengambil data stok mobil:", error);
        setCarStocks([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCarStocks();
  }, [page, search, status]);

  function handleSearch() {
    setPage(1);
    setSearch(searchInput);
  }

  function handleStatusChange(event) {
    setPage(1);
    setStatus(event.target.value);
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Stok Mobil
            </h1>

            <p className="mt-2 text-gray-600">
              Daftar mobil yang tersedia dalam stok.
            </p>
          </div>

          <Link
            href="/car-stocks/create"
            className="rounded-lg bg-blue-600 px-5 py-3 text-center font-medium text-white hover:bg-blue-700"
          >
            + Tambah Stok Mobil
          </Link>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="flex flex-1 gap-2">
            <input
              type="text"
              placeholder="Cari nama mobil atau brand..."
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-blue-500"
            />

            <button
              onClick={handleSearch}
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              Cari
            </button>
          </div>

          <select
            value={status}
            onChange={handleStatusChange}
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700"
          >
            <option value="">Semua Status</option>
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
          </select>
        </div>

        {/* Daftar Mobil */}
        {carStocks.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
            <p className="text-gray-500">
              Tidak ada data stok mobil.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {carStocks.map((car) => (
              <CarStockCard
                key={car.id}
                car={car}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.last_page > 1 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">

            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Sebelumnya
            </button>

            {Array.from(
              { length: pagination.last_page },
              (_, index) => index + 1
            ).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  pageNumber === page
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {pageNumber}
              </button>
            ))}

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === pagination.last_page}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Berikutnya →
            </button>

          </div>
        )}
      </div>
    </main>
  );
}