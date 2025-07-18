import { ReactNode } from "react";

interface DisplayCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const DisplayCard = ({ icon, title, description }: DisplayCardProps) => {
  return (
    <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition group border-t-4 border-gray-200 hover:border-gray-400">
      <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
        {title}
      </h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default DisplayCard;
