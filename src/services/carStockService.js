// const API_URL = "http://127.0.0.1:8000/api/car-stocks";
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://yba-backend-production.up.railway.app/api';

// delete carstock
export async function deleteCarStock(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message || "Gagal menghapus stok mobil");
  }

  return response.json();
}

// update CARSTOCK
export async function updateCarStock(id, formData) {
  formData.append("_method", "PUT");

  const response = await fetch(`${API_URL}/${id}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message || "Gagal memperbarui stok mobil");
  }

  return response.json();
}

// export async function updateCarStock(id, formData) {
//   const response = await fetch(`${API_URL}/${id}`, {
//     method: "POST",
//     body: formData,
//   });

//   if (!response.ok) {
//     const error = await response.json();

//     throw new Error(error.message || "Gagal memperbarui stok mobil");
//   }

//   return response.json();
// }

// getstock (id)
export async function getCarStock(id) {
  const response = await fetch(`${API_URL}/${id}`);
  

  if (!response.ok) {
    throw new Error("Data stok mobil tidak ditemukan");
  }

  const result = await response.json();

  return result.data;
}

// get stock ()
export async function getCarStocks(page = 1, search = "", status = "") {
  const params = new URLSearchParams();

  params.append("page", page);

  if (search) {
    params.append("search", search);
  }

  if (status) {
    params.append("status", status);
  }

  const response = await fetch(`${API_URL}/car-stocks?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Gagal mengambil data stok mobil");
  }

  const result = await response.json();

  return result.data;
}

// form data
export async function createCarStock(formData) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/car-stocks`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Gagal menambahkan stok mobil");
  }

  return response.json();
}