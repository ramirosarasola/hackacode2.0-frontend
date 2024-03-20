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
      <div className="profile-img w-[45px] h-[45px] rounded-full bg-red-400 text-[#fff] flex items-center justify-center text-[18px]">
        {name[0].toUpperCase() + lastname[0].toUpperCase()[0]}
      </div>
      <div
        className={`w-fit flex flex-col items-start justify-start text-[#1F1F1F] font-[600] ${
          size === "large" ? "text-[18px]" : "text-[16px]"
        }`}
      >
        <p className="w-full">{`${name} ${lastname}`}</p>
        <span className="text-[#A8B1CF] font-[400]">{position}</span>
      </div>
    </div>
  );
};

export default UserProfile;
