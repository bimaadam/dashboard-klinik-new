'use client'
import React, { useEffect, useState } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from '@nextui-org/react'
import { getGaji } from '@/lib/api'

type Gaji = {
    ID: number
    nama: string
    jabatan: string
    gaji_pokok: number
    tindakan: number
    periksa: number
    inj: number
    ekg: number
    infus: number
    nebu: number
    total: number
    created_at: string
    updated_at: string
}

const Penggajian = () => {
    const [data, setData] = useState<Gaji[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getGaji()
            .then(setData)
            .catch(err => console.error("Gagal fetch:", err))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return (
        <div className="flex justify-center items-center h-[300px]">
            <Spinner label="Loading data..." color="primary" />
        </div>
    )

    return (
        <div className="p-4">
            <Table isStriped isCompact aria-label="Tabel Penggajian Pegawai">
                <TableHeader>
                    <TableColumn>NAMA</TableColumn>
                    <TableColumn>JABATAN</TableColumn>
                    <TableColumn>GAJI POKOK</TableColumn>
                    <TableColumn>TINDAKAN</TableColumn>
                    <TableColumn>PERIKSA</TableColumn>
                    <TableColumn>INJEKSI</TableColumn>
                    <TableColumn>EKG</TableColumn>
                    <TableColumn>INFUS</TableColumn>
                    <TableColumn>NEBU</TableColumn>
                    <TableColumn>TOTAL</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"Data kosong cuy"}>
                    {data.map((item) => (
                        <TableRow key={item.ID}>
                            <TableCell>{item.nama}</TableCell>
                            <TableCell>{item.jabatan}</TableCell>
                            <TableCell>Rp {item.gaji_pokok.toLocaleString()}</TableCell>
                            <TableCell>Rp {item.tindakan.toLocaleString()}</TableCell>
                            <TableCell>Rp {item.periksa.toLocaleString()}</TableCell>
                            <TableCell>Rp {item.inj.toLocaleString()}</TableCell>
                            <TableCell>Rp {item.ekg.toLocaleString()}</TableCell>
                            <TableCell>Rp {item.infus.toLocaleString()}</TableCell>
                            <TableCell>Rp {item.nebu.toLocaleString()}</TableCell>
                            <TableCell className="font-bold text-green-600">Rp {item.total.toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default Penggajian
