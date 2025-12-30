import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import UserListItem from "./UserListItem";
import { useState } from "react";

const UserList = ({ users, selectedUser, onUserSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-[52vh] mx-10   flex flex-col h-full">
      {/* Header */}
      <div className="p-4 ">
        <h1 className="text-xl font-bold text-foreground mb-4 text-[#8AADFF]">
          Messages
        </h1>
        <div className="bg-[#F2F2F2] px-[2vh] w-full flex flex-col gap-4 py-4  rounded-md">
          <div className="relative mx-auto bg-[#F2F2F2]   rounded-md flex justify-between w-full items-center ">
            <Search
              color="#8AADFF"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6"
            />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#E8EFFF] rounded-md placeholder:text-[#8AADFF] placeholder:text-xl text-right placeholder:text-right h-[7vh]"
            />
          </div>

        {/* User List */}
        <div className="flex-1 px-2 py-2 overflow-y-auto bg-[#E8EFFF]">
          {filteredUsers.map((user) => (
            <UserListItem
              key={user.id}
              user={user}
              isSelected={selectedUser?.id === user.id}
              onClick={onUserSelect}
            />
          ))}
        </div>
      </div>
      </div>

    </div>
  );
};

export default UserList;
