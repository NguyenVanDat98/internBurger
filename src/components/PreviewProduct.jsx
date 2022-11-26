import React, { memo } from "react";
import { useSelector } from "react-redux";

import Ingredient from "./product/Ingredient";

function PreviewProduct(props) {
  const {} = props;
  const product = useSelector((_) => _.burger.product);

  return (
    <div className="preview">
      <Ingredient className="cakeCrust"></Ingredient>
      {product.salad !== 0 && <Ingredient className="salad">Salad</Ingredient>}
      {product.bacon !== 0 && <Ingredient className="bacon">Bacon</Ingredient>}
      {product.cheese !== 0 && (
        <Ingredient className="cheese">cheese</Ingredient>
      )}
      {product.meat !== 0 && <Ingredient className="meat">meat</Ingredient>}
      <Ingredient className="cakeCrust down"></Ingredient>
    </div>
  );
}

export default memo(PreviewProduct);
