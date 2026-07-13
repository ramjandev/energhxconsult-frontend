import BackButton from "@/common/button/BackButton";
import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/header/SectionHeader";
import { inputClass } from "@/pages/Login";
import { useState } from "react";
import ImageDropzone from "./ImageDropzone";

const CustomAppliance = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };
  const handleRemove = () => setPreview(null);

  return (
    <div className="  space-y-6">
      <BackButton />
      <CommonBorderWrapper isShadow className="">
        <SectionHeader
          title="Upload Custom Appliance"
          description="Add an appliance that's not in our database"
        />

        <div>
          <label className={inputClass.label}>Appliance Image</label>
          <ImageDropzone onFileSelect={handleFile} />
          {preview && (
            <>
              <div className="mt-4 h-80 overflow-hidden rounded-lg">
                <img
                  className="w-full h-full object-cover"
                  src={preview}
                  alt="Appliance Preview"
                />
              </div>{" "}
              <div className="flex justify-end">
                <CommonButton
                  size="sm"
                  variant="destructive"
                  onClick={handleRemove}
                  className="mt-4"
                >
                  Remove
                </CommonButton>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={inputClass.label}>Appliance Name</label>

            <input
              className={inputClass.input}
              type="text"
              placeholder="Enter appliance name"
            />
          </div>
          <div>
            <label className={inputClass.label}>Brand Name</label>

            <input
              className={inputClass.input}
              type="text"
              placeholder="Enter brand name"
            />
          </div>
          <div>
            <label className={inputClass.label}>Power Rating (W)</label>

            <input
              className={inputClass.input}
              type="number"
              placeholder="Enter power in watts"
            />
          </div>
          <div>
            <label className={inputClass.label}>Voltage</label>

            <input
              className={inputClass.input}
              type="number"
              placeholder="Enter power in V"
            />
          </div>
          <div>
            <label className={inputClass.label}>Energy Rating</label>

            <input
              className={inputClass.input}
              type="number"
              placeholder="Enter energy rating"
            />
          </div>
          <div>
            <label className={inputClass.label}>Quantity</label>

            <input
              className={inputClass.input}
              type="number"
              placeholder="Enter quantity"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <CommonButton type="submit">Add Appliance</CommonButton>
          <CommonButton variant="outline">Cancel</CommonButton>
        </div>
      </CommonBorderWrapper>
    </div>
  );
};

export default CustomAppliance;
