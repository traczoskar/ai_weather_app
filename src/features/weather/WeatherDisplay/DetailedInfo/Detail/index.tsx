import { ReactNode } from "react";

interface DetailProps {
  icon?: ReactNode;
  title: string;
  data: string;
}

const Detail: React.FC<DetailProps> = ({ icon, title, data }) => {
  return (
    <div className="flex items-center gap-2 text-slate-500">
      {icon}
      <p className="flex items-center gap-2 justify-between w-fulltext-md">
        {title}{" "}
        <span className="text-sky-600 text-md font-semibold">{data}</span>
      </p>
    </div>
  );
};

export default Detail;
