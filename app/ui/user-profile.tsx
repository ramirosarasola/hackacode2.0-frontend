const UserProfile = ({
  name,
  lastname,
  position,
}: {
  name: string;
  lastname: string;
  position: string;
}) => {
  return (
    <div className="flex justify-start items-center gap-4 w-fit">
      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
      <div className="w-fit text-lg flex flex-col items-center justify-start text-[#1F1F1F] text-[18px] font-[600]">
        <p className="w-full">{`${name} ${lastname}`}</p>
        <span className="text-[#A8B1CF] text-[16px] font-[400]">
          {position}
        </span>
      </div>
    </div>
  );
};

export default UserProfile;
