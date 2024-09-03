import React from "react";
import { alloys } from "../../assets/assset";

export default function HomoginizedPage() {
  return (
    <div>
      Homoginized Page
      <diV>
        <ul>
          {alloys.map((item, index) => (
            <li key={index}>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </diV>
    </div>
  );
}
