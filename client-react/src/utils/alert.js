import Swal from "sweetalert2";

export const successAlert = (title, text = "") => {
  Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonColor: "#198754",
  });
};

export const errorAlert = (title, text = "") => {
  Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonColor: "#dc3545",
  });
};

export const warningAlert = (title, text = "") => {
  Swal.fire({
    icon: "warning",
    title,
    text,
    confirmButtonColor: "#f39c12",
  });
};

export const confirmAlert = async (
  title,
  text = "You won't be able to revert this!"
) => {
  return await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc3545",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
  });
};