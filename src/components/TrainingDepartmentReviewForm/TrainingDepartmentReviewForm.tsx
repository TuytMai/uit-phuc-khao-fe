import updateReviewRequest from "@/api/review-request/update";
import { ScoreReviewForm } from "@/types/ScoreReviewForm";
import { Modal } from "flowbite-react";
import { IoArrowUndoOutline } from "react-icons/io5";
import { useMutation } from "react-query";
import ApproveForm from "../ApproveForm/ApproveForm";
import Button from "../Button/Button";
import DetailReviewFormStatus from "../DetailReviewFormStatus/DetailReviewFormStatus";
import RejectScoreReviewForm from "../RejectForm/RejectForm";
import LabeledText from "../Typography/LabeledText";
import ReviewRequestForm from "../ReviewRequestForm/ReviewRequestForm";
import ReviewFormStatus from "../ReviewFormStatus/ReviewFormStatus";

type Props = {
    isOpen: boolean;
    form: ScoreReviewForm;
    onClose: () => any;
};

export default function TrainingDepartmentReviewForm({
    isOpen,
    form,
    onClose,
}: Props) {
    const {
        id,
        ngayDangKy,
        student,
        testScore,
        ngayThi,
        caThi,
        phongThi,
        lyDo,
        tinhTrang,
    } = form;

    const { mutate } = useMutation({ mutationFn: updateReviewRequest });

    return (
        <Modal show={isOpen} onClose={onClose} dismissible size={"2xl"}>
            <Modal.Body>
                <div className=" px-4 flex flex-col items-center gap-9">
                    <div className=" w-full flex flex-row justify-between">
                        <p className=" text-sm text-gray-500">
                            Id: <span className=" font-semibold">{id}</span>
                        </p>
                        <p className=" text-sm text-gray-500">
                            Ngày tạo:{" "}
                            <span className=" font-semibold">
                                {new Intl.DateTimeFormat("vi-VN", {
                                    dateStyle: "medium",
                                    timeZone: "Asia/Ho_Chi_Minh",
                                }).format(new Date(ngayDangKy))}
                            </span>
                        </p>
                    </div>
                    <div className=" flex flex-col gap-2 items-center">
                        <p className=" text-3xl font-semibold">
                            Thông tin đơn phúc khảo
                        </p>
                        <ReviewFormStatus status={form.tinhTrang} />
                    </div>
                    <div className=" w-full flex flex-col gap-2 justify-between">
                        <p className=" font-semibold text-center text-gray-500">
                            Thông tin sinh viên
                        </p>
                        <div className=" py-3 px-4 bg-gray-100 rounded-lg mt-4 w-full grid grid-cols-5 gap-4 gap-y-8">
                            <LabeledText
                                className=" col-span-3"
                                title="Họ và tên"
                                value={student.hoTen}
                            />
                            <LabeledText
                                className=" col-span-2"
                                title="Mã số sinh viên"
                                value={student.mssv}
                            />
                            <LabeledText
                                title="Lớp sinh hoạt"
                                value={student.lopSinhHoat}
                            />
                        </div>
                    </div>
                    <div className=" w-full flex flex-col gap-2 justify-between">
                        <p className=" font-semibold text-center text-gray-500">
                            Thông tin môn học cần phúc khảo
                        </p>
                        <div className=" py-3 px-4 bg-gray-100 rounded-lg mt-4 w-full grid grid-cols-5 gap-4">
                            <LabeledText
                                className=" col-span-3"
                                title="Môn phúc khảo"
                                value={`${testScore.maMon} - ${testScore.tenMon}`}
                            />
                            <LabeledText
                                className=" col-span-2"
                                title="Lớp"
                                value={testScore.lop}
                            />
                            <LabeledText
                                title="Khoa quản lý"
                                value={testScore.khoaQuanLy}
                            />
                        </div>
                    </div>
                    <div className=" w-full flex flex-col gap-2 justify-between">
                        <p className=" font-semibold text-center text-gray-500">
                            Thông tin bài thi
                        </p>
                        <div className=" py-3 px-4 bg-gray-100 rounded-lg mt-4 w-full grid grid-cols-3 gap-4">
                            <LabeledText
                                title="Ngày thi"
                                value={new Intl.DateTimeFormat("vi-VN", {
                                    dateStyle: "medium",
                                    timeZone: "Asia/Ho_Chi_Minh",
                                }).format(new Date(ngayThi))}
                            />
                            <LabeledText title="Ca thi" value={caThi} />
                            <LabeledText title="Phòng thi" value={phongThi} />
                            <LabeledText
                                title="Điểm hiện tại"
                                value={testScore.diemHienTai}
                            />
                            <LabeledText
                                className=" col-span-2"
                                title="Lý do"
                                value={lyDo}
                            />
                        </div>

                        {tinhTrang === "TU_CHOI" ? (
                            <div className=" py-3 px-4 bg-red-100 rounded-lg mt-4 w-full grid grid-cols-3 gap-4">
                                <LabeledText
                                    className=" col-span-3"
                                    title="Lý do từ chối đơn"
                                    value={form.lyDoTuChoi}
                                />
                            </div>
                        ) : null}
                    </div>
                    <div className=" w-full flex items-center justify-between gap-4">
                        <Button
                            onClick={onClose}
                            className=" bg-gray-50 hover:bg-gray-100"
                        >
                            <div className=" flex items-center gap-2">
                                <IoArrowUndoOutline
                                    size={22}
                                    className=" text-gray-800"
                                />
                                <p className=" font-semibold text-gray-800">
                                    Trở về
                                </p>
                            </div>
                        </Button>
                        {form.tinhTrang === "DA_GUI" ? (
                            <div className=" flex gap-4">
                                <RejectScoreReviewForm
                                    form={form}
                                    onClick={onClose}
                                />
                                <ApproveForm
                                    onClick={() => {
                                        mutate({ id, tinhTrang: "DANG_XU_LI" });
                                    }}
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
