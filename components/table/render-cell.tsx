import { Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";

interface Props {
  user: any;
  columnKey: string | React.Key;
  onDelete?: () => void;
  onUpdate?: () => void;
}

export const RenderCell = ({ user, columnKey, onDelete, onUpdate }: Props) => {
  const cellValue = user[columnKey];

  const formatIDR = (value: number) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value);

  const idrColumns = ["jasa", "obat", "lain_lain", "tindakan", "lab", "nebu", "total"];

  switch (columnKey) {
    case "actions":
      return (
        <div className="flex items-center gap-4">
          <Tooltip content="Edit Laporan" color="secondary">
            <button onClick={onUpdate}>
              <EditIcon size={20} fill="#979797" />
            </button>
          </Tooltip>
          <Tooltip content="Hapus Laporan" color="danger">
            <button onClick={onDelete}>
              <DeleteIcon size={20} fill="#FF0080" />
            </button>
          </Tooltip>
        </div>
      );
    default:
      return idrColumns.includes(columnKey as string) ? formatIDR(cellValue) : cellValue;
  }
};
