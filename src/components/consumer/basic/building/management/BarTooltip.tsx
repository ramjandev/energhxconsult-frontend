const BarTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-md">
      <div className="font-medium text-slate-700">{label}</div>
      <div className="text-slate-500">{payload[0].value} kWh</div>
    </div>
  );
};

export default BarTooltip;
