import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CommonDropdown = () => {
  return (
    <>
      <div className="col-span-1 md:col-span-2 lg:col-span-2 w-full mb-[50px]">
        <Select>
          <SelectTrigger className="w-full md:w-[486px] rounded-none border-primary-gray">
            <SelectValue placeholder="Choose" />
          </SelectTrigger>
          <SelectContent className="bg-light-green">
            <SelectItem
              value="light"
              className="hover:bg-primary-green hover:text-white"
            >
              Light
            </SelectItem>
            <SelectItem
              value="dark"
              className="hover:bg-primary-green hover:text-white"
            >
              Dark
            </SelectItem>
            <SelectItem
              value="system"
              className="hover:bg-primary-green hover:text-white"
            >
              System
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default CommonDropdown;
