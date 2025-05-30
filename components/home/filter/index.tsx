"use client";

import { useState, useEffect } from "react";
import style from "./filter.module.scss";

// Mock hooks - replace with your actual hooks
const useBrands = () => {
  const data = [
    {
      id: 1,
      name: "updated",
      logo: "9t1icqa8baw.png",
      createdAt: "2025-05-29T18:11:45.502Z",
      updatedAt: "2025-05-29T18:17:54.286Z",
    },
    {
      id: 2,
      name: "iphone",
      logo: "ye29ukl1ump.svg",
      createdAt: "2025-05-30T09:06:46.379Z",
      updatedAt: "2025-05-30T09:06:46.379Z",
    },
    {
      id: 3,
      name: "mi",
      logo: "dvvwinj6mca.svg",
      createdAt: "2025-05-30T09:11:12.540Z",
      updatedAt: "2025-05-30T09:11:12.540Z",
    },
    {
      id: 4,
      name: "nokia",
      logo: "gv4drn5y03m.svg",
      createdAt: "2025-05-30T09:11:17.273Z",
      updatedAt: "2025-05-30T09:11:17.273Z",
    },
    {
      id: 5,
      name: "blackview",
      logo: "tkcaqfhgqon.svg",
      createdAt: "2025-05-30T09:11:36.234Z",
      updatedAt: "2025-05-30T09:11:36.234Z",
    },
    {
      id: 6,
      name: "samsung",
      logo: "iyapym3mh7p.svg",
      createdAt: "2025-05-30T09:11:52.786Z",
      updatedAt: "2025-05-30T09:11:52.786Z",
    },
  ];

  return { data, isLoading: false, error: null };
};

const useRegions = () => {
  const data = [
    {
      id: 1,
      name: "Toshkent",
      createdAt: "2025-05-19T11:51:36.502Z",
      updatedAt: "2025-05-19T11:51:36.502Z",
    },
    {
      id: 2,
      name: "Samarkand",
      createdAt: "2025-05-19T11:51:36.502Z",
      updatedAt: "2025-05-19T11:51:36.502Z",
    },
    {
      id: 3,
      name: "Bukhara",
      createdAt: "2025-05-19T11:51:36.502Z",
      updatedAt: "2025-05-19T11:51:36.502Z",
    },
  ];

  return { data, isLoading: false, error: null };
};

const useColors = () => {
  const data = [
    {
      id: 1,
      name: "Black",
      createdAt: "2025-05-30T09:55:49.309Z",
      updatedAt: "2025-05-30T09:55:49.309Z",
    },
    {
      id: 2,
      name: "Gray",
      createdAt: "2025-05-30T09:55:49.309Z",
      updatedAt: "2025-05-30T09:55:49.309Z",
    },
    {
      id: 3,
      name: "Teal",
      createdAt: "2025-05-30T09:55:49.309Z",
      updatedAt: "2025-05-30T09:55:49.309Z",
    },
    {
      id: 4,
      name: "Yellow",
      createdAt: "2025-05-30T09:55:49.309Z",
      updatedAt: "2025-05-30T09:55:49.309Z",
    },
    {
      id: 5,
      name: "Red",
      createdAt: "2025-05-30T09:55:49.309Z",
      updatedAt: "2025-05-30T09:55:49.309Z",
    },
    {
      id: 6,
      name: "Purple",
      createdAt: "2025-05-30T09:55:49.309Z",
      updatedAt: "2025-05-30T09:55:49.309Z",
    },
    {
      id: 7,
      name: "Blue",
      createdAt: "2025-05-30T09:55:49.309Z",
      updatedAt: "2025-05-30T09:55:49.309Z",
    },
  ];

  return { data, isLoading: false, error: null };
};

interface FilterState {
  regionId: number | null;
  topAdsOnly: boolean;
  condition: string;
  brandId: number | null;
  manualBrand: string;
  memoryId: number | null;
  colorId: number | null;
}

