import COOKIE_NAME from "@/constants/cookies";
import Staff from "@/types/entity/Staff";
import { cookies } from "next/headers";
import SideBarUI from "./SideBarUI";
import { UserRole } from "@/types/Role";
import { redirect } from "next/navigation";
import withQuery from "@/utils/withQuery";

export default function SideBar({ staffInfo }: PropTypes) {
    const isCollapse =
        cookies().get(COOKIE_NAME.SIDE_BAR_COLLAPSE)?.value == "true" || false;
    const role = cookies().get(COOKIE_NAME.ROLE)?.value as UserRole;

    if (!role) {
        redirect(withQuery("/signin", {}));
    }

    return (
        <div className=" absolute top-0 left-0 h-screen md:relative md:w-max z-50">
            <SideBarUI role={role} staffInfo={staffInfo} isCollapse={false} />
        </div>
    );
}

type PropTypes = {
    staffInfo?: Staff;
};
