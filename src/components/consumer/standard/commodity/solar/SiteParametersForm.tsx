import SectionHeader from "@/common/header/SectionHeader";
import { inputClass } from "@/pages/Login";
import { SiteSolarParameters } from "./types";

interface SiteParametersFormProps {
  parameters: SiteSolarParameters;
  onChange: (parameters: SiteSolarParameters) => void;
}

interface FieldConfig {
  key: keyof SiteSolarParameters;
  label: string;
  helperText?: string;
}

const FIELDS: FieldConfig[] = [
  { key: "totalRoofAreaSqFt", label: "Total Roof Area (sq ft)" },
  { key: "availableRoofAreaSqFt", label: "Available Roof Area (sq ft)" },
  { key: "solarIrradiance", label: "Solar Irradiance (kWh/m²/day)" },
  { key: "tiltAngleDegrees", label: "Tilt Angle (degrees)" },
  {
    key: "azimuthDegrees",
    label: "Azimuth (degrees)",
    helperText: "180° = South facing",
  },
  {
    key: "systemLossFactorPct",
    label: "System Loss Factor (%)",
    helperText: "Includes shading, soiling, wiring",
  },
];

const SiteParametersForm: React.FC<SiteParametersFormProps> = ({
  parameters,
  onChange,
}) => {
  const handleFieldChange = (key: keyof SiteSolarParameters, value: string) => {
    const numericValue = value === "" ? 0 : parseFloat(value);
    onChange({ ...parameters, [key]: numericValue });
  };

  return (
    <div className="bg-white border border-[#E7E9E8] rounded-2xl">
      <div className="flex items-start gap-3 px-6 py-5">
        <span className="w-6 h-6 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center shrink-0">
          1
        </span>

        <SectionHeader
          size="lg"
          title="Site & Solar Parameters"
          description="These parameters are used to optimize system sizing and performance
          calculations"
        />
      </div>

      <div className="border-t border-[#E7E9E8] px-6 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
          {FIELDS.map((field) => (
            <div key={field.key}>
              <label htmlFor={field.key} className={inputClass.label}>
                {field.label}
              </label>
              <input
                id={field.key}
                type="number"
                value={parameters[field.key]}
                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                className={inputClass.input}
              />
              {field.helperText && (
                <p className="text-xs text-[#758179] mt-1.5">
                  {field.helperText}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5 mt-5">
          <div>
            <label htmlFor="panelEfficiencyPct" className={inputClass.label}>
              Panel Efficiency (%)
            </label>
            <input
              id="panelEfficiencyPct"
              type="number"
              value={parameters.panelEfficiencyPct}
              onChange={(e) =>
                handleFieldChange("panelEfficiencyPct", e.target.value)
              }
              className={inputClass.input}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteParametersForm;
