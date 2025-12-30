import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const UserListItem = ({ user, isSelected, onClick }) => {
  return (
    <div
      className={`flex items-center p-3 cursor-pointer my-2 rounded-md transition-colors hover:bg-chat-hover ${
        isSelected ? 'bg-chat-hover bg-[#A5FF8A]' : 'bg-white'
      }`}
      onClick={() => onClick(user)}
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
            {user.avatar}
          </AvatarFallback>
        </Avatar>
        {user.online && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>
      
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-foreground truncate">{user.name}</h3>
          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
            {user.time}
          </span>
        </div>
        <p className="text-sm text-muted-foreground truncate mt-1">
          {user.lastMessage}
        </p>
      </div>
      
      {user.unreadCount > 0 && (
        <div className="ml-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {user.unreadCount}
        </div>
      )}
    </div>
  );
};

export default UserListItem;