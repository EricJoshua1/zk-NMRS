export const getNavigateTo = (role) => {
  switch (role) {
    case "reporter":
      return "myList";
    case "manager":
      return "list";
    case "supervisor":
      return "listAll";

    default:
      return "";
  }
};
