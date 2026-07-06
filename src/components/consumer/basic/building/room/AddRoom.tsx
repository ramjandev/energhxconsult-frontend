import CommonButton from "@/common/button/CommonButton";
import CommonSelect from "@/common/button/CommonSelect";
import SectionHeader from "@/common/header/SectionHeader";
import { inputClass } from "@/pages/Login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { LuPackage } from "react-icons/lu";
import { z } from "zod";

const WALL_TYPES = [
  { label: "Brick", value: "brick" },
  { label: "Concrete", value: "concrete" },
  { label: "Wood Frame", value: "wood" },
  { label: "Steel Frame", value: "steel" },
];

const ROOF_TYPES = [
  { label: "Flat", value: "flat" },
  { label: "Pitched", value: "pitched" },
  { label: "Metal", value: "metal" },
];

const SHADING_TYPES = [
  { label: "None", value: "none" },
  { label: "Blinds", value: "blinds" },
  { label: "Curtains", value: "curtains" },
  { label: "External Shading", value: "external" },
];

const LIGHTING_TYPES = [
  { label: "LED", value: "led" },
  { label: "Fluorescent", value: "fluorescent" },
  { label: "Incandescent", value: "incandescent" },
];

const VELOCITY_TYPES = [
  { label: "Seated", value: "seated" },
  { label: "Standing", value: "standing" },
  { label: "Walking", value: "walking" },
];

const ACTIVITY_TYPES = [
  { label: "Resting", value: "resting" },
  { label: "Light Work", value: "light" },
  { label: "Moderate Work", value: "moderate" },
  { label: "Heavy Work", value: "heavy" },
];

const formSchema = z.object({
  title: z.string().nonempty("Title is required"),
  humidityRatio: z.string().nonempty("Space air humidity ratio is required"),
  airTemperature: z.string().nonempty("Space air temperature is required"),

  wallType: z.string().nonempty("Please select a wall type"),
  northWallArea: z.string().nonempty("North wall area is required"),
  southWallArea: z.string().nonempty("South wall area is required"),
  eastWallArea: z.string().nonempty("East wall area is required"),
  westWallArea: z.string().nonempty("West wall area is required"),

  roofType: z.string().nonempty("Please select a roof type"),
  roofArea: z.string().nonempty("Roof area is required"),

  uValue: z.string().nonempty("U-value is required"),
  indoorShading: z.string().nonempty("Please select indoor shading"),
  beamSHGC: z.string().nonempty("Beam solar heat gain coefficient is required"),
  beamIndoorAttenuation: z
    .string()
    .nonempty("Beam indoor solar attenuation coefficient is required"),
  diffuseSHGC: z
    .string()
    .nonempty("Diffuse solar heat gain coefficient is required"),
  diffuseIndoorAttenuation: z
    .string()
    .nonempty("Diffuse indoor solar attenuation coefficient is required"),
  northSunlitArea: z
    .string()
    .nonempty("North fenestration sunlit area is required"),
  eastSunlitArea: z
    .string()
    .nonempty("East fenestration sunlit area is required"),
  southSunlitArea: z
    .string()
    .nonempty("South fenestration sunlit area is required"),
  westSunlitArea: z
    .string()
    .nonempty("West fenestration sunlit area is required"),
  northShadedArea: z
    .string()
    .nonempty("North fenestration shaded area is required"),
  eastShadedArea: z
    .string()
    .nonempty("East fenestration shaded area is required"),
  southShadedArea: z
    .string()
    .nonempty("South fenestration shaded area is required"),
  westShadedArea: z
    .string()
    .nonempty("West fenestration shaded area is required"),

  lightingType: z.string().nonempty("Please select a lighting type"),
  lightingCapacity: z.string().nonempty("Capacity is required"),

  peopleCapacity: z.string().nonempty("Capacity is required"),
  velocityType: z.string().nonempty("Please select a velocity type"),
  activityType: z.string().nonempty("Please select an activity type"),

  infiltrationRate: z.string().nonempty("Infiltration rate is required"),
});

type FormData = z.infer<typeof formSchema>;

