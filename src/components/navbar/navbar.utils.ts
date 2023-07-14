import { IIconProps, INavLink, INavLinkGroup } from "@fluentui/react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AuthentificationContextModel } from "../../authentication/authenticationContext.types";
import { Roles } from "../../enums/roles";

const dashboardIconProps: IIconProps = { iconName: "Chart" };
const categoriesIconProps: IIconProps = { iconName: "GridViewMedium" };
const profileIconProps: IIconProps = { iconName: "UserOptional", };
const searchIconProps: IIconProps = { iconName: "Search" };
const medalIconProps: IIconProps = { iconName: "Medal" };
const notifIconProps: IIconProps = { iconName: "Ringer" };
const recommendationsIconProps: IIconProps = { iconName: "Lightbulb" };
const cartIconProps: IIconProps = { iconName: "ShoppingCart" };
const stockIconProps: IIconProps = { iconName: "Package" };
const logoutIconProps: IIconProps = { iconName: "SignOut" };

const processCategories = (categories: string[], onClick: (category: string) => void): INavLink[] | undefined => {

  return categories.map((c) => {
    return {
      name: c,
      url: '',
      onClick: (() => { onClick(c) }),
      key: c
    }
  });
}

export const getNavbar = (expanded: boolean, categories: string[], onCategoryClicked: (category: string) => void,
  onSearchClicked: () => void,
  onMyCartClicked: () => void,
  onMyStockClicked: () => void,
  onMembershipsClicked: () => void,
  onProfileClicked: () => void,
  onLogoutClicked: () => void,
  onNotificationClicked: () => void,
  authenticationContent: AuthentificationContextModel): INavLinkGroup[] => {
  const retailerSidebar: INavLinkGroup[] = [
    {
      name: 'Shop',
      links: [
        {
          name: 'Categories',
          url: '',
          isExpanded: expanded,
          onClick: (() => { }),
          iconProps: categoriesIconProps,
          links: processCategories(categories, onCategoryClicked)
        },
        {
          name: 'Search',
          url: '',
          isExpanded: false,
          onClick: (() => { onSearchClicked() }),
          iconProps: searchIconProps,
        },
      ]
    },
    {
      name: 'Retail',
      links: [
        {
          name: 'My Stock',
          isExpanded: false,
          onClick: (() => { onMyStockClicked() }),
          iconProps: stockIconProps,
          url: ''
        },
      ]
    },
    {
      name: 'Personal',
      links: [
        {
          name: 'Profile',
          isExpanded: false,
          onClick: (() => { onProfileClicked() }),
          iconProps: profileIconProps,
          url: ''
        },
        {
          name: 'Memberships',
          isExpanded: false,
          onClick: (() => { onMembershipsClicked() }),
          iconProps: medalIconProps,
          url: ''
        },
        {
          name: 'Notifications',
          isExpanded: false,
          onClick: (() => { onNotificationClicked() }),
          iconProps: notifIconProps,
          url: ''
        },
        {
          name: 'Logout',
          isExpanded: false,
          onClick: (() => { onLogoutClicked() }),
          iconProps: logoutIconProps,
          url: ''
        },
      ]
    }
  ];

  const customerSidebar: INavLinkGroup[] = [
    {
      name: 'Shop',
      links: [
        {
          name: 'Categories',
          url: '',
          isExpanded: expanded,
          onClick: (() => { }),
          iconProps: categoriesIconProps,
          links: processCategories(categories, onCategoryClicked)
        },
        {
          name: 'Search',
          url: '',
          isExpanded: false,
          onClick: (() => { onSearchClicked() }),
          iconProps: searchIconProps,
        },
        {
          name: 'My Cart',
          isExpanded: false,
          onClick: (() => { onMyCartClicked() }),
          iconProps: cartIconProps,
          url: ''
        },
      ]
    },
    {
      name: 'Personal',
      links: [
        {
          name: 'Profile',
          isExpanded: false,
          onClick: (() => { onProfileClicked() }),
          iconProps: profileIconProps,
          url: ''
        },
        {
          name: 'Memberships',
          isExpanded: false,
          onClick: (() => { onMembershipsClicked() }),
          iconProps: medalIconProps,
          url: ''
        },
        {
          name: 'Notifications',
          isExpanded: false,
          onClick: (() => { onNotificationClicked() }),
          iconProps: notifIconProps,
          url: ''
        },
        {
          name: 'Logout',
          isExpanded: false,
          onClick: (() => { onLogoutClicked() }),
          iconProps: logoutIconProps,
          url: ''
        },
      ]
    }
  ];

  return authenticationContent.User.role === Roles.Retailer ? retailerSidebar : customerSidebar;
}