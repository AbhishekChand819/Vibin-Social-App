import Constants from "expo-constants"
import * as Permissions from "expo-permissions"

class UserPermissions {
    getCamera = async() => {
        if(Constants.platform.android){
            const {status} =  await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if(status != "granted"){
                alert("We need permissions to use your camera roll");
            }
        }
    }
}

export default new UserPermissions
