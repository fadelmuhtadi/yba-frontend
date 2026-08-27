"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCarStocks } from "../../services/carStockService";

export default function DashboardPage() {
  const [carStocks, setCarStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCarStocks() {
      try {
        // const data = await getCarStocks();
        // setCarStocks(data);
        const result = await getCarStocks();
        setCarStocks(result.data);
      } catch (error) {
        console.error("Gagal mengambil data stok:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCarStocks();
  }, []);

  const totalStock = carStocks.length;

  const availableStock = carStocks.filter(
    (car) => car.status === "available"
  ).length;

  const reservedStock = carStocks.filter(
    (car) => car.status === "reserved"
  ).length;

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Ringkasan manajemen stok mobil.
          </p>
        </div>

        {/* Statistik */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Stok
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {totalStock}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Mobil dalam database
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Available
            </p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {availableStock}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Siap untuk dijual
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Reserved
            </p>

            <p className="mt-2 text-3xl font-bold text-yellow-600">
              {reservedStock}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Sedang dipesan
            </p>
          </div>
        </div>

        {/* Stok Terbaru */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Stok Mobil
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Daftar stok mobil yang tersedia dalam sistem.
              </p>
            </div>

            <Link
              href="/car-stocks"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Lihat Semua
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {carStocks.slice(0, 5).map((car) => (
              <div
                key={car.id}
                className="flex items-center justify-between py-4"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {car.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {car.brand} · {car.year}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    Rp {car.sell_price.toLocaleString("id-ID")}
                  </p>

                  <span
                    className={`text-sm ${
                      car.status === "available"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {car.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}