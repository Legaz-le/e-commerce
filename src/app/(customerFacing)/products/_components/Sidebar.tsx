import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function Sidebar() {
  return (
    <div className="w-[385px] flex flex-col ">
      <h1 className="mb-5">Product type</h1>
      <div className="flex flex-col space-y-4">
        <CheckBoxLabel />
        <CheckBoxLabel />
        <CheckBoxLabel />
        <CheckBoxLabel />
        <CheckBoxLabel />
        <CheckBoxLabel />
        <CheckBoxLabel />
      </div>
    </div>
  );
}

function CheckBoxLabel() {
  return (
    <label className="flex flex-row items-center space-x-2">
      <Checkbox />
      <Label>Furniture</Label>
    </label>
  );
}
