import React, { FC } from "react";
import "./ShipNode.css";
import { Ship } from "../../../types/types";
import { Handle, Position } from "reactflow";

interface ShipNodeProps {
  data: Ship;
}

const ShipNode: FC<ShipNodeProps> = ({ data }) => {
  return (
    <>
      <div className="ship-node">
        <div className="ship-node__title">{data.name}</div>
        <div className="ship-node__divider" />
        <div className="ship-node__block">
          <div>
            <span>model:</span>
            {data.model}
          </div>
          <div>
            <span>manufacturer:</span>
            {data.manufacturer}
          </div>
          <div>
            <span>passengers:</span>
            {data.passengers}
          </div>
          <div>
            <span>crew:</span>
            {data.crew}
          </div>
        </div>
        <div className="ship-node__block">
          <div>
            <span>max speeed:</span>
            {data.max_atmosphering_speed}
          </div>
        </div>
      </div>
      <Handle type="target" position={Position.Top} />
    </>
  );
};

export default ShipNode;
