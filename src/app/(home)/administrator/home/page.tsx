"use client";

import { viewUnresolvedComplainList } from "@/api/complain/viewComplainList";
import { viewReviewBoardList } from "@/api/review-board/viewReviewBoardList";
import AdministratorComplainForm from "@/components/AdministratorComplainForm/AdministratorComplainForm";
import CreateReviewBoard from "@/components/CreateReviewBoard/CreateReviewBoard";
import DataTable from "@/components/DataTable/DataTable";
import ReviewFormStatus from "@/components/ReviewFormStatus/ReviewFormStatus";
import UpdateReviewBoard from "@/components/UpdateReviewBoard/UpdateReviewBoard";
import { ComplaintFormEntity } from "@/types/ComplainFormEntity";
import { ReviewBoardEntity } from "@/types/ReviewBoard";
import { useState } from "react";
import { useQuery } from "react-query";

export default function Page() {
    const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
    const [reviewBoard, setReviewBoard] = useState<ReviewBoardEntity>();

    const [isOpenComplainDetail, setIsOpenComplainDetail] = useState(false);
    const [complainForm, setComplainForm] = useState<ComplaintFormEntity>();

    const {
        data: reviewBoards,
        isLoading: isReviewBoardLoading,
        refetch,
    } = useQuery({
        queryKey: ["review-boards"],
        queryFn: viewReviewBoardList,
    });

    const {
        data: complains,
        isLoading: isComplainLoading,
        refetch: refetchComplain,
    } = useQuery({
        queryKey: ["unresolved-complains"],
        queryFn: viewUnresolvedComplainList,
    });

    return (
        <div className=" w-full flex flex-col gap-4">
            <div className="">
                <CreateReviewBoard onCreated={refetch} />
            </div>
            <div className=" mt-8 flex flex-col gap-4">
                <p className=" font-semibold">Danh sách hội đồng</p>
                <DataTable
                    data={reviewBoards || []}
                    isEdit={false}
                    isLoading={isReviewBoardLoading}
                    onClickRow={(reviewBoard) => {
                        setReviewBoard(reviewBoard);
                        setIsOpenDetailModal(true);
                    }}
                    pick={{
                        ten: {
                            title: "Tên hội đồng",
                            className: "font-semibold",
                        },
                        lecturers: {
                            title: "Danh sách giảng viên",
                            mapper: (lecturers) => (
                                <div className=" flex gap-2">
                                    {lecturers.slice(0, 4).map((lecturer) => (
                                        <p
                                            key={lecturer.id}
                                            className=" px-2 py-1 rounded-lg bg-gray-200 font-medium"
                                        >
                                            {lecturer.hoTen}
                                        </p>
                                    ))}
                                    {lecturers.length > 4 ? "" : null}
                                </div>
                            ),
                        },
                        reviewResults: {
                            title: "Số lượng bài cần chấm lại",
                            className: "font-semibold",
                            mapper: (data) => data?.length.toString() || "0",
                        },
                    }}
                />
            </div>
            <div className=" flex flex-col gap-4">
                <p className=" font-semibold">Danh sách đơn khiếu nại</p>
                <DataTable
                    data={complains || []}
                    isEdit={false}
                    isLoading={isReviewBoardLoading}
                    onClickRow={(complain) => {
                        setIsOpenComplainDetail(true);
                        setComplainForm(complain);
                    }}
                    pick={{
                        reviewForm: {
                            title: "Môn học",
                            mapper: (value) => value?.testScore?.tenMon,
                            className: " w-[400px] font-medium",
                        },
                        ngayDangKy: {
                            title: "Ngày nộp đơn",
                            className: " font-normal min-w-[250px]",
                            mapper: (value: Date) =>
                                new Intl.DateTimeFormat("vi-VN", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                    timeZone: "Asia/Ho_Chi_Minh",
                                }).format(new Date(value)),
                        },
                        tinhTrang: {
                            title: "Tình trạng",
                            mapper: (value) => (
                                <ReviewFormStatus status={value} />
                            ),
                        },
                    }}
                />
            </div>
            {reviewBoard ? (
                <UpdateReviewBoard
                    reviewBoard={reviewBoard}
                    openModal={isOpenDetailModal}
                    onClose={() => setIsOpenDetailModal(false)}
                    onCreated={refetch}
                />
            ) : null}
            {complainForm ? (
                <AdministratorComplainForm
                    isOpen={isOpenComplainDetail}
                    form={complainForm}
                    onClose={() => setIsOpenComplainDetail(false)}
                />
            ) : null}
        </div>
    );
}
