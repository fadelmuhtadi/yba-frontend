"use client";

import { useState } from "react";
import { createCarStock } from "../../../../services/carStockService";

export default function CreateCarStockPage() {
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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (image) {
        formData.append("image", image);
      }

      const result = await createCarStock(formData);

      setMessage(result.message || "Stok mobil berhasil ditambahkan");

      setForm({
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

      setImage(null);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Tambah Stok Mobil
          </h1>

          <p className="mt-2 text-gray-600">
            Masukkan informasi mobil yang akan ditambahkan ke stok.
          </p>
        </div>

        {message && (
          <div className="mb-6 rounded-lg bg-blue-100 px-4 py-3 text-blue-700">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl bg-white p-6 shadow-sm"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nama Mobil
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Contoh: Toyota Avanza G"
                className="text-gray-700 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Brand
              </label>

              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                required
                placeholder="Contoh: Toyota"
                className="text-gray-700 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Tahun
              </label>

              <input
                type="number"
                name="year"
                value={form.year}
                onChange={handleChange}
                required
                placeholder="Contoh: 2022"
                className="text-gray-700 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nomor Polisi
              </label>

              <input
                type="text"
                name="license_plate"
                value={form.license_plate}
                onChange={handleChange}
                required
                placeholder="Contoh: BG 1234 ABC"
                className="text-gray-700 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nomor Rangka
              </label>

              <input
                type="text"
                name="chassis_number"
                value={form.chassis_number}
                onChange={handleChange}
                required
                placeholder="Masukkan nomor rangka"
                className="text-gray-700 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nomor Mesin
              </label>

              <input
                type="text"
                name="engine_number"
                value={form.engine_number}
                onChange={handleChange}
                required
                placeholder="Masukkan nomor mesin"
                className="text-gray-700 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Pemilik Sebelumnya
              </label>

              <input
                type="text"
                name="previous_owner"
                value={form.previous_owner}
                onChange={handleChange}
                required
                placeholder="Masukkan nama pemilik sebelumnya"
                className="text-gray-700 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="text-gray-700 w-full rounded-lg border border-gray-300 px-4 py-2"
              >
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Harga Beli
              </label>

              <input
                type="number"
                name="buy_price"
                value={form.buy_price}
                onChange={handleChange}
                required
                placeholder="Contoh: 200000000"
                className="text-gray-700 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Harga Jual
              </label>

              <input
                type="number"
                name="sell_price"
                value={form.sell_price}
                onChange={handleChange}
                required
                placeholder="Contoh: 220000000"
                className="text-gray-700 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Deskripsi
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              required
              placeholder="Masukkan deskripsi kondisi mobil"
              className="text-gray-700 w-full rounded-lg border border-gray-300 px-4 py-2"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Foto Mobil
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-gray-700 w-full rounded-lg border border-gray-300 px-4 py-2"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : "Simpan Stok Mobil"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}