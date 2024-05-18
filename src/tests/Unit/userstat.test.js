// import React from "react";
// import { render, waitFor, fireEvent } from "@testing-library/react";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useParams } from "react-router-dom";
//
//
// import {
//     Card,
//     Typography,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     TextField,
//     RadioGroup,
//     Radio,
//     FormControlLabel,
//     InputLabel,
//     Snackbar,
// } from "@mui/material";
// import Button from "@mui/material/Button";
// import MoreVert from "@mui/icons-material/MoreVert";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
//
// import UserStats from "../../layouts/UserStats";
// import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
// import { GiBullyMinion } from "react-icons/gi";
// import { MdFmdBad } from "react-icons/md";
// import { MdOutlineQuestionAnswer } from "react-icons/md";
// import WarningAmberIcon from "@mui/icons-material/WarningAmber";
// import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
//
//
// jest.mock("axios");
//
// describe("UserStats", () => {
//     const mockSetFollowStatus = jest.fn();
//     const mockSetBlockedStatus = jest.fn();
//     const mockSetStats = jest.fn();
//     const mockSetOpenReport = jest.fn();
//     const mockSetReason = jest.fn();
//     const mockSetRadioValue = jest.fn();
//     const mockSetFollowed = jest.fn();
//     const mockSetBlockMessage = jest.fn();
//
//     const mockAxiosGet = jest.fn();
//
//     beforeEach(() => {
//         mockAxiosGet.mockResolvedValue({
//             data: {
//                 data: {
//                     followedUsers: ["user1", "user2"],
//                     blockedUsers: ["user3", "user4"],
//                 },
//             },
//         });
//
//         axios.get = mockAxiosGet;
//     });
//
//     it("should update followStatus and blockStatus when called", async () => {
//         const mockUseParams = jest.fn().mockReturnValue({ username: "testUser" });
//
//         render(<UserStats
//             username="testUser"
//             setFollowStatus={mockSetFollowStatus}
//             setBlockedStatus={mockSetBlockedStatus}
//             setStats={mockSetStats}
//             setOpenReport={mockSetOpenReport}
//             setReason={mockSetReason}
//             setRadioValue={mockSetRadioValue}
//             setFollowed={mockSetFollowed}
//             setBlockMessage={mockSetBlockMessage}
//             useParams={mockUseParams}
//         />);
//
//         await waitFor(() => {
//             expect(mockSetFollowStatus).toBeCalledWith(false);
//             expect(mockSetBlockedStatus).toBeCalledWith(false);
//         });
//     });
//
//     it("should call axios.get when component mounts", async () => {
//         const mockUseParams = jest.fn().mockReturnValue({ username: "testUser" });
//
//         render(<UserStats
//             username="testUser"
//             setFollowStatus={mockSetFollowStatus}
//             setBlockedStatus={mockSetBlockedStatus}
//             setStats={mockSetStats}
//             setOpenReport={mockSetOpenReport}
//             setReason={mockSetReason}
//             setRadioValue={mockSetRadioValue}
//             setFollowed={mockSetFollowed}
//             setBlockMessage={mockSetBlockMessage}
//             useParams={mockUseParams}
//         />);
//
//         await waitFor(() => {
//             expect(mockAxiosGet).toBeCalledWith(`http://localhost:8000/api/v1/users/${"testUser"}/about`);
//         });
//     });
//
//     it("should not call axios.get when component unmounts", async () => {
//         const mockUseParams = jest.fn().mockReturnValue({ username: "testUser" });
//
//         const { unmount } = render(<UserStats
//             username="testUser"
//             setFollowStatus={mockSetFollowStatus}
//             setBlockedStatus={mockSetBlockedStatus}
//             setStats={mockSetStats}
//             setOpenReport={mockSetOpenReport}
//             setReason={mockSetReason}
//             setRadioValue={mockSetRadioValue}
//             setFollowed={mockSetFollowed}
//             setBlockMessage={mockSetBlockMessage}
//             useParams={mockUseParams}
//         />);
//
//         unmount();
//
//         await waitFor(() => {
//             expect(mockAxiosGet).toBeCalledTimes(1);
//         });
//     });
//
//     it("should update followStatus and blockStatus when called with different usernames", async () => {
//         const mockUseParams = jest.fn().mockReturnValue({ username: "testUser" });
//
//         render(<UserStats
//             username="testUser"
//             setFollowStatus={mockSetFollowStatus}
//             setBlockedStatus={mockSetBlockedStatus}
//             setStats={mockSetStats}
//             setOpenReport={mockSetOpenReport}
//             setReason={mockSetReason}
//             setRadioValue={mockSetRadioValue}
//             setFollowed={mockSetFollowed}
//             setBlockMessage={mockSetBlockMessage}
//             useParams={mockUseParams}
//         />);
//
//         await waitFor(() => {
//             expect(mockSetFollowStatus).toBeCalledWith(true);
//             expect(mockSetBlockedStatus).toBeCalledWith(false);
//         });
//
//         mockUseParams.mockReturnValueOnce({ username: "differentUser" });
//
//         render(<UserStats
//             username="differentUser"
//             setFollowStatus={mockSetFollowStatus}
//             setBlockedStatus={mockSetBlockedStatus}
//             setStats={mockSetStats}
//             setOpenReport={mockSetOpenReport}
//             setReason={mockSetReason}
//             setRadioValue={mockSetRadioValue}
//             setFollowed={mockSetFollowed}
//             setBlockMessage={mockSetBlockMessage}
//             useParams={mockUseParams}
//         />);
//
//         await waitFor(() => {
//             expect(mockSetFollowStatus).toBeCalledWith(false);
//             expect(mockSetBlockedStatus).toBeCalledWith(false);
//         });
//     });
//
//     it("should not update followStatus and blockStatus when called with wrong username", async () => {
//         const mockUseParams = jest.fn().mockReturnValue({ username: "wrongUser" });
//
//         render(<UserStats
//             username="wrongUser"
//             setFollowStatus={mockSetFollowStatus}
//             setBlockedStatus={mockSetBlockedStatus}
//             setStats={mockSetStats}
//             setOpenReport={mockSetOpenReport}
//             setReason={mockSetReason}
//             setRadioValue={mockSetRadioValue}
//             setFollowed={mockSetFollowed}
//             setBlockMessage={mockSetBlockMessage}
//             useParams={mockUseParams}
//         />);
//
//         await waitFor(() => {
//             expect(mockSetFollowStatus).toBeCalledTimes(0);
//             expect(mockSetBlockedStatus).toBeCalledTimes(0);
//         });
//     });
// });