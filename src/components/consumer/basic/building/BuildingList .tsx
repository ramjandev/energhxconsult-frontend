import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/header/SectionHeader";
import MiniSpinner from "@/common/loading/MiniSpinner";
import { useGetAllBuildingsQuery } from "@/store/consumer/basic/building/buildingApi";
import BuildingEmpty from "./BuildingEmpty";
import BuildingCard from "./card/BuildingCard";

const BuildingList = () => {
  const { data, isLoading } = useGetAllBuildingsQuery();
  const buildings = data?.data ?? [];

  return (
    <div className="space-y-6">
      {isLoading ? (
        <MiniSpinner />
      ) : buildings && buildings?.length > 0 ? (
        <>
          <div className="flex flex-col sm:flex-row items-start  justify-between gap-3">
            <div>
              <SectionHeader
                title="Building Information"
                description="Manage your buildings and their energy data"
              />
            </div>
            <CommonButton
              shape="rounded"
              to="./create-building"
              showDefaultIcon
              className="w-full sm:w-auto"
            >
              Create Building
            </CommonButton>
          </div>

          {buildings.map((b) => (
            <BuildingCard key={b.user_building_details_id} building={b} />
          ))}
        </>
      ) : (
        <BuildingEmpty />
      )}
    </div>
  );
};

export default BuildingList;
