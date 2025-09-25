import React from "react";

export const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <h1 className="text-2xl sm:text-3xl font-bold text-[#17183b] mb-8">{title}</h1>
);