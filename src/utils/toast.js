export const getToast = (
    status = 'error',
    description,
    title = "Error"
  ) => {
    if (typeof description === "string")
      return {
        title,
        status,
        position: "bottom-right",
        description,
        duration: 3000,
      };
  
    let msg = "Some thing wrong !";
  
    if (typeof description === "object" && description?.["message"]) {
      msg = description["message"];
    }
    return {
      title,
      status,
      position: "bottom-right",
      description: msg,
      duration: 3000,
    };
  };
  