interface FilterSideProps {
  onClose?: () => void;
  onApply?: (filters: FilterState) => void;
}

const FilterSide = ({ onClose, onApply }: FilterSideProps) => {
  const [filters, setFilters] = useState<FilterState>({
    regionId: null,
    topAdsOnly: false,
    condition: "",
    brandId: null,
    manualBrand: "",
    memoryId: null,
    colorId: null,
  });

  const [showManualBrand, setShowManualBrand] = useState(false);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdown &&
        !(event.target as Element).closest(`.${style.selectContainer}`)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown, style.selectContainer]);

  // Fetch data using custom hooks
  const { data: brands, isLoading: brandsLoading } = useBrands();
  const { data: regions, isLoading: regionsLoading } = useRegions();
  const { data: colors, isLoading: colorsLoading } = useColors();

  // Mock memory data
  const memoryOptions = [
    { id: 1, name: "64 ГБ" },
    { id: 2, name: "128 ГБ" },
    { id: 3, name: "256 ГБ" },
    { id: 4, name: "512 ГБ" },
  ];

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({
      regionId: null,
      topAdsOnly: false,
      condition: "",
      brandId: null,
      manualBrand: "",
      memoryId: null,
      colorId: null,
    });
    setShowManualBrand(false);
    setShowBrandDropdown(false);
    setOpenDropdown(null);
  };

  const handleApply = () => {
    if (onApply) {
      onApply(filters);
    }
    if (onClose) {
      onClose();
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const getColorStyle = (colorName: string) => {
    const colorMap: { [key: string]: string } = {
      Black: "#000000",
      Gray: "#E5E5E5",
      Teal: "#5D9C9C",
      Yellow: "#F4B942",
      Red: "#E85A5A",
      Purple: "#6B46C1",
      Blue: "#3B82F6",
    };
    return colorMap[colorName] || "#CCCCCC";
  };

  const getSelectedRegionName = () => {
    const region = regions?.find((r) => r.id === filters.regionId);
    return region ? region.name : "Не указан";
  };

  const getSelectedBrandName = () => {
    const brand = brands?.find((b) => b.id === filters.brandId);
    return brand ? brand.name : "Не указан";
  };

  const getSelectedMemoryName = () => {
    const memory = memoryOptions.find((m) => m.id === filters.memoryId);
    return memory ? memory.name : "Не указан";
  };

  return (
    <div className={style.filterContainer}>
      {/* Header */}
      <div className={style.header}>
        <h1 className={style.title}>Фильтр</h1>
        <button className={style.closeButton} onClick={handleClose}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className={style.content}>
        {/* Region */}
        <div className={style.section}>
          <label className={style.label}>Регион</label>
          <div className={style.selectContainer}>
            <button
              className={style.selectTrigger}
              onClick={() =>
                setOpenDropdown(openDropdown === "region" ? null : "region")
              }
              disabled={regionsLoading}
            >
              <span>{getSelectedRegionName()}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={style.chevron}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {openDropdown === "region" && (
              <div className={style.selectContent}>
                {regions?.map((region) => (
                  <button
                    key={region.id}
                    className={style.selectItem}
                    onClick={() => {
                      handleFilterChange("regionId", region.id);
                      setOpenDropdown(null);
                    }}
                  >
                    {region.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* TOP ads toggle */}
        <div className={style.toggleSection}>
          <label className={style.label}>Только TOP объявления</label>
          <button
            className={`${style.switch} ${
              filters.topAdsOnly ? style.switchOn : ""
            }`}
            onClick={() =>
              handleFilterChange("topAdsOnly", !filters.topAdsOnly)
            }
          >
            <div className={style.switchThumb} />
          </button>
        </div>

        {/* Condition */}
        <div className={style.section}>
          <label className={style.label}>Состояние</label>
          <div className={style.radioGroup}>
            <label className={style.radioItem}>
              <input
                type="radio"
                name="condition"
                value="new"
                checked={filters.condition === "new"}
                onChange={(e) =>
                  handleFilterChange("condition", e.target.value)
                }
                className={style.radioInput}
              />
              <span className={style.radioCustom} />
              Новый
            </label>
            <label className={style.radioItem}>
              <input
                type="radio"
                name="condition"
                value="used"
                checked={filters.condition === "used"}
                onChange={(e) =>
                  handleFilterChange("condition", e.target.value)
                }
                className={style.radioInput}
              />
              <span className={style.radioCustom} />
              Б/У
            </label>
          </div>
        </div>

        {/* Brand */}
        <div className={style.section}>
          <label className={style.label}>Бренд</label>
          <div className={style.brandSection}>
            <button
              className={style.selectButton}
              onClick={() => setShowBrandDropdown(!showBrandDropdown)}
              disabled={brandsLoading}
            >
              Выбрать
            </button>

            <div className={style.manualBrandContainer}>
              <div
                className={style.manualBrandBox}
                onClick={() => setShowManualBrand(!showManualBrand)}
              >
                <span className={style.manualBrandText}>Ввести вручную</span>
              </div>
              {filters.manualBrand && (
                <div className={style.manualBrandTag}>
                  {filters.manualBrand}
                </div>
              )}
            </div>

            {showManualBrand && (
              <input
                type="text"
                placeholder="Введите бренд"
                value={filters.manualBrand}
                onChange={(e) =>
                  handleFilterChange("manualBrand", e.target.value)
                }
                className={style.manualInput}
              />
            )}

            {showBrandDropdown && (
              <div className={style.selectContainer}>
                <button
                  className={style.selectTrigger}
                  onClick={() =>
                    setOpenDropdown(openDropdown === "brand" ? null : "brand")
                  }
                >
                  <span>{getSelectedBrandName()}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={style.chevron}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {openDropdown === "brand" && (
                  <div className={style.selectContent}>
                    {brands?.map((brand) => (
                      <button
                        key={brand.id}
                        className={style.selectItem}
                        onClick={() => {
                          handleFilterChange("brandId", brand.id);
                          setOpenDropdown(null);
                        }}
                      >
                        <div className={style.brandOption}>
                          {brand.logo && (
                            <img
                              src={`/uploads/${brand.logo}`}
                              alt={brand.name}
                              className={style.brandLogo}
                            />
                          )}
                          {brand.name}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Memory */}
        <div className={style.section}>
          <label className={style.label}>Память</label>
          <div className={style.selectContainer}>
            <button
              className={style.selectTrigger}
              onClick={() =>
                setOpenDropdown(openDropdown === "memory" ? null : "memory")
              }
            >
              <span>{getSelectedMemoryName()}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={style.chevron}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {openDropdown === "memory" && (
              <div className={style.selectContent}>
                {memoryOptions.map((memory) => (
                  <button
                    key={memory.id}
                    className={style.selectItem}
                    onClick={() => {
                      handleFilterChange("memoryId", memory.id);
                      setOpenDropdown(null);
                    }}
                  >
                    {memory.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Color */}
        <div className={style.section}>
          <label className={style.label}>Цвет</label>
          <div className={style.colorGrid}>
            {colorsLoading ? (
              <div>Loading colors...</div>
            ) : (
              colors?.map((color) => (
                <button
                  key={color.id}
                  onClick={() => handleFilterChange("colorId", color.id)}
                  className={`${style.colorSwatch} ${
                    filters.colorId === color.id
                      ? style.colorSwatchSelected
                      : ""
                  }`}
                  style={{ backgroundColor: getColorStyle(color.name) }}
                  title={color.name}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className={style.bottomButtons}>
        <button className={style.resetButton} onClick={handleReset}>
          Сбросить
        </button>
        <button className={style.applyButton} onClick={handleApply}>
          Применить
        </button>
      </div>
    </div>
  );
};

export default FilterSide;
