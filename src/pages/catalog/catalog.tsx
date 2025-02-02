"use client";

import React from "react";
import cn from "classnames";
import classes from "./styles.module.scss";
import { CategoryHeader } from "../../shared/ui/category-header";
import { CardList } from "../../shared/ui/card-list";
import { BaseProductProps } from "../../types/productTypes";
import { fetchCategoryImages } from "../../services/api";
import { DropdownMenu } from "../../shared/ui/dropdown-menu/dropdownMenu";
import { Color } from "../../types/productTypes";
import { ProductFilter } from "../../shared/ui/filter/filter";
import { useSearchParams } from "react-router-dom";
import { ButtonMain } from "../../shared/ui/btn-main";
import { PopupFormFilter } from "../../features/PopupFormFilter/PopupFormFilter";
import { useMediaQuery } from "../../shared/lib/useMediaQuery";

export const Catalog: React.FC = () => {
  const [dataList, setDataList] = React.useState<BaseProductProps[]>([]);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    [],
  );
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = React.useState<string[]>([]);
  const [selectedColors, setSelectedColors] = React.useState<string[]>([]);
  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 930px)");

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const categoryImagesData = await fetchCategoryImages();
        setDataList(categoryImagesData);
      } catch (err) {
        console.log(err);
      }
    };
    loadData();
  }, []);

  const categoryList = React.useMemo(
    () => Array.from(new Set(dataList.map((item) => item.category))),
    [dataList],
  );

  const brandList = React.useMemo(
    () =>
      Array.from(
        new Set(dataList.map((item) => item.brand || "").filter(Boolean)),
      ),
    [dataList],
  );

  const styleList = React.useMemo(
    () =>
      Array.from(
        new Set(dataList.map((item) => item.style || "").filter(Boolean)),
      ),
    [dataList],
  );

  const colorList = React.useMemo(
    () =>
      Array.from(
        new Set(
          dataList
            .filter((item) => item.colors)
            .flatMap((item) => (item.colors as Color[]).map((color) => color)),
        ),
      ),
    [dataList],
  );

  const categoryListWithLabels = categoryList
    .filter((category): category is string => !!category)
    .map((category) => ({
      label: category,
    }));

  const brandListWithLabels = brandList
    .filter((brand): brand is string => !!brand)
    .map((brand) => ({
      label: brand,
    }));

  const styleListWithLabels = styleList
    .filter((style): style is string => !!style)
    .map((style) => ({
      label: style,
    }));

  const colorListWithLabels = colorList
    .filter((color): color is Color => !!color.label)
    .map((color) => ({
      label: color.label,
      color: color.color || "",
      icon: color.icon || "",
    }));

  const getPriceRange = (products: BaseProductProps[]) => {
    if (products.length === 0) return { min: 0, max: 0 };

    const prices = products.map((product) => product.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return { min: minPrice, max: maxPrice };
  };

  const priceRange = getPriceRange(dataList);
  const priceListWithLabels = [
    { label: `от ${priceRange.min}`, value: priceRange.min.toString() },
    { label: `до ${priceRange.max}`, value: priceRange.max.toString() },
  ];

  const handleSetValue = (
    type: string,
    values: string[] | [string, string],
  ) => {
    switch (type) {
      case "category":
        setSelectedCategories(values as string[]);
        break;
      case "brand":
        setSelectedBrands(values as string[]);
        break;
      case "style":
        setSelectedStyles(values as string[]);
        break;
      case "color":
        setSelectedColors(values as string[]);
        break;
      case "price": {
        const [minPrice, maxPrice] = values as [string, string];
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
        break;
      }
      default:
        break;
    }
  };

  const filteredProducts = React.useMemo(() => {
    const filterByPrice = (items: BaseProductProps[]) => {
      return items.filter((item) => {
        const price = item.price;
        return (
          (!minPrice || price >= parseFloat(minPrice)) &&
          (!maxPrice || price <= parseFloat(maxPrice))
        );
      });
    };

    let filtered = dataList;

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        (item.category ?? "").toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCategories.includes(item.category || ""),
      );
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((item) =>
        selectedBrands.includes(item.brand || ""),
      );
    }

    if (selectedStyles.length > 0) {
      filtered = filtered.filter((item) =>
        selectedStyles.includes(item.style || ""),
      );
    }

    if (selectedColors.length > 0) {
      filtered = filtered.filter(
        (item) =>
          item.colors &&
          item.colors.some((color) => selectedColors.includes(color.label)),
      );
    }

    filtered = filterByPrice(filtered);

    return filtered;
  }, [
    dataList,
    searchQuery,
    selectedCategories,
    selectedBrands,
    selectedStyles,
    selectedColors,
    minPrice,
    maxPrice,
  ]);

  const handleSortByPopularity = () => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      const popularityA = parseFloat(a.popularity);
      const popularityB = parseFloat(b.popularity);
      return popularityB - popularityA;
    });
    setDataList(sortedProducts);
  };

  const handleSortByRating = () => {
    const sortedProducts = [...filteredProducts].sort(
      (a, b) => b.rating - a.rating,
    );
    setDataList(sortedProducts);
  };

  const handleSortByPriceLowToHigh = () => {
    const sortedProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price,
    );
    setDataList(sortedProducts);
  };

  const handleSortByPriceHighToLow = () => {
    const sortedProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price,
    );
    setDataList(sortedProducts);
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className={cn(classes.catalog)}>
      <CategoryHeader
        title={searchQuery ? searchQuery : "Каталог товаров"}
        productQuantity={filteredProducts.length}
      >
        <div className={cn(classes.catalogFilters)}>
          {isMobile && (
            <>
              <ButtonMain
                variant="filterIcon"
                aria-label="Фильтровать"
                onClick={handleOpenPopup}
              />

              <ProductFilter
                onSortByPopularity={handleSortByPopularity}
                onSortByRating={handleSortByRating}
                onSortByPriceLowToHigh={handleSortByPriceLowToHigh}
                onSortByPriceHighToLow={handleSortByPriceHighToLow}
              />
            </>
          )}
          {!isMobile ? (
            <div className={classes.dropDownPanel}>
              <DropdownMenu
                dataList={categoryListWithLabels}
                setValue={(values) => handleSetValue("category", values)}
                title="Категории"
                variant="default"
              />
              <DropdownMenu
                dataList={priceListWithLabels}
                setValue={(values) => handleSetValue("price", values)}
                title="Цена"
                variant="price"
              />
              <DropdownMenu
                dataList={brandListWithLabels}
                setValue={(values) => handleSetValue("brand", values)}
                title="Бренд"
                variant="default"
              />
              <DropdownMenu
                dataList={styleListWithLabels}
                setValue={(values) => handleSetValue("style", values)}
                title="Стиль"
                variant="default"
              />
              <DropdownMenu
                dataList={colorListWithLabels}
                setValue={(values) => handleSetValue("color", values)}
                title="Цвет"
                variant="colors"
              />
            </div>
          ) : null}
          {!isMobile ? (
            <div className={classes.filtersPanel}>
              <ProductFilter
                onSortByPopularity={handleSortByPopularity}
                onSortByRating={handleSortByRating}
                onSortByPriceLowToHigh={handleSortByPriceLowToHigh}
                onSortByPriceHighToLow={handleSortByPriceHighToLow}
              />
            </div>
          ) : null}
        </div>
      </CategoryHeader>
      {filteredProducts.length > 0 ? (
        <CardList style="category" goodsData={filteredProducts} type="small" />
      ) : (
        <p className={cn(classes.notFoundMessage, "medium")}>
          {searchQuery
            ? "Таких товаров у нас нет :^("
            : "Кажется, вы перестарались с фильтрами. Такого еще не завозили."}
        </p>
      )}
      {isPopupOpen && (
        <PopupFormFilter
          onClose={handleClosePopup}
          filters={{
            category: categoryListWithLabels,
            brand: brandListWithLabels,
            style: styleListWithLabels,
            color: colorListWithLabels,
            price: priceListWithLabels,
          }}
          onFilterChange={handleSetValue}
        />
      )}
    </div>
  );
};
