"use client";
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://yba-backend-production.up.railway.app';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  getCarStock,
  deleteCarStock,
} from "../../../../services/carStockService";

export default function CarStockDetailPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCarStock() {
      try {
        const data = await getCarStock(id);
        setCar(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchCarStock();
    }
  }, [id]);

  async function handleDelete() {
  const confirmed = window.confirm(
    `Apakah kamu yakin ingin menghapus ${car.name}?`
  );

  if (!confirmed) {
    return;
  }

  try {
    await deleteCarStock(id);

    alert("Stok mobil berhasil dihapus");

    router.push("/car-stocks");
  } catch (error) {
    alert(error.message);
  }
}
  
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/car-stocks"
          className="mb-6 inline-block text-blue-600 hover:underline"
        >
          ← Kembali ke Stok Mobil
        </Link>

        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="flex h-72 items-center justify-center bg-gray-100">
            {car.image ? (
              <img
                src={`http://${BACKEND_URL}storage/${car.image}`}
                alt={car.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-gray-400">
                Belum ada gambar
              </span>
            )}
          </div>

          <div className="p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {car.name}
                </h1>

                <p className="mt-1 text-gray-900">
                  {car.brand} · {car.year}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  car.status === "available"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {car.status}
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm text-gray-900">
                  Nomor Polisi
                </p>

                <p className="font-medium text-gray-900">
                  {car.license_plate}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-900">
                  Nomor Rangka
                </p>

                <p className="font-medium text-gray-900">
                  {car.chassis_number}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-900">
                  Nomor Mesin
                </p>

                <p className="font-medium text-gray-900">
                  {car.engine_number}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-900">
                  Pemilik Sebelumnya
                </p>

                <p className="font-medium text-gray-900">
                  {car.previous_owner}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-900">
                  Harga Beli
                </p>

                <p className="font-medium text-gray-900">
                  Rp {car.buy_price.toLocaleString("id-ID")}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-900">
                  Harga Jual
                </p>

                <p className="font-medium text-gray-900">
                  Rp {car.sell_price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-900">
                Deskripsi
              </p>

              <p className="mt-1 text-gray-900">
                {car.description}
              </p>
            </div>

            <div className="mt-8 flex gap-3">
              <Link
                href={`/car-stocks/${car.id}/edit`}
                className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
              >
                Edit
              </Link>

              <button
                type="button"
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700">
                    
                Hapus
            </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}