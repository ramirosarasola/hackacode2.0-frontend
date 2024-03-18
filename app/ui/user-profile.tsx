const UserProfile = ({
  size,
  name,
  lastname,
  position,
}: {
  size: "small" | "large";
  name: string;
  lastname: string;
  position: string;
}) => {
  return (
    <div className="flex justify-start items-center gap-4 w-fit">
      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
      <div className={`w-fit flex flex-col items-start justify-start text-[#1F1F1F] font-[600] ${size === 'large' ? 'text-[18px]' : 'text-[16px]'}`}>
        <p className="w-full">{`${name} ${lastname}`}</p>
        <span className="text-[#A8B1CF] font-[400]">
          {position}
        </span>
      </div>
    </div>
  );
};

export default UserProfile;
