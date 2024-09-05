"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker";
// import "react-day-picker/src/style.css";
import { tr } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function CalendarUI({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {

  const [selectedMonth, setSelectedMonth] = React.useState(new Date()); // Mevcut tarih

  const handleMonthChange = (newMonth: Date) => {
    setSelectedMonth(newMonth);
  };

  const months = [
    { name: "January", value: 0 },
    { name: "February", value: 1 },
    // Diğer ayları da burada ekleyebilirsiniz
  ];

  const years = [2023, 2024, 2025]; // Yılları burada belirtebilirsiniz

  const handleMonthSelect = (e: any) => {
    const newMonth = new Date(selectedMonth); // Mevcut tarih objesinin kopyasını al
    newMonth.setMonth(e.target.value);
    setSelectedMonth(newMonth);
  };

  const handleYearSelect = (e: any) => {
    const newMonth = new Date(selectedMonth); // Mevcut tarih objesinin kopyasını al
    newMonth.setFullYear(parseInt(e.target.value, 10));
    setSelectedMonth(newMonth);
  };

  const monthOptions = months.map((month, index) => (
    <option key={index} value={month.value}>
      {month.name}
    </option>
  ));

  const yearOptions = years.map((year, index) => (
    <option key={index} value={year}>
      {year}
    </option>
  ));

  const captionElement = (
    <div>
      <select onChange={handleMonthSelect} value={selectedMonth.getMonth()}>
        {monthOptions}
      </select>
      <select onChange={handleYearSelect} value={selectedMonth.getFullYear()}>
        {yearOptions}
      </select>
    </div>
  );

  return (
    <DayPicker
      locale={tr}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium hidden",
        caption_dropdowns: "flex items-center space-x-1",
        dropdown: "bg-translate dark:bg-slate-950 ring-0 outline-none",
        dropdown_month: "[&>.rdp-vhidden]:hidden",
        dropdown_year: "[&>.rdp-vhidden]:hidden",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute -left-1",
        nav_button_next: "absolute -right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      captionLayout="dropdown-buttons"
      fromYear={new Date().getFullYear() - 100}
      toYear={new Date().getFullYear()}
      {...props}
    />
  )
}
CalendarUI.displayName = "CalendarUI"

export { CalendarUI }
