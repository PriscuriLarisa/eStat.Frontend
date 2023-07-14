import { IIconProps, INavLink, INavLinkGroup, Nav, Panel, PanelType } from "@fluentui/react";
import { logoImageClassName, navStyles, panelStyles } from "./navbar.styles";
import { useContext, useEffect, useState } from "react";
import { getNavbar } from "./navbar.utils";
import { IFetchResult } from "../../hooks/useFetch.types";
import { useFetch } from "../../hooks/useFetch";
import { ServiceContext, ServiceContextInstance } from "../../core/serviceContext";
import $ from 'jquery';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AuthentificationContextModel } from "../../authentication/authenticationContext.types";
import AuthentificationContext from "../../authentication/authenticationContext";
import { NotificationCard } from "../notificationCard/notificationCard";

const _onLinkClick = (ev?: React.MouseEvent<HTMLElement>, item?: INavLink): void => {
    alert(item?.name);
}

export const Navbar = (): JSX.Element => {
    const authenticationContext: AuthentificationContextModel = useContext(AuthentificationContext);
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const [navLinkGroups, setNavLinkGroups] = useState<INavLinkGroup[]>([]);
    const [expanded, setExpanded] = useState<boolean>(false);
    const productCategoriesData: IFetchResult<string[]> = useFetch<string[]>(() => services.ProductsService.GetProductCategories(), []);
    const [productCategories, setProductCategories] = useState<string[]>([]);
    const [displayNotificationPanel, setDisplayNotificationPanel] = useState<boolean>(false);
    const [bubbleAdded, setBubbleAdded] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate();

    const onCategoryClicked = (category: string): void => {
        navigate(`${"/manageProducts"}/${category}`);
    };

    const onSearchClicked = (): void => {
        navigate(`/searchProducts`);
    };

    const onMyCartClicked = (): void => {
        navigate('/manageShoppingCart');
    }

    const onMyStockClicked = (): void => {
        navigate('/myStock');
    }

    const onMembershipsClicked = (): void => {
        navigate('/manageMemberships');
    }

    const onProfileClicked = (): void => {
        navigate(`/manageProfile`);
    };

    const onLogoutClicked = (): void => {
        services.AuthenticationService.Logout().then(u => {
            navigate(`/login`);
            window.location.reload();
        });
    };

    const onNotificationClicked = (): void => {
        setDisplayNotificationPanel(true);
        authenticationContext.ReadAllNotifications();
        services.NotificationService.ReadAllNotifications(authenticationContext.User.userGUID);
    };

    useEffect(() => {
        $('nav').on({
            mouseleave: function () {
                $('div.ms-Nav-compositeLink').each((i, el) => {
                    let lists = $(el).parent().find('ul');
                    let buttons = $(el).find('button');
                    if (lists.length !== 0 && buttons.length !== 1) {
                        buttons[1].click();
                    }
                });
            }
        });


    }, []);

    useEffect(() => {
        var newDiv = "<div id='notification_bubble' style='height: 9px; width: 9px; background-color: #cc1414; position: absolute; border-radius: 50%; top: 9px; left: 38px'></div>";
        if (authenticationContext.Notifications.some(n => n.read === false)) {
            if ($("i[data-icon-name='Ringer']").parent().length === 0)
                return;
            if (!bubbleAdded) {
                setBubbleAdded(true);
                $("i[data-icon-name='Ringer']").parent().prepend(newDiv);
            }
            return;
        }

        $("div[id='notification_bubble']").remove();
        setBubbleAdded(false);

    }, [$("i[data-icon-name='Ringer']").parent(), authenticationContext.Notifications])


    const dismissPanel = (): void => {
        setDisplayNotificationPanel(false);
    };


    useEffect(() => {

        setNavLinkGroups(getNavbar(expanded, productCategories,
            onCategoryClicked,
            onSearchClicked,
            onMyCartClicked,
            onMyStockClicked,
            onMembershipsClicked,
            onProfileClicked,
            onLogoutClicked,
            onNotificationClicked,
            authenticationContext));
    }, [productCategories, expanded]);

    useEffect(() => {
        if (productCategoriesData.isLoading) {
            return;
        }
        if (productCategoriesData.errors !== '' ||
            productCategoriesData.data === null ||
            productCategoriesData.data?.Error !== undefined ||
            productCategoriesData.data?.Data === undefined) {
            return;
        }
        setProductCategories(productCategoriesData.data.Data);
    }, [productCategoriesData]);

    const notifications: JSX.Element[] = authenticationContext.Notifications
        .sort(function (a, b) {
            return (new Date(b.date).getTime() - new Date(a.date).getTime());
        })
        .map(
            n => {
                return <NotificationCard notification={n} closePanel={dismissPanel} />
            }
        )

return (
    <>
        <Nav
            onLinkClick={_onLinkClick}
            selectedKey="none"
            styles={navStyles}
            groups={navLinkGroups}
        />
        <Panel
            styles={panelStyles}
            headerText="Notifications"
            isOpen={displayNotificationPanel}
            onDismiss={dismissPanel}
            closeButtonAriaLabel="Close"
            type={PanelType.custom}
            customWidth="650px"
        >
            {notifications}
        </Panel>
    </>
)
};