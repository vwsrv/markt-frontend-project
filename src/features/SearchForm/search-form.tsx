"use client";

import React, { useState, useEffect, useRef } from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { Icon } from "../../shared/ui/icon";
import { InputProps } from "./types";
import { Input } from "../../shared/ui/input";
import { CategoryList } from "../../shared/ui/category-list";
import { ButtonMain } from "../../shared/ui/btn-main";
import { BaseProductProps } from "../../types/productTypes";
import { typeCategoryListProps } from "../../shared/ui/category-list/types";
import { CategoryIcon } from "../../shared/ui/category-icon";
import { fetchAllData } from "../../services/api";
import cartLogo from "../../shared/ui/footer/images/cart.svg";
import profileLogo from "../../shared/ui/footer/images/profile.svg";
import favoritesLogo from "../../shared/ui/footer/images/favorites.svg";
import deliveryLogo from "../../shared/ui/footer/images/delivery.svg";

export const SearchForm: React.FC<InputProps> = (props) => {
  const { name, required, onChange, type = "text", placeholder } = props;
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [popularQueries, setPopularQueries] = useState<string[]>([]);
  const [categories, setCategories] = useState<
    typeCategoryListProps["categoryData"]
  >([]);
  const [products, setProducts] = useState<BaseProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<BaseProductProps[]>(
    []
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
          category.link.toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredProducts(
      products.filter((product) =>
        (product.title ?? "").toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleFocus = () => {
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
    console.log(`Перейти на страницу категории: ${category}`);
  };

  const handleWrapperClick = () => {
    setIsOpen(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchWrapperRef.current &&
      !searchWrapperRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRemovePopularQuery = (query: string) => {
    setPopularQueries((prev) => prev.filter((item) => item !== query));
  };
  const handleRemoveSearchResult = (productToRemove: BaseProductProps) => {
    setFilteredProducts((prev) =>
      prev.filter((product) => product.id !== productToRemove.id)
    );
  };

  return (
    <div
      className={classes.searchWrapper}
      ref={searchWrapperRef}
      onClick={handleWrapperClick}
    >
      <Input
        name={name}
        type={type}
        required={required}
        value={searchQuery}
        onChange={handleInputChange}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isOpen && (
        <div className={cn(classes.dropdown)} onClick={handleFocus}>
          {searchQuery === "" ? (
            <>
              <div className={classes.popularQueries}>
                {popularQueries.map((query, index) => (
                  <div key={index} className={cn(classes.searchResult)}>
                    <p className="medium">{query}</p>
                    <ButtonMain
                      variant="remove"
                      type="submit"
                      onClick={() => handleRemovePopularQuery(query)}
                    />
                  </div>
                ))}
              </div>
              <CategoryList
                categoryData={filteredCategories}
                handler={() => handleCategoryClick}
              />
            </>
          ) : (
            <>
              <div className={classes.searchResults}>
                {filteredProducts.length > 0 && (
                  <div className={classes.popularQueries}>
                    {filteredProducts.map((product) => (
                      <div className={classes.searchResult} key={product.id}>
                        <p className="medium">{product.title}</p>
                        <ButtonMain
                          variant="remove"
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
                      handler={() => console.log("Клик по категории")}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
      {isOpen && (
        <div className={classes.footerNavContainer}>
          <nav className={cn(classes.footerNav)}>
            <Icon src={cartLogo} alt="Корзина" />
            <Icon src={deliveryLogo} alt="Доставки" />
            <Icon src={favoritesLogo} alt="Избранное" />
            <Icon src={profileLogo} alt="Личный кабинет" />
          </nav>
        </div>
      )}
    </div>
  );
};
