"use client";

import React, { useState, useEffect, useRef } from "react";
import classes from "./styles.module.scss";
import cn from "classnames";
import { InputProps } from "./types";
import { Input } from "../../shared/ui/input";
import { CategoryList } from "../../shared/ui/category-list";
import { ButtonMain } from "../../shared/ui/btn-main";
import { BaseProductProps } from "../../types/productTypes";
import { typeCategoryListProps } from "../../shared/ui/category-list/types";
import { CategoryIcon } from "../../shared/ui/category-icon";
import { fetchAllData } from "../../services/api";

export const SearchForm: React.FC<InputProps> = (props) => {
  const { name, required, onChange, type = "text", placeholder } = props;

  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [popularQueries, setPopularQueries] = useState<string[]>([]);
  const [categories, setCategories] = useState<
    typeCategoryListProps["categoryData"]
  >([]);
  const [products, setProducts] = useState<BaseProductProps[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<
    typeCategoryListProps["categoryData"]
  >([]);
  const [filteredProducts, setFilteredProducts] = useState<BaseProductProps[]>(
    [],
  );

  const searchWrapperRef = useRef<HTMLDivElement>(null);

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

  const handleFocus = () => {
    setShowDropdown(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      if (!searchWrapperRef.current?.contains(e.relatedTarget as Node)) {
        setShowDropdown(false);
      }
    }, 200);
  };

  const handleCategoryClick = (category: string) => {
    console.log(`Перейти на страницу категории: ${category}`);
  };

  const handleWrapperClick = (e: React.MouseEvent) => {
    if (!searchWrapperRef.current?.contains(e.target as Node)) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  };

  const handleRemovePopularQuery = (query: string) => {
    setPopularQueries((prev) => prev.filter((item) => item !== query));
  };

  const handleRemoveSearchResult = (product: BaseProductProps) => {
    setProducts((prev) => prev.filter((item) => item.id !== product.id));
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
      {showDropdown && (
        <div
          className={cn(classes.dropdown, { [classes.hidden]: !showDropdown })}
          onClick={handleFocus}
        >
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
                    {filteredProducts.map((product, index) => (
                      <div className={classes.searchResult} key={index}>
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
                <div className={classes.searchCategories}>
                  {filteredCategories.map((category, index) => (
                    <div key={index} className={classes.categoryItem}>
                      <CategoryIcon
                        link={category.link}
                        name={category.name}
                        handler={() => console.log("Клик по категории")}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
