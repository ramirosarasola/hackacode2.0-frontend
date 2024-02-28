export default function AuthWelcome({title, description}: {title: string, description: string}) {
  return (
    <div className="w-[70%]">
      <h1 className="text-[48px]">{title}</h1>
      <p className="text-[16px] text-left">
        {description}
      </p>
    </div>
  );
}
