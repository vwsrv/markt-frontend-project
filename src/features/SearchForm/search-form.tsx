"use client";

import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "../../shared/lib/useMediaQuery.ts";
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
import { useNavigate } from "react-router-dom";

export const SearchForm: React.FC<InputProps> = (props) => {
  const { name, required, onChange, type = "text", placeholder } = props;
  const isMobile = useMediaQuery("(max-width: 720px)");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [historyQueries, setHistoryQueries] = useState<string[]>([]);
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
  const searchFormRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const popularQueries = [
      "маска гая фокса",
      "маска какаши хатаке",
      "массажер мурашка",
      "машина времени",
      "усы марио",
    ];

    const localQueries = JSON.parse(
      localStorage.getItem("searchHistory") || "[]",
    );
    const combinedQueries = [
      ...localQueries,
      ...popularQueries.filter((query) => !localQueries.includes(query)),
    ].slice(0, 5);

    setHistoryQueries(combinedQueries);

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
        console.error(err);
      }
    };

    loadData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onChange?.(e);

    if (query.trim() === "") {
      setFilteredCategories(categories);
      setFilteredProducts(products);
    } else {
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
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      if (!searchFormRef.current?.contains(e.relatedTarget as Node)) {
        setIsOpen(false);
      }
    }, 200);
  };

  const handleCategoryClick = (category: string) => {
    updateSearchHistory(category);
    setIsOpen(false);
    navigate(`/category/${category}`);
  };

  const handleProductClick = (product: BaseProductProps) => {
    updateSearchHistory(product.title as string);
    setIsOpen(false);
    navigate(`/product/${product.id}`);
  };

  const updateSearchHistory = (query: string) => {
    const updatedHistory = [
      query,
      ...historyQueries.filter((q) => q !== query),
    ].slice(0, 10);
    setHistoryQueries(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const handleRemoveHistoryQuery = (query: string) => {
    const updatedHistory = historyQueries.filter((q) => q !== query);
    setHistoryQueries(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchFormRef.current &&
      !searchFormRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  useEffect(() => {}, [isOpen]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form
      className={cn(classes.searchWrapper)}
      ref={searchFormRef}
      onSubmit={(e) => {
        e.preventDefault();
        updateSearchHistory(searchQuery);
        setIsOpen(false);
        navigate(`/search?query=${searchQuery}`);
      }}
    >
      {isMobile && !isOpen ? (
        <ButtonMain
          variant="search"
          type="button"
          onClick={() => setIsOpen(true)}
        />
      ) : (
        <Input
          ref={inputRef}
          name={name}
          type={type}
          required={required}
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={placeholder}
          onFocus={handleInputFocus}
          onBlur={handleBlur}
        />
      )}

      <div className={isOpen ? cn(classes.dropdownOpened) : classes.dropdown}>
        {searchQuery === "" ? (
          <div className={cn(classes.dropdownContainer)}>
            <div className={classes.popularQueries}>
              {historyQueries.map((query, index) => (
                <div key={index} className={cn(classes.searchResult)}>
                  <p
                    className="medium"
                    onClick={() => handleCategoryClick(query)}
                  >
                    {query}
                  </p>
                  <ButtonMain
                    variant="remove"
                    type="button"
                    onClick={() => handleRemoveHistoryQuery(query)}
                  />
                </div>
              ))}
            </div>
            <div className={classes.categories}>
              {categories.map((category, index) => (
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
          <div className={cn(classes.dropdownContainer)}>
            <div className={classes.popularQueries}>
              <div className={classes.searchResults}>
                {filteredProducts.map((product) => (
                  <div
                    className={classes.searchResult}
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                  >
                    <p className="medium">{product.title}</p>
                    <ButtonMain
                      variant="remove"
                      type="button"
                      onClick={() =>
                        setFilteredProducts((prev) =>
                          prev.filter((p) => p.id !== product.id),
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            {filteredCategories.length > 0 && (
              <div className={classes.categories}>
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
          </div>
        )}
        {isMobile && isOpen && (
          <div className={classes.searchFromNavContainer}>
            <Navigation type="searchForm" />
          </div>
        )}
      </div>
    </form>
  );
};
