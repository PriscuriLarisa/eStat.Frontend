import { IIconProps, INavLinkGroup } from "@fluentui/react";
const dashboardIconProps: IIconProps = { iconName: "Chart" };
const categoriesIconProps: IIconProps = { iconName: "GridViewMedium" };
const profileIconProps: IIconProps = { iconName: "UserOptional", };
const searchIconProps: IIconProps = { iconName: "Search" };
const medalIconProps: IIconProps = { iconName: "Medal" };
const notifIconProps: IIconProps = { iconName: "Ringer" };
const recommendationsIconProps: IIconProps = { iconName: "Lightbulb" };

export const navbarButtons: INavLinkGroup[] = [
    {
      name: 'Shop',
      links: [
        {
          name: 'Categories',
          url: '',
          isExpanded: false,
          onClick: (() => { }),
          iconProps: categoriesIconProps,
        },
        {
          name: 'Search',
          url: '',
          isExpanded: false,
          onClick: (() => { }),
          iconProps: searchIconProps,
        }
      ]
    },
    {
      name: 'Personal',
      links: [
        {
          name: 'Profile',
          isExpanded: false,
          onClick: (() => { }),
          iconProps: profileIconProps,
          url: ''
        },
        {
          name: 'Memberships',
          isExpanded: false,
          onClick: (() => { }),
          iconProps: medalIconProps,
          url: ''
        },
        {
          name: 'Notifications',
          isExpanded: false,
          onClick: (() => { }),
          iconProps: notifIconProps,
          url: ''
        },
      ]
    },
    {
      name: 'Dashboards',
      links: [
        {
          name: 'Charts',
          isExpanded: false,
          onClick: (() => { }),
          iconProps: dashboardIconProps,
          url: ''
        },
        {
          name: 'Ideas',
          isExpanded: false,
          onClick: (() => { }),
          iconProps: recommendationsIconProps,
          url: ''
        },
      ]
    }
  ]