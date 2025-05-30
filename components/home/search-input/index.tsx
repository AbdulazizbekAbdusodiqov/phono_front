import React from "react";
import style from "./input.module.scss";
import { FilterIcon, SearchIconInput } from "../../../public/icons/profile";

const SearchInput = ({ onFilterClick }: { onFilterClick: () => void }) => {
  return (
    <div className={style.home_input_wrapper}>
      <div className={style.input_search}>
        <input type="text" placeholder="Search..." />
        <SearchIconInput />
      </div>
      <div className={style.action_icon}>
        <div className={style.filter} onClick={onFilterClick}>
          <FilterIcon />
        </div>
        <div className={style.search}>Search</div>
      </div>
    </div>
  );
};

export default SearchInput;
