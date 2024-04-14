import React from "react";
import User from "../../../../types/User";

export interface IUserInfoProps {
  user: User;
}

export function UserInfo({ user }: IUserInfoProps): JSX.Element {
  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Phone number</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{user.name}</td>
          <td>{user.phone}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default UserInfo;
