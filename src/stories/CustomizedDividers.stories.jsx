import React from "react";

import { CustomizedDividers } from "../CustomizedDividers";

export default {
  title: "Caption/CustomizedDividers",
  component: CustomizedDividers,
};

const Template = (args) => <CustomizedDividers {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  styles: {
    fontSize: "small",
    color: "#000000",
    font: "",
  },
  onStyleChange: (styles) => {
    console.log(styles);
  },
};
