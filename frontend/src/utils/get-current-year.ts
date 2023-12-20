const Year: React.FC = () => {
  const date = new Date();
  const yearText = date.getFullYear();
  return (yearText);
};

export default Year;
