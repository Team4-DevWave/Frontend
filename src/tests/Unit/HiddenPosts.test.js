import React from "react";
import { render, fireEvent, screen, within } from "@testing-library/react";
import HiddenPost from "../../components/UserTabs/UserHiddenPost";
describe("Post", () => {
  test("renders saved post without crashing", () => {
    render(<HiddenPost />);
  });


});

