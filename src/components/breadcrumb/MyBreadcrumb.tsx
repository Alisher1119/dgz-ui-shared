import {
  Breadcrumb,
  type BreadcrumbInterface,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "dgz-ui/breadcrumb";
import { Fragment } from "react";
import { HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "dgz-ui";

export interface MyBreadcrumbProps {
  breadcrumbs: BreadcrumbInterface[];
}

export const MyBreadcrumb = ({ breadcrumbs = [] }: MyBreadcrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link
            className={cn(
              "transition-colors text-body-md-regular text-secondary hover:text-primary",
            )}
            to={"/"}
          >
            <HomeIcon className={"size-4"} />
          </Link>
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
                  <Link
                    className={cn(
                      "transition-colors text-body-md-regular text-secondary hover:text-primary",
                    )}
                    to={item.path}
                  >
                    {item.name}
                  </Link>
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
