import { Designer, Prices, SidebarType, TextsType } from "@/app/info-data/Image-text";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function Sidebar() {
  return (
    <div className="hidden  sm:flex flex-col space-y-10">
      <div>
        <h1 className="mb-5">Product type</h1>
        <div className="flex flex-col space-y-4">
          {TextsType.map((item, index) => (
            <CheckBoxLabel key={index} title={item.title} />
          ))}
      
        </div>
      </div>
      <div>
        <h1 className="mb-5">Price</h1>
        <div className="flex flex-col space-y-4">
          {Prices.map((item, index) => (
            <CheckBoxLabel key={index} title={item.title} />
          ))}
        </div>
      </div>
      <div>
        <h1 className="mb-5">Designer</h1>
        <div className="flex flex-col space-y-4">
          {Designer.map((item, index) => (
            <CheckBoxLabel key={index} title={item.title} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CheckBoxLabel({ title }: SidebarType) {
  return (
    <div className="flex flex-row items-center space-x-2">
      <Checkbox />
      <Label>{title}</Label>
    </div>
  );
}
