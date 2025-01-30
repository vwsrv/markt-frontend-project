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
import { Popup } from "../../shared/ui/popup";

export const Catalog: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [categoryImages, setCategoryImages] = React.useState<
    BaseProductProps[]
  >([]);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    [],
  );
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = React.useState<string[]>([]);
  const [selectedColors, setSelectedColors] = React.useState<string[]>([]);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const categoryImagesData = await fetchCategoryImages();
        setCategoryImages(categoryImagesData);
      } catch (err) {
        console.log(err);
      }
    };
    loadData();
  }, []);

  const categoryList = React.useMemo(
    () => Array.from(new Set(categoryImages.map((item) => item.category))),
    [categoryImages],
  );

  const brandList = React.useMemo(
    () =>
      Array.from(
        new Set(categoryImages.map((item) => item.brand || "").filter(Boolean)),
      ),
    [categoryImages],
  );

  const styleList = React.useMemo(
    () =>
      Array.from(
        new Set(categoryImages.map((item) => item.style || "").filter(Boolean)),
      ),
    [categoryImages],
  );

  const colorList = React.useMemo(
    () =>
      Array.from(
        new Set(
          categoryImages
            .filter((item) => item.colors)
            .flatMap((item) => (item.colors as Color[]).map((color) => color)),
        ),
      ),
    [categoryImages],
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

  const handleSetValue = (type: string, values: string[]) => {
    switch (type) {
      case "category":
        setSelectedCategories(values);
        break;
      case "brand":
        setSelectedBrands(values);
        break;
      case "style":
        setSelectedStyles(values);
        break;
      case "color":
        setSelectedColors(values);
        break;
      default:
        break;
    }
  };

  const filteredProducts = React.useMemo(() => {
    let filtered = categoryImages;

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

    return filtered;
  }, [
    categoryImages,
    searchQuery,
    selectedCategories,
    selectedBrands,
    selectedStyles,
    selectedColors,
  ]);

  const handleSortByPopularity = () => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      const popularityA = parseFloat(a.popularity);
      const popularityB = parseFloat(b.popularity);
      return popularityB - popularityA;
    });
    setCategoryImages(sortedProducts);
  };

  const handleSortByRating = () => {
    const sortedProducts = [...filteredProducts].sort(
      (a, b) => b.rating - a.rating,
    );
    setCategoryImages(sortedProducts);
  };

  const handleSortByPriceLowToHigh = () => {
    const sortedProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price,
    );
    setCategoryImages(sortedProducts);
  };

  const handleSortByPriceHighToLow = () => {
    const sortedProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price,
    );
    setCategoryImages(sortedProducts);
  };

  return filteredProducts.length > 0 ? (
    <div className={cn(classes.catalog)}>
      <CategoryHeader
        title={searchQuery ? searchQuery : "Каталог товаров"}
        productQuantity={filteredProducts.length}
      >
        <div className={cn(classes.catalogFilters)}>
          <div className={classes.dropDownPanel}>
            <DropdownMenu
              dataList={categoryListWithLabels}
              setValue={(values) => handleSetValue("category", values)}
              title="Категории"
              variant="default"
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
              variant="default"
            />
          </div>
          <div className={classes.filtersPanel}>
            <ProductFilter
              onSortByPopularity={handleSortByPopularity}
              onSortByRating={handleSortByRating}
              onSortByPriceLowToHigh={handleSortByPriceLowToHigh}
              onSortByPriceHighToLow={handleSortByPriceHighToLow}
            />
          </div>
        </div>
      </CategoryHeader>
      <CardList style="category" goodsData={filteredProducts} type="small" />
    </div>
  ) : (
    <CategoryHeader
      title={searchQuery ? searchQuery : "Каталог товаров"}
      productQuantity={filteredProducts.length}
    >
      <p className={cn(classes.notFoundMessage, "medium")}>
        {`Таких товаров у нас нет :^(`}
      </p>

      <Popup>
        <DropdownMenu
          dataList={categoryListWithLabels}
          setValue={(values) => handleSetValue("category", values)}
          title="Категории"
          variant="popup"
        />
        <DropdownMenu
          dataList={brandListWithLabels}
          setValue={(values) => handleSetValue("brand", values)}
          title="Бренд"
          variant="popup"
        />
        <DropdownMenu
          dataList={styleListWithLabels}
          setValue={(values) => handleSetValue("style", values)}
          title="Стиль"
          variant="popup"
        />
        <DropdownMenu
          dataList={colorListWithLabels}
          setValue={(values) => handleSetValue("color", values)}
          title="Цвет"
          variant="popupColor"
        />
      </Popup>
    </CategoryHeader>
  );
};
