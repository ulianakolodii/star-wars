import React, { FC } from "react";
import "./ListHeader.css";

const ListHeader: FC = () => {
  return (
    <div className="list-header">
      {window.innerWidth < 768 ? null : <div>name</div>}
      <div className="list-header__info">
        <div>birth</div>
        <div className="list-header__look">look</div>
        <div>home</div>
        <div>films</div>
        <div>ships</div>
      </div>
    </div>
  );
};

export default ListHeader;
