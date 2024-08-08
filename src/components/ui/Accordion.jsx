import { useState } from "react";
import Icon from "@/components/ui/Icon";
const Accordion = ({ title, content, isOpen = true }) => {
  const [open, setOpen] = useState(isOpen);

  const toggleAccordion = () => setOpen(!open);

  return (
    <div className="space-y-5">
      <div
        className={`accordion shadow-base dark:shadow-none rounded-md ${
          open ? "bg-slate-50 dark:bg-slate-700 dark:bg-opacity-60 rounded-t-md" : "bg-slate-50 dark:bg-slate-700 rounded-md"
        }`}
      >
        <div
          className="flex justify-between cursor-pointer transition duration-150 font-medium w-full text-start text-base text-slate-600 dark:text-slate-300 px-8 py-4"
          onClick={toggleAccordion}
        >
          <span className="font-bold text-primary-500 text-lg">{title}</span>
          <span
            className={`text-slate-900 dark:text-white text-[22px] transition-all duration-300 h-5 ${
              open ? "rotate-180 transform" : ""
            }`}
          >
            <Icon icon="heroicons-outline:chevron-down" />
          </span>
        </div>

        {open && (
          <div
            className="text-sm text-slate-600 font-normal bg-white dark:bg-slate-900 dark:text-slate-300 rounded-b-md"
          >
            <div className="px-4 py-4">
              {content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Accordion;
