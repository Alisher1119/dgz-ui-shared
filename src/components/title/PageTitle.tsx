import { MyBreadcrumb, type MyBreadcrumbProps } from "../breadcrumb";
import type { ReactNode } from "react";

export type PageTitleProps = MyBreadcrumbProps & {
  children: ReactNode;
};

export const PageTitle = ({ children, breadcrumbs = [] }: PageTitleProps) => {
  return (
    <>
      <h2 className={"text-xl"}>{children}</h2>
      <MyBreadcrumb breadcrumbs={breadcrumbs} />
    </>
  );
};
