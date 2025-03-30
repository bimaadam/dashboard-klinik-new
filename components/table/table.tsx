import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { RenderCell } from "./render-cell";
import { getLaporan, hapusLaporan, updateLaporan } from "@/lib/api";
import { Button, Spinner } from "@nextui-org/react";

const columns = [
  { uid: "id", name: "ID" },
  { uid: "tanggal", name: "Tanggal" },
  { uid: "nomor_resep", name: "Nomor Resep" },
  { uid: "nama_pasien", name: "Nama Pasien" },
  { uid: "dokter", name: "Dokter" },
  { uid: "nama_asisten", name: "Nama Asisten" },
  { uid: "jasa", name: "Jasa" },
  { uid: "obat", name: "Obat" },
  { uid: "lain_lain", name: "Lain-Lain" },
  { uid: "tindakan", name: "Tindakan" },
  { uid: "lab", name: "Lab" },
  { uid: "nebu", name: "Nebu" },
  { uid: "total", name: "Total" },
  { uid: "actions", name: "Aksi" },
];

export const TableWrapper = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const laporan = await getLaporan();
    setData(laporan);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin mau hapus laporan ini?")) {
      const success = await hapusLaporan(id);
      if (success) {
        alert("Laporan berhasil dihapus");
        fetchData(); // Refresh data
      } else {
        alert("Gagal menghapus laporan");
      }
    }
  };

  const handleUpdate = async (id) => {
    const newData = prompt("Masukkan data baru (JSON):");
    if (newData) {
      const success = await updateLaporan(id, JSON.parse(newData));
      if (success) {
        alert("Laporan berhasil diperbarui");
        fetchData(); // Refresh data
      } else {
        alert("Gagal memperbarui laporan");
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Button onClick={fetchData} color="primary" variant="bordered">
        Reload Data
      </Button>
      {loading ? (
        <div className="flex justify-center items-center h-20">
          <Spinner label="Memuat data..." />
        </div>
      ) : (
        <Table aria-label="Table Laporan Keuangan">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={data}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>
                    {RenderCell({
                      user: item,
                      columnKey: columnKey,
                      onDelete: () => handleDelete(item.id),
                      onUpdate: () => handleUpdate(item.id),
                    })}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};