"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  getCarStock,
  updateCarStock,
} from "../../../../../services/carStockService";

export default function EditCarStockPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [form, setForm] = useState({
    name: "",
    brand: "",
    year: "",
    license_plate: "",
    chassis_number: "",
    engine_number: "",
    previous_owner: "",
    buy_price: "",
    sell_price: "",
    status: "available",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCar() {
      try {
        const car = await getCarStock(id);

        setForm({
          name: car.name || "",
          brand: car.brand || "",
          year: car.year || "",
          license_plate: car.license_plate || "",
          chassis_number: car.chassis_number || "",
          engine_number: car.engine_number || "",
          previous_owner: car.previous_owner || "",
          buy_price: car.buy_price || "",
          sell_price: car.sell_price || "",
          status: car.status || "available",
          description: car.description || "",
        });

        setCurrentImage(car.image);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchCar();
    }
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  function handleImageChange(event) {
    setImage(event.target.files[0]);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (image) {
        formData.append("image", image);
      }

      await updateCarStock(id, formData);

      router.push(`/car-stocks/${id}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Memuat data...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/car-stocks/${id}`}
          className="mb-6 inline-block text-blue-600 hover:underline"
        >
          ← Kembali ke Detail Mobil
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Edit Stok Mobil
          </h1>

          <p className="mt-2 text-gray-600">
            Perbarui informasi stok mobil.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-100 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl bg-white p-6 shadow-sm"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-gray-900 mb-2 block text-sm font-medium">
                Nama Mobil
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="text-gray-900 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="text-gray-900 mb-2 block text-sm font-medium">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                required
                className="text-gray-900 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="text-gray-900 mb-2 block text-sm font-medium">
                Tahun
              </label>
              <input
                type="number"
                name="year"
                value={form.year}
                onChange={handleChange}
                required
                className="text-gray-900 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="text-gray-900 mb-2 block text-sm font-medium">
                Nomor Polisi
              </label>
              <input
                type="text"
                name="license_plate"
                value={form.license_plate}
                onChange={handleChange}
                required
                className="text-gray-900 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="text-gray-900 mb-2 block text-sm font-medium">
                Nomor Rangka
              </label>
              <input
                type="text"
                name="chassis_number"
                value={form.chassis_number}
                onChange={handleChange}
                required
                className="text-gray-900 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="text-gray-900 mb-2 block text-sm font-medium">
                Nomor Mesin
              </label>
              <input
                type="text"
                name="engine_number"
                value={form.engine_number}
                onChange={handleChange}
                required
                className="text-gray-900 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="text-gray-900 mb-2 block text-sm font-medium">
                Pemilik Sebelumnya
              </label>
              <input
                type="text"
                name="previous_owner"
                value={form.previous_owner}
                onChange={handleChange}
                required
                className="text-gray-900 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="text-gray-900 mb-2 block text-sm font-medium">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="text-gray-900 w-full rounded-lg border border-gray-300 px-4 py-2"
              >
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
              </select>
            </div>

            <div>
              <label className="text-gray-900 mb-2 block text-sm font-medium">
                Harga Beli
              </label>
              <input
                type="number"
                name="buy_price"
                value={form.buy_price}
                onChange={handleChange}
                required
                className="text-gray-900 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="text-gray-900 mb-2 block text-sm font-medium">
                Harga Jual
              </label>
              <input
                type="number"
                name="sell_price"
                value={form.sell_price}
                onChange={handleChange}
                required
                className="text-gray-900 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-900 mb-2 block text-sm font-medium">
              Deskripsi
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              required
              className="text-gray-900 w-full rounded-lg border border-gray-300 px-4 py-2"
            />
          </div>

          <div>
            <label className="text-gray-900 mb-2 block text-sm font-medium">
              Foto Mobil
            </label>

            {currentImage && (
              <img
                src={`http://127.0.0.1:8000/storage/${currentImage}`}
                alt="Foto mobil saat ini"
                className="mb-4 h-40 w-60 rounded-lg object-cover"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
            />

            <p className="mt-2 text-sm text-gray-500">
              Kosongkan jika tidak ingin mengganti foto.
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Link
              href={`/car-stocks/${id}`}
              className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700"
            >
              Batal
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white disabled:opacity-50"
            >
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}