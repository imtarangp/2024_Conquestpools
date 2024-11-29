import Swal from "sweetalert2";

const ToastComponent = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const Alert = (type = "", title = "", description = "") =>
  Swal.fire(title, description, type);

export const Toast = (type = "", title = "") =>
  ToastComponent.fire({
    icon: type,
    title,
  });
