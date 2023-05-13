import { IIconProps, INavLink, INavLinkGroup, Nav } from "@fluentui/react";
import { logoImageClassName, navStyles } from "./navbar.styles";
import { useContext, useEffect, useState } from "react";
import { getNavbar } from "./navbar.utils";
import { IFetchResult } from "../../hooks/useFetch.types";
import { useFetch } from "../../hooks/useFetch";
import { ServiceContext, ServiceContextInstance } from "../../core/serviceContext";
import $ from 'jquery';
import { NavigateFunction, useNavigate } from "react-router-dom";

const iconProps: IIconProps = { iconName: "ChevronRight" };
const _onLinkClick = (ev?: React.MouseEvent<HTMLElement>, item?: INavLink): void => {
    alert(item?.name);
}

export const Navbar = (): JSX.Element => {
    const services: ServiceContext = useContext<ServiceContext>(ServiceContextInstance);
    const [navLinkGroups, setNavLinkGroups] = useState<INavLinkGroup[]>([]);
    const [expanded, setExpanded] = useState<boolean>(false);
    const productCategoriesData: IFetchResult<string[]> = useFetch<string[]>(() => services.ProductsService.GetProductCategories(), []);
    const [productCategories, setProductCategories] = useState<string[]>([]);
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

    }, [])

    useEffect(() => {

        setNavLinkGroups(getNavbar(expanded, productCategories, onCategoryClicked, onSearchClicked, onMyCartClicked, onMyStockClicked, onMembershipsClicked, onProfileClicked));
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

    return (
        <>
            <Nav
                onLinkClick={_onLinkClick}
                selectedKey="none"
                styles={navStyles}
                groups={navLinkGroups}
            />
        </>
    )
};