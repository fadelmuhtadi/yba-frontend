import Link from "next/link";

export default function CarStockCard({ car }) {
  const sellPrice = Number(car.sell_price || 0);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

      {/* Gambar */}
      <div className="flex h-48 items-center justify-center bg-gray-100">
        {car.image ? (
          <img
            src={`http://127.0.0.1:8000/storage/${car.image}`}
            alt={car.name || "Mobil"}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-sm text-gray-400">
            Belum ada gambar
          </span>
        )}
      </div>

      {/* Informasi */}
      <div className="p-5">

        <div className="mb-3 flex items-start justify-between gap-3">
          <h2 className="text-xl font-semibold text-gray-900">
            {car.name || "-"}
          </h2>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              car.status === "available"
                ? "bg-green-100 text-green-700"
                : car.status === "reserved"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {car.status || "-"}
          </span>
        </div>

        <div className="space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-medium">Brand:</span>{" "}
            {car.brand || "-"}
          </p>

          <p>
            <span className="font-medium">Tahun:</span>{" "}
            {car.year || "-"}
          </p>

          <p>
            <span className="font-medium">Harga Jual:</span>{" "}
            Rp {sellPrice.toLocaleString("id-ID")}
          </p>
        </div>

        <Link
          href={`/car-stocks/${car.id}`}
          className="mt-5 block rounded-lg bg-blue-600 px-4 py-2 text-center font-medium text-white hover:bg-blue-700"
        >
          Lihat Detail
        </Link>

      </div>
    </div>
  );
}