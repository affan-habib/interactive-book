import Swal from "sweetalert2";
import { DELETE_CONFIRMATION_MESSAGE } from "@/constant/message";

const Confirm = (
  handleOk,
  param,
  confirmButtonText = DELETE_CONFIRMATION_MESSAGE
) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText,
    showLoaderOnConfirm: true,
    allowOutsideClick: () => !Swal.isLoading(),
  }).then(async (result) => {
    if (result.isConfirmed) {
      await handleOk(param);
    }
  });
};

export default Confirm;
