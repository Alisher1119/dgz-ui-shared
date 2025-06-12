import {
  Breadcrumb,
  type BreadcrumbInterface,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "dgz-ui/breadcrumb";
import { Fragment } from "react";
import { HomeIcon } from "lucide-react";

export interface MyBreadcrumbProps {
  breadcrumbs: BreadcrumbInterface[];
}

export const MyBreadcrumb = ({ breadcrumbs = [] }: MyBreadcrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink to="/">
            <HomeIcon />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {breadcrumbs
          .reduce((arr: BreadcrumbInterface[], item, index) => {
            if (index && item.path) {
              item = {
                ...item,
                path: [arr[index - 1].path, item.path].join("/"),
              };
            }
            arr.push(item);
            return arr;
          }, [])
          .map((item, index) => (
            <Fragment key={index}>
              <BreadcrumbItem>
                {!item.isActive ? (
                  <BreadcrumbLink to={item.path}>{item.name}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.name}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index + 1 !== breadcrumbs.length && <BreadcrumbSeparator />}
            </Fragment>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
