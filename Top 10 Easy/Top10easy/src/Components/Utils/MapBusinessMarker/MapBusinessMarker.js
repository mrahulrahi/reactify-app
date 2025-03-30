import './MapBusinessMarker.css';
import { useEffect, useState } from "react";

export default function MapBusinessMarker(props){
    const { color, name, id } = props;
    useEffect(() => {
    }, [])
    return (
      <div className="marker cursor-pointer color-white text-black h-4 w-4 bg-blue-900"
        text={name}
        color={color}
      ></div>
    );
}