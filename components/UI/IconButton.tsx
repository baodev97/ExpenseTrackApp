import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, View } from "react-native";
type IconButtonProp = {
    icon:keyof typeof Ionicons.glyphMap
    color:string|undefined,
    size:number
    onPress: () => void
}


function IconButton({icon,color,size,onPress}:IconButtonProp){
    return (
        <Pressable style={({pressed})=> pressed ? styles.pressed :null }>
            <View style={styles.buttonContainer}>
                <Ionicons name={icon} size={size} color={color}/>
            </View>
        </Pressable>
    )
}
export default IconButton;

const styles = StyleSheet.create({
    buttonContainer:{
        borderRadius:24,
        padding:6,
        marginHorizontal:8,
        marginVertical:2
    },
    pressed:{
        opacity:0.75
    }

})
