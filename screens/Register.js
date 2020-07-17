import React from 'react'
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Button,StatusBar,LayoutAnimation,Image} from 'react-native';
import * as firebase from 'firebase'
import UserPermissions from '../utilities/UserPermissions'
import * as ImagePicker from 'expo-image-picker'
import Fire from '../Fire'

export default class Register extends React.Component {
    state = {
        user:{
            name:"",
            email:"",
            password:"",
            avatar:null
        },
        errorMessage:null
    };

    static navigationOptions = {
        header:null
    };

    handlePickAvatar = async() =>{
        UserPermissions.getCamera();

        let result= await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[4,3]
        });

        if(!result.cancelled){
            this.setState({user:{...this.state.user, avatar: result.uri}})
        }
    }
    

    handleSignUp = () =>{
        Fire.shared.createUser(this.state.user);
    }
 
    render() {
        LayoutAnimation.easeInEaseOut()
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <TouchableOpacity style={{position:"absolute",borderWidth:1,top:20,padding:7,left:10}} onPress={()=> this.props.navigation.goBack()}>
                    <Text>Back</Text>
                </TouchableOpacity>

                <View style={{alignItems:"center",width:"100%"}}>
                    <Text style={styles.greeting}>{`Hello!\nSign up to get started.`}</Text>

                    <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                        <Image source={{uri: this.state.user.avatar}} style={styles.avatar}></Image>
                        <Text style={{fontSize:40,color:"#ffffff"}}>+</Text>
                    </TouchableOpacity>
        
                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                    </View>
                </View>
    
                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput 
                            style={styles.input} 
                            autoCapital ize="none"
                            onChangeText={name => this.setState({user: {...this.state.user, name}})}
                            value={this.state.user.name}></TextInput>
                    </View>
                    <View style={{marginTop:32}}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput 
                            style={styles.input} 
                            autoCapital ize="none"
                            onChangeText={email => this.setState({user: {...this.state.user, email}})}
                            value={this.state.user.email}></TextInput>
                    </View>
                    <View style={{marginTop:32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput 
                            style={styles.input} 
                            secureTextEntry 
                            autoCapitalize="none"
                            onChangeText={password => this.setState({user: {...this.state.user, password}})}
                            value={this.state.user.password}></TextInput>
                    </View>
                </View>
    
                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{color:"#ffffff"}}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{alignSelf:"center",marginTop:32}}
                    onPress={() => this.props.navigation.navigate("Login")}
                    >
                    <Text style={{color:"#414959"}}>New to Social App? <Text style={{fontWeight:"500",color:"#E9446A"}}>Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    greeting:{
        marginTop:32,
        fontSize:18,
        fontWeight:"400",
        textAlign:"center"
    },
    errorMessage:{
        height:72,
        alignItems:"center",
        justifyContent: 'center',
        marginHorizontal:30
    },
    error:{
        color:"#E9446A",
        fontSize:13,
        fontWeight:"600",
        textAlign:"center" 
    },
    form:{
        marginBottom:48,
        marginHorizontal:30
    },
    inputTitle:{
        color: "#8A8F9E",
        fontSize:10,
        textTransform:"uppercase"
    },
    input:{
        borderBottomColor:"#8A8F9E",
        borderBottomWidth:StyleSheet.hairlineWidth,
        height:40,
        fontSize:15,
        color:"#161F3D"
    },
    button:{
        marginHorizontal:30,
        backgroundColor:"#E9446A",
        borderRadius:4,
        height:52,
        alignItems:"center",
        justifyContent:"center"
    },
    avatarPlaceholder:{
        width:100,
        height:100,
        borderRadius:50,
        backgroundColor:"#e1e2e6",
        marginTop:48,
        justifyContent:"center",
        alignItems:"center"
    },
    avatar:{
        position: "absolute",
        width:100,
        height:100,
        borderRadius:50
    }
})

 