/* eslint-disable @next/next/no-img-element */
const images = [
  "/images/default-blue.png",
  "/images/default-red.png",
  "/images/default-slate.png",
  "/images/default-green.png",
];

interface UserCardProps {
  name: String;
  onClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ name, onClick }) => {
  const imgSrc = images[Math.floor(Math.random() * 4)];

  return (
    <button
      type="button"
      className="group flex-row w-44 mx-auto"
      onClick={onClick}
    >
      <div
        className="
        flex items-center justify-center
        w-44 h-44
        rounded-md border-2 border-transparent
        group-hover:cursor-pointer group-hover:border-white
        overflow-hidden
      "
      >
        <img
          src={imgSrc}
          alt="Profile"
          draggable={false}
          className="w-max h-max object-contain"
        />
      </div>
      <div
        className="
        text-2xl text-gray-400 text-center
        mt-4 group-hover:text-white
      "
      >
        {name}
      </div>
    </button>
  );
};

export default UserCard;
