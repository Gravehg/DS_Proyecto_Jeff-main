import React from "react";
import "../index.css";

function CategoryDropdown({
  categories,
  setCategoryId,
  bootstrap,
  required,
  selectedId,
}) {
  return (
    <select
      className={bootstrap}
      onChange={(event) => setCategoryId(event.target.value)}
      required={required}
      value={selectedId}
    >
      <option value={""}>Categorías</option>
      {categories.map((category) => (
        <optgroup key={category._id} label={category.name}>
          <option value={category._id}>{category.name}</option>
          {category.subs.length !== 0 ? (
            category.subs.map((subcategory) => {
              return (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              );
            })
          ) : (
            <></>
          )}
        </optgroup>
      ))}
    </select>
  );
}

export default CategoryDropdown;
