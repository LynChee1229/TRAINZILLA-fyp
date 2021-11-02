import React from 'react';
import Switch from "@mui/material/Switch";

const MyComponent = (prop) => {
    return (
        <div>
            <Switch checked={prop.darkTheme} onChange={() => prop.setTheme(!prop.darkTheme)} />
        </div>
    );
};

export default MyComponent;
