import React, { useState } from "react";
import { tambahLaporan } from "@/lib/api";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";

const AddLaporan = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [formData, setFormData] = useState({
        tanggal: new Date().toISOString().split("T")[0],
        nomor_resep: "",
        nama_pasien: "",
        dokter: "",
        nama_asisten: "",
        jasa: 0,
        obat: 0,
        lain_lain: 0,
        tindakan: 0,
        lab: 0,
        nebu: 0,
        total: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = ["jasa", "obat", "lain_lain", "tindakan", "lab", "nebu"].includes(name)
            ? parseFloat(value.replace(/[^0-9]/g, "")) || 0
            : value;

        const updatedFormData = {
            ...formData,
            [name]: newValue,
        };

        updatedFormData.total = updatedFormData.jasa + updatedFormData.obat + updatedFormData.lain_lain +
            updatedFormData.tindakan + updatedFormData.lab + updatedFormData.nebu;

        setFormData(updatedFormData);
    };

    const handleSubmit = async () => {
        console.log("Data yang dikirim:", formData); // Debugging
        const response = await tambahLaporan(formData);
        if (response) {
            alert("Laporan berhasil ditambahkan!");
            setFormData({
                tanggal: new Date().toISOString().split("T")[0],
                nomor_resep: "",
                nama_pasien: "",
                dokter: "",
                nama_asisten: "",
                jasa: 0,
                obat: 0,
                lain_lain: 0,
                tindakan: 0,
                lab: 0,
                nebu: 0,
                total: 0,
            });
            onOpenChange();
        } else {
            alert("Gagal menambahkan laporan.");
        }
    };


    return (
        <div>
            <Button onPress={onOpen} color="primary">
                Tambah Laporan
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Tambah Laporan</ModalHeader>
                            <ModalBody>
                                {Object.keys(formData).map((key) => (
                                    <div key={key} className="flex flex-col">
                                        <label className="text-sm font-medium mb-1">
                                            {key.replace("_", " ").toUpperCase()}
                                        </label>
                                        <Input
                                            name={key}
                                            value={
                                                ["jasa", "obat", "lain_lain", "tindakan", "lab", "nebu", "total"].includes(key)
                                                    ? `IDR ${formData[key].toLocaleString("id-ID")}`
                                                    : formData[key]
                                            }
                                            onChange={handleChange}
                                            variant="bordered"
                                            isReadOnly={key === "total"}
                                        />
                                    </div>
                                ))}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Batal
                                </Button>
                                <Button color="primary" onPress={(e) => handleSubmit(e)}>
                                    Simpan
                                </Button>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default AddLaporan;