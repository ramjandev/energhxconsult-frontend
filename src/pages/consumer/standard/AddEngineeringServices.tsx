import SectionHeader from "@/common/header/SectionHeader";
import ServiceCard, {
  Service,
} from "@/components/consumer/standard/commodity/addServices/ServiceCard";
import ServiceSummary from "@/components/consumer/standard/commodity/addServices/ServiceSummary";
import RecommendationCard from "@/components/consumer/standard/commodity/zev/RecommendationCard";
import { useState } from "react";

const SERVICES: Service[] = [
  {
    id: "solar",
    title: "Solar Energy System Design",
    description:
      "Professional solar array design with shading analysis and performance modeling",
    duration: "2-3 weeks",
    price: "$2,500",
  },
  {
    id: "wind",
    title: "Wind Energy System Design",
    description:
      "Comprehensive wind analysis including meteorological data and turbine selection",
    duration: "3-4 weeks",
    price: "$3,200",
  },
  {
    id: "biomass",
    title: "Biomass Energy System Design",
    description:
      "Detailed biomass resource analysis and system integration planning",
    duration: "2-3 weeks",
    price: "$2,800",
  },
  {
    id: "hvac",
    title: "Building HVAC Modelling",
    description:
      "Advanced building energy simulation for optimization and compliance",
    duration: "4-5 weeks",
    price: "$4,500",
  },
  {
    id: "battery",
    title: "Battery Storage Design",
    description: "Energy storage system sizing and integration planning",
    duration: "2-3 weeks",
    price: "$3,000",
  },
  {
    id: "ev",
    title: "EV Charging Infrastructure",
    description:
      "Electric vehicle charging station planning and grid integration",
    duration: "1-2 weeks",
    price: "$2,200",
  },
];

const AddEngineeringServices = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleService = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };
  const selectedServices = SERVICES.filter((service) =>
    selectedIds.includes(service.id),
  );

  const totalAmount = selectedServices.reduce((total, service) => {
    const price = Number(service.price.replace(/[$,]/g, ""));
    return total + price;
  }, 0);
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Add Engineering Services"
        description="Select professional services for your project"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {SERVICES.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            selected={selectedIds.includes(service.id)}
            onClick={() => toggleService(service.id)}
          />
        ))}
      </div>

      <ServiceSummary
        serviceCount={selectedServices.length}
        totalAmount={totalAmount}
      />
      <RecommendationCard
        title="Need Help Choosing?"
        description="Our energy consultants can help you select the right services for your project goals."
        footer="Schedule Consultation"
        footerClassName="text-[#155DFC]"
        wrapperClassName="bg-blue-50"
        borderClassName="border-blue-100"
      />
    </div>
  );
};

export default AddEngineeringServices;
