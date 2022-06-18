const dateFormat = (data: string) => {
  const newDate = new Date(data);
  return `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()}`;
};

export default dateFormat;
