import LayoutStandardConsumer from "@/Layout/LayoutStandardConsumer";
import AssignedAssociates from "@/pages/consumer/basic/AssignedAssociates";
import BatteryStorageDesign from "@/pages/consumer/standard/BatteryStorageDesign";
import BiomassEnergy from "@/pages/consumer/standard/BiomassEnergy";
import BuildingHVACModelling from "@/pages/consumer/standard/BuildingHVACModelling";
import CheckoutReport from "@/pages/consumer/standard/CheckoutReport";
import EngineeringReviewApproval from "@/pages/consumer/standard/EngineeringReviewApproval";
import EngineeringServices from "@/pages/consumer/standard/EngineeringServices";
import EVChargingInfrastructure from "@/pages/consumer/standard/EVChargingInfrastructure";
import NetZeroEnergyBuilding from "@/pages/consumer/standard/NetZeroEnergyBuilding";
import ProfileSettings from "@/pages/consumer/standard/ProfileSettings";
import ResSequenceValidation from "@/pages/consumer/standard/ResSequenceValidation";
import SDashboard from "@/pages/consumer/standard/SDashboard";
import SolarEnergy from "@/pages/consumer/standard/SolarEnergy";
import ThermalComfortSimulation from "@/pages/consumer/standard/ThermalComfortSimulation";
import WindEnergy from "@/pages/consumer/standard/WindEnergy";
import ZeroEmissionVehicle from "@/pages/consumer/standard/ZeroEmissionVehicle";
import ProjectProposalContract from "./ProjectProposalContract";

const standardConsumerRoutes = {
  path: "standard-consumer",
  element: <LayoutStandardConsumer />,
  children: [
    { path: "dashboard", element: <SDashboard /> },

    // Energy Commodity Setup
    { path: "zev", element: <ZeroEmissionVehicle /> },
    { path: "nzeb", element: <NetZeroEnergyBuilding /> },
    {
      path: "thermal-comfort-simulation",
      element: <ThermalComfortSimulation />,
    },
    { path: "engineering-services", element: <EngineeringServices /> },
    { path: "solar-energy", element: <SolarEnergy /> },
    { path: "wind-energy", element: <WindEnergy /> },
    { path: "biomass-energy", element: <BiomassEnergy /> },
    { path: "hvac-modelling", element: <BuildingHVACModelling /> },
    { path: "battery-storage", element: <BatteryStorageDesign /> },
    { path: "ev-charging", element: <EVChargingInfrastructure /> },

    // Validation & Approval
    { path: "res-sequence-validation", element: <ResSequenceValidation /> },
    { path: "engineering-review", element: <EngineeringReviewApproval /> },

    // Contracts & Reports
    { path: "project-proposal", element: <ProjectProposalContract /> },
    { path: "checkout-report", element: <CheckoutReport /> },

    // Settings
    { path: "profile-settings", element: <ProfileSettings /> },
    { path: "assigned-associates", element: <AssignedAssociates /> },
  ],
};

export default standardConsumerRoutes;
