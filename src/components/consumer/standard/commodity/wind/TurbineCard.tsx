import CommonButton from "@/common/button/CommonButton";
import { Eye, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { WindEquipment } from "./types";

interface TurbineCardProps {
  turbine: WindEquipment;
  isSelected: boolean;
  quantity: number;
  onAdd: () => void;
  onQuantityChange: (qty: number) => void;
  onViewDetails: () => void;
}

const TurbineCard: React.FC<TurbineCardProps> = ({
  turbine,
  isSelected,
  quantity,
  onAdd,
  onQuantityChange,
  onViewDetails,
}) => {
  const lineTotal = turbine.price * quantity;

  return (
    <div
      className={`rounded-2xl overflow-hidden border bg-white transition-colors ${
        isSelected ? "border-green-500 border-2" : "border-gray-200"
      }`}
    >
      <img
        src={turbine.imageUrl}
        alt={`${turbine.brand} ${turbine.model}`}
        className="w-full h-40 object-cover"
      />

      <div className="p-5">
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          {turbine.brand}
        </p>
        <h3 className="text-lg font-bold text-foreground mb-3">
          {turbine.model}
        </h3>

        <dl className="space-y-1.5 text-sm mb-3">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Output / Spec</dt>
            <dd className="font-medium text-foreground">
              {turbine.outputSpec}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Technology</dt>
            <dd className="font-medium text-foreground">
              {turbine.technology}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Additional</dt>
            <dd className="font-medium text-foreground">
              {turbine.additionalSpec}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Efficiency</dt>
            <dd className="font-medium text-foreground">
              {turbine.efficiencyRating}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Warranty</dt>
            <dd className="font-medium text-foreground">
              {turbine.warrantyYears} years
            </dd>
          </div>
        </dl>

        <div className="flex items-center gap-0.5 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.round(turbine.rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="border-t border-gray-100 pt-3">
          <p className="text-2xl font-bold text-foreground mb-3">
            ${(turbine.price / 1000).toFixed(1)}k
          </p>

          {isSelected ? (
            <>
              <div className="flex items-center justify-between border border-gray-200 rounded-full px-4 py-2">
                <button
                  type="button"
                  onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-medium">{quantity}</span>
                <button
                  type="button"
                  onClick={() => onQuantityChange(quantity + 1)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <p className="text-center text-green-600 font-semibold mt-2">
                ${(lineTotal / 1000).toFixed(1)}k
              </p>
            </>
          ) : (
            <div className="flex gap-2">
              <CommonButton
                variant="outline"
                className="flex-1"
                onClick={onViewDetails}
              >
                <Eye className="w-4 h-4 mr-1.5" />
                Details
              </CommonButton>
              <CommonButton
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={onAdd}
              >
                <ShoppingCart className="w-4 h-4 mr-1.5" />
                Add
              </CommonButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TurbineCard;
