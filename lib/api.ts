const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getLaporan() {
  try {
    const res = await fetch(`${API_URL}/laporan`, { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal mengambil data laporan");
    return await res.json();
  } catch (err) {
    console.error("Error:", err);
    return [];
  }
}

export async function tambahLaporan(data: any) {
  try {
    const res = await fetch(`${API_URL}/laporan/tambah`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Gagal menambah laporan");
    return await res.json();
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
}

export async function updateLaporan(id: number, data: any) {
  try {
    const res = await fetch(`${API_URL}/laporan/update?id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Gagal memperbarui laporan");
    return await res.json();
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
}

export async function hapusLaporan(id: number) {
  try {
    console.log(`Menghapus laporan dengan ID: ${id}`); // Debugging

    const res = await fetch(`${API_URL}/laporan/hapus`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }), // Kirim ID di body
    });

    const responseText = await res.text(); // Baca responsenya buat debugging
    console.log("Response dari server:", responseText);

    if (!res.ok)
      throw new Error(
        `Gagal menghapus laporan: ${res.status} - ${responseText}`
      );
    return true;
  } catch (err) {
    console.error("Error:", err);
    return false;
  }
}
