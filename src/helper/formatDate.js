import dayjs from "dayjs";
import "dayjs/locale/bn"; // Import Bengali locale

const formatDate = (date) => {
  const language = localStorage.getItem("language");
  if (language === "bn") {
    return dayjs(date).locale("bn").format("DD MMMM YYYY");
  } else {
    return dayjs(date).format("DD MMMM YYYY");
  }
};

export default formatDate;
