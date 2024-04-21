import React from "react";
import { render, fireEvent, act, screen } from "@testing-library/react";
import AddComment from "../../components/UserTabs/AddComment.js";
import { LiveCommentsContext } from "../../components/UserTabs/Comments.js";
import axios from "axios";
import Cookies from "js-cookie";

jest.mock("axios");

describe("AddComment", () => {
  const token = Cookies.get("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  it("renders without crashing", () => {
    const mockAddLiveComment = jest.fn();
    render(
      <LiveCommentsContext.Provider
        value={{ addLiveComment: mockAddLiveComment }}
      >
        <AddComment
          id={{ postID: "661dbd9f3c61a21b0df8c90c", lock: false }}
          lock={false}
        />
      </LiveCommentsContext.Provider>
    );
  });

  it("handles comment submission", async () => {
    const mockAddLiveComment = jest.fn();
    axios.post.mockResolvedValue({
      data: {
        data: {
          comment: {
            createdAt: "2022-01-01T00:00:00Z",
          },
        },
      },
    });

    render(
      <LiveCommentsContext.Provider
        value={{ addLiveComment: mockAddLiveComment }}
      >
        <AddComment
          id={{ postID: "661dbd9f3c61a21b0df8c90c", lock: false }}
          lock={false}
        />
      </LiveCommentsContext.Provider>
    );

    const commentButton = screen.getByText("Comment");
    const textarea = screen.getByRole("textbox");

    fireEvent.change(textarea, { target: { value: "Test comment" } });
    await act(async () => {
      fireEvent.click(commentButton);
    });

    expect(axios.post).toHaveBeenCalledWith(
      `http://localhost:8000/api/v1/posts/undefined/comments/`,
      { content: "Test comment" },
      { headers: { Authorization: `Bearer undefined` } }
    );
    expect(mockAddLiveComment).toHaveBeenCalled();
  });
});
