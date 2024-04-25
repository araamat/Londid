import { PropsWithChildren } from "react";

export default function TableHeader({ children }: PropsWithChildren<{}>) {
    return <span className="flex-auto font-semibold text-sm text-[#64748B]">
        {children}
    </span>
}