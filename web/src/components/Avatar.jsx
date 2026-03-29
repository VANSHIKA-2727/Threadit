export const Avatar = ({ src, size = "md" }) => {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16"
  };

  return (
    <div className={`relative ${sizes[size]} rounded-full p-[2px] bg-gradient-to-tr from-purple-500 to-blue-500`}>
      <div className="w-full h-full rounded-full bg-black p-[1px]">
        <img 
          src={src || "https://api.dicebear.com/7.x/avataaars/svg?seed=Threadit"} 
          className="w-full h-full rounded-full object-cover"
          alt="Avatar"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full shadow-[0_0_10px_#22c55e]" />
    </div>
  );
};