const AddRoom = () => {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      humidityRatio: "",
      airTemperature: "",
      wallType: "",
      northWallArea: "",
      southWallArea: "",
      eastWallArea: "",
      westWallArea: "",
      roofType: "",
      roofArea: "",
      uValue: "",
      indoorShading: "",
      beamSHGC: "",
      beamIndoorAttenuation: "",
      diffuseSHGC: "",
      diffuseIndoorAttenuation: "",
      northSunlitArea: "",
      eastSunlitArea: "",
      southSunlitArea: "",
      westSunlitArea: "",
      northShadedArea: "",
      eastShadedArea: "",
      southShadedArea: "",
      westShadedArea: "",
      lightingType: "",
      lightingCapacity: "",
      peopleCapacity: "",
      velocityType: "",
      activityType: "",
      infiltrationRate: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Add room →", data);
    // TODO: dispatch / API call
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-green-100 p-2 rounded-lg">
          <LuPackage className="text-green-600" size={24} />
        </div>

        <h1 className="text-xl font-bold text-green-600 uppercase tracking-wide">
          Add Room to Building
        </h1>
      </div>

      {/* Basic Info */}
      <div>
        <SectionHeader title="Room Information" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <input
              type="text"
              placeholder="Title"
              className={inputClass.input}
              {...register("title")}
            />
            {errors.title && (
              <p className={inputClass.error}>{errors.title.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Space Air Humidity Ratio"
              className={inputClass.input}
              {...register("humidityRatio")}
            />
            {errors.humidityRatio && (
              <p className={inputClass.error}>{errors.humidityRatio.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Space Air Temperature"
              className={inputClass.input}
              {...register("airTemperature")}
            />
            {errors.airTemperature && (
              <p className={inputClass.error}>
                {errors.airTemperature.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Walls */}
      <div>
        <SectionHeader title="Walls" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <Controller
              control={control}
              name="wallType"
              render={({ field }) => (
                <CommonSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  item={WALL_TYPES}
                  placeholder="Type"
                  className="w-full"
                />
              )}
            />
            {errors.wallType && (
              <p className={inputClass.error}>{errors.wallType.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <input
              type="text"
              placeholder="North Wall Area"
              className={inputClass.input}
              {...register("northWallArea")}
            />
            {errors.northWallArea && (
              <p className={inputClass.error}>{errors.northWallArea.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="South Wall Area"
              className={inputClass.input}
              {...register("southWallArea")}
            />
            {errors.southWallArea && (
              <p className={inputClass.error}>{errors.southWallArea.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="East Wall Area"
              className={inputClass.input}
              {...register("eastWallArea")}
            />
            {errors.eastWallArea && (
              <p className={inputClass.error}>{errors.eastWallArea.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="West Wall Area"
              className={inputClass.input}
              {...register("westWallArea")}
            />
            {errors.westWallArea && (
              <p className={inputClass.error}>{errors.westWallArea.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Roof */}
      <div>
        <SectionHeader title="Roof" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <Controller
              control={control}
              name="roofType"
              render={({ field }) => (
                <CommonSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  item={ROOF_TYPES}
                  placeholder="Type"
                  className="w-full"
                />
              )}
            />
            {errors.roofType && (
              <p className={inputClass.error}>{errors.roofType.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Area"
              className={inputClass.input}
              {...register("roofArea")}
            />
            {errors.roofArea && (
              <p className={inputClass.error}>{errors.roofArea.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Fenestration */}
      <div>
        <SectionHeader title="Fenestration" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              placeholder="U-value"
              className={inputClass.input}
              {...register("uValue")}
            />
            {errors.uValue && (
              <p className={inputClass.error}>{errors.uValue.message}</p>
            )}
          </div>

          <div>
            <Controller
              control={control}
              name="indoorShading"
              render={({ field }) => (
                <CommonSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  item={SHADING_TYPES}
                  placeholder="Indoor Shading"
                  className="w-full"
                />
              )}
            />
            {errors.indoorShading && (
              <p className={inputClass.error}>{errors.indoorShading.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Beam Solar Heat Gain Coefficient"
              className={inputClass.input}
              {...register("beamSHGC")}
            />
            {errors.beamSHGC && (
              <p className={inputClass.error}>{errors.beamSHGC.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Beam Indoor Solar attenuation Coefficient"
              className={inputClass.input}
              {...register("beamIndoorAttenuation")}
            />
            {errors.beamIndoorAttenuation && (
              <p className={inputClass.error}>
                {errors.beamIndoorAttenuation.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Diffuse Solar Heat Gain Coefficient"
              className={inputClass.input}
              {...register("diffuseSHGC")}
            />
            {errors.diffuseSHGC && (
              <p className={inputClass.error}>{errors.diffuseSHGC.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Diffuse Indoor Solar attenuation Coefficient"
              className={inputClass.input}
              {...register("diffuseIndoorAttenuation")}
            />
            {errors.diffuseIndoorAttenuation && (
              <p className={inputClass.error}>
                {errors.diffuseIndoorAttenuation.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="North Fenestration Sunlit Area"
              className={inputClass.input}
              {...register("northSunlitArea")}
            />
            {errors.northSunlitArea && (
              <p className={inputClass.error}>
                {errors.northSunlitArea.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="East Fenestration Sunlit Area"
              className={inputClass.input}
              {...register("eastSunlitArea")}
            />
            {errors.eastSunlitArea && (
              <p className={inputClass.error}>
                {errors.eastSunlitArea.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="South Fenestration Sunlit Area"
              className={inputClass.input}
              {...register("southSunlitArea")}
            />
            {errors.southSunlitArea && (
              <p className={inputClass.error}>
                {errors.southSunlitArea.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="West Fenestration Sunlit Area"
              className={inputClass.input}
              {...register("westSunlitArea")}
            />
            {errors.westSunlitArea && (
              <p className={inputClass.error}>
                {errors.westSunlitArea.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="North Fenestration Shaded Area"
              className={inputClass.input}
              {...register("northShadedArea")}
            />
            {errors.northShadedArea && (
              <p className={inputClass.error}>
                {errors.northShadedArea.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="East Fenestration Shaded Area"
              className={inputClass.input}
              {...register("eastShadedArea")}
            />
            {errors.eastShadedArea && (
              <p className={inputClass.error}>
                {errors.eastShadedArea.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="South Fenestration Shaded Area"
              className={inputClass.input}
              {...register("southShadedArea")}
            />
            {errors.southShadedArea && (
              <p className={inputClass.error}>
                {errors.southShadedArea.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="West Fenestration Shaded Area"
              className={inputClass.input}
              {...register("westShadedArea")}
            />
            {errors.westShadedArea && (
              <p className={inputClass.error}>
                {errors.westShadedArea.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Lighting */}
      <div>
        <SectionHeader title="Lighting" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-1">
          <div>
            <Controller
              control={control}
              name="lightingType"
              render={({ field }) => (
                <CommonSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  item={LIGHTING_TYPES}
                  placeholder="Type"
                  className="w-full"
                />
              )}
            />
            {errors.lightingType && (
              <p className={inputClass.error}>{errors.lightingType.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Capacity"
              className={inputClass.input}
              {...register("lightingCapacity")}
            />
            {errors.lightingCapacity && (
              <p className={inputClass.error}>
                {errors.lightingCapacity.message}
              </p>
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Energy Consumption from lighting: 0
        </p>
      </div>

      {/* People */}
      <div>
        <SectionHeader title="People" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <input
              type="text"
              placeholder="Capacity"
              className={inputClass.input}
              {...register("peopleCapacity")}
            />
            {errors.peopleCapacity && (
              <p className={inputClass.error}>
                {errors.peopleCapacity.message}
              </p>
            )}
          </div>

          <div>
            <Controller
              control={control}
              name="velocityType"
              render={({ field }) => (
                <CommonSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  item={VELOCITY_TYPES}
                  placeholder="Velocity Type"
                  className="w-full"
                />
              )}
            />
            {errors.velocityType && (
              <p className={inputClass.error}>{errors.velocityType.message}</p>
            )}
          </div>

          <div>
            <Controller
              control={control}
              name="activityType"
              render={({ field }) => (
                <CommonSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  item={ACTIVITY_TYPES}
                  placeholder="Activity Type"
                  className="w-full"
                />
              )}
            />
            {errors.activityType && (
              <p className={inputClass.error}>{errors.activityType.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Infiltration */}
      <div>
        <SectionHeader title="Infiltration" />
        <div className="max-w-xs">
          <input
            type="text"
            placeholder="Infiltration Rate"
            className={inputClass.input}
            {...register("infiltrationRate")}
          />
          {errors.infiltrationRate && (
            <p className={inputClass.error}>
              {errors.infiltrationRate.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <CommonButton type="submit" className="px-8">
          Add Room
        </CommonButton>
      </div>
    </form>
  );
};

export default AddRoom;
