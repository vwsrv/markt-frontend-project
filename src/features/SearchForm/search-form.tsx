"use client";

import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "../../shared/lib/useMediaQuery.js";
import classes from "./styles.module.scss";
import cn from "classnames";
import { InputProps } from "./types";
import { Input } from "../../shared/ui/input";
import { ButtonMain } from "../../shared/ui/btn-main";
import { BaseProductProps } from "../../types/productTypes";
import { typeCategoryListProps } from "../../shared/ui/category-list/types";
import { CategoryIcon } from "../../shared/ui/category-icon";
import { fetchAllData } from "../../services/api";
import { Navigation } from "../../shared/ui/navigation/navigation.js";

export const SearchForm: React.FC<InputProps> = (props) => {
  const { name, required, onChange, type = "text", placeholder } = props;
  const isMobile = useMediaQuery("(max-width: 720px)");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [popularQueries, setPopularQueries] = useState<string[]>([]);
  const [categories, setCategories] = useState<
    typeCategoryListProps["categoryData"]
  >([]);
  const [products, setProducts] = useState<BaseProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<BaseProductProps[]>(
    [],
  );
  const [filteredCategories, setFilteredCategories] = useState<
    typeCategoryListProps["categoryData"]
  >([]);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const noProductResults: boolean = filteredProducts.length === 0;

  useEffect(() => {
    setPopularQueries([
      "маска гая фокса",
      "циркониевый браслет",
      "нефритовый стержень",
      "шарф лололошки",
      "нож кредитка",
    ]);

    const loadData = async () => {
      try {
        const data = await fetchAllData();
        setCategories(data.categories);
        setFilteredCategories(data.categories);
        const combinedProducts = [
          ...data.images,
          ...data.homeImages,
          ...data.sleepImages,
          ...data.goodsImages,
        ];
        setProducts(combinedProducts);
        setFilteredProducts(combinedProducts);
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
      }
    };

    loadData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onChange?.(e);
    setFilteredCategories(
      categories.filter(
        (category) =>
          category.name.toLowerCase().includes(query.toLowerCase()) ||
          category.link.toLowerCase().includes(query.toLowerCase()),
      ),
    );
    setFilteredProducts(
      products.filter((product) =>
        (product.title ?? "").toLowerCase().includes(query.toLowerCase()),
      ),
    );
  };

  const openSearchForm = () => {
    setIsOpen(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      if (!searchWrapperRef.current?.contains(e.relatedTarget as Node)) {
        return setIsOpen(false);
      }
    }, 200);
  };

  const handleCategoryClick = (category: string) => {
    setSearchQuery(category);
    setIsOpen(false);
  };

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (
  //     searchWrapperRef.current &&
  //     !searchWrapperRef.current.contains(event.target as Node)
  //   ) {
  //     setIsOpen(false);
  //   }
  // };

  const handleRemovePopularQuery = (query: string) => {
    setPopularQueries((prev) => prev.filter((item) => item !== query));
  };
  const handleRemoveSearchResult = (productToRemove: BaseProductProps) => {
    setFilteredProducts((prev) =>
      prev.filter((product) => product.id !== productToRemove.id),
    );
  };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <form
      className={cn(classes.searchWrapper)}
      onClick={openSearchForm}
      onSubmit={(e) => {
        e.preventDefault();
        setIsOpen(false);
      }}
    >
      {isMobile && !isOpen ? (
        <ButtonMain variant="search" type="button" onClick={openSearchForm} />
      ) : (
        <Input
          name={name}
          type={type}
          required={required}
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={placeholder}
          onFocus={openSearchForm}
          onBlur={handleBlur}
        />
      )}
      <div
        className={isOpen ? cn(classes.dropdownOpened) : classes.dropdown}
        // ref={searchWrapperRef}
      >
        {searchQuery === "" ? (
          <div className={cn(classes.dropdownContainer)}>
            <div className={classes.popularQueries}>
              {popularQueries.map((query, index) => (
                <div key={index} className={cn(classes.searchResult)}>
                  <p className="medium">{query}</p>
                  <ButtonMain
                    variant="remove"
                    type="button"
                    onClick={() => handleRemovePopularQuery(query)}
                  />
                </div>
              ))}
            </div>
            <div
              className={
                noProductResults
                  ? classes.searchCategories
                  : classes.searchCategoriesOnly
              }
            >
              {filteredCategories.map((category, index) => (
                <CategoryIcon
                  key={index}
                  link={category.link}
                  name={category.name}
                  handler={() => handleCategoryClick(category.name)}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className={classes.searchResults}>
              {filteredProducts.length > 0 && (
                <div className={classes.popularQueries}>
                  {filteredProducts.map((product) => (
                    <div
                      className={classes.searchResult}
                      key={product.id}
                      onClick={() => console.log(222)}
                    >
                      <p className="medium">{product.title}</p>
                      <ButtonMain
                        variant="remove"
                        type="button"
                        onClick={() => handleRemoveSearchResult(product)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            {filteredCategories.length > 0 && (
              <div
                className={
                  noProductResults
                    ? classes.searchCategories
                    : classes.searchCategoriesOnly
                }
              >
                {filteredCategories.map((category, index) => (
                  <CategoryIcon
                    key={index}
                    link={category.link}
                    name={category.name}
                    handler={() => handleCategoryClick(category.name)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      {isOpen && isMobile && (
        <div className={classes.searchFromNavContainer}>
          <Navigation type="searchForm" />
        </div>
      )}
    </form>
  );
};
