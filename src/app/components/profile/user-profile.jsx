import { AvatarName} from "./user-avatar-name"
import { UserBackground } from "./user-background"


export function UserProfile({user}) {
  return (
    <div className="profile-card">
        <AvatarName user={user}/>
        <UserBackground user={user}/>
    </div>
  )
}
