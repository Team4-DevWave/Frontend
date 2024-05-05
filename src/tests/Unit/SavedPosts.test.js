import React from "react";
import { render, fireEvent, screen, within } from "@testing-library/react";
import SavedPost from "../../components/UserTabs/UserSavedPost";
describe("Post", () => {
  test("renders saved post without crashing", () => {
    render(<SavedPost />);
  });


});
