import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const BuildingEmpty = () => {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[70vh] text-center">
      <div className="w-36 h-36 bg-blue-50 rounded-full flex items-center justify-center mb-6">
        <Building2 className="w-16 h-16 text-blue-200" />
      </div>
      <h2 className="text-xl font-bold text-foreground mb-2">
        Enter Building Type and Specifications
      </h2>
      <p className="text-muted-foreground text-sm mb-6">
        Add your building details and room information to begin the audit
        process
      </p>
      <Link to="/basic-consumer/create-building">
        <Button className="px-6">Create Building</Button>
      </Link>
    </div>
  );
};

export default BuildingEmpty;
