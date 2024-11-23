/* eslint-disable @typescript-eslint/no-explicit-any */
import { SvgIconProps } from '@mui/material';
import CategoriesIcon from 'components/icons/menu-icons/CategoriesIcon';
import CustomersIcon from 'components/icons/menu-icons/CustomersIcon';
import HomeIcon from 'components/icons/menu-icons/HomeIcon';
import OrderIcon from 'components/icons/menu-icons/OrderIcon';
import ProductsIcon from 'components/icons/menu-icons/ProductsIcon';
import i18next from 'i18next';

import { uniqueId } from 'lodash';

import paths from 'routes/path';

export interface IMenuitems {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: (props: SvgIconProps) => JSX.Element;
  href?: string;
  children?: IMenuitems[];
  chip?: string;
  chipColor?: string | any;
  variant?: string | any;
  available?: boolean;
  level?: number;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

const generateMenuItems = (): IMenuitems[] => [
  {
    id: uniqueId(),
    title: i18next.t("dashboard"),
    icon: HomeIcon,
    href: '/',
    available: true,
  },
  {
    id: uniqueId(),
    title: i18next.t("packages"),
    icon: OrderIcon,
    href: paths.packages,
    chipColor: 'secondary',
    available: false,
  },
  {
    id: uniqueId(),
    title: i18next.t("courses"),
    icon: ProductsIcon,
    href: paths.courses,
    available: false,
  },
  {
    id: uniqueId(),
    title: i18next.t("categories"),
    icon: CategoriesIcon,
    href: paths.categories,
    available: false,
  },
  {
    id: uniqueId(),
    title: i18next.t("customers"),
    icon: CustomersIcon,
    href: '#!',
    available: false,
  },
  
];

export default generateMenuItems;
