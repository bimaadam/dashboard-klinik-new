"use client";
import React from "react";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

export const CompanyHeader = () => {
  return (
    <div className="flex items-center mr-2 gap-2">
      <MedicalServicesIcon />
      <div className="flex flex-col">
        <h3 className="text-xl font-medium m-0 text-default-900 whitespace-nowrap">
          Klinik Setia Medika
        </h3>
      </div>
    </div>
  );
};
