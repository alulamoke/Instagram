import { MenuSetting } from "@/components/account/MenuSetting";
import { SettingList } from "@/components/account/SettingList";
import { Outlet } from "react-router-dom";

export const AccountLayout = () => {
  return (
    <main className="grid grid-cols-4 gap-2">
      <div className="col-span-1">
        <MenuSetting />
        <SettingList className="hidden flex-col gap-4 border-r lg:flex" />
      </div>
      <section className="col-span-4 h-screen lg:col-span-3">
        <Outlet />
      </section>
    </main>
  );
};
