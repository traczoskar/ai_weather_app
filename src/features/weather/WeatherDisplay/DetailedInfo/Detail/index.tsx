import { ReactNode } from "react";

interface DetailProps {
  icon?: ReactNode;
  title: string;
  data: string;
  width?: string;
  textSize?: string;
}

const Detail: React.FC<DetailProps> = ({
  icon,
  title,
  data,
  width,
  textSize,
}) => {
  return (
    <div className="flex items-center gap-4 text-slate-500">
      {icon}
      <p
        className={`flex items-center gap-6 justify-between  ${
          width ? width : "w-full"
        } ${textSize ? textSize : "text-md"} font-normal}`}
      >
        {title}{" "}
        <span className="text-sky-600 text-md font-semibold">{data}</span>
      </p>
    </div>
  );
};

export default Detail;
