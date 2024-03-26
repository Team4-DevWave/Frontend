import { Create } from "@mui/icons-material";
import CreateCommunity from "../components/CreateCommunity";
import { fn } from "@storybook/test";
import { Meta } from "@storybook/addon-docs/blocks";

<Meta title="Components/CreateCommunity" component={CreateCommunity} />;

export default {
  title: "Create Community Component",
  component: CreateCommunity,

  tags: ["autodocs"],
  
  argTypes: {
    communityName: { control: { disable: true } },
    radioValue: { control: { disable: true } },
    checked: { control: { disable: true } },
    toggleChecked: { control: { disable: true } },
    submitCommunity: { control: { disable: true } },
    handleRadioChange: { control: { disable: true } },
    handleNameChange: { control: { disable: true } },
  },
};

/** Button which shows a create community form when clicked */

export const Community = (args) => <CreateCommunity />